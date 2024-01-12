import React, { createContext, useCallback, useContext } from 'react'
import { IUserDtos } from '../dtos'
import { api } from '../services'

interface IUserCredentials {
  membro: string
  senha: string
}

interface AuthState {
  token: string
  user: IUserDtos
}

interface AuthContextData {
  user: IUserDtos
  signIn(credentials: IUserCredentials): Promise<void>
  logOut: () => void
}

const keyUser = '@geb:user'
const keyToken = '@geb:tokn'

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: any) {
  const [data, setData] = React.useState<AuthState>({} as AuthState)
  const [loading, setLoading] = React.useState<boolean>(false)

  // const [data, setData] = useState<AuthState>(() => {
  //   const token = localStorage.getItem(keyToken)
  //   const user = localStorage.getItem(keyUser)

  //   if (token && user) {
  //     api.defaults.headers.common.Authorization = `Bearer ${token[1]}`

  //     return { token, user: JSON.parse(user) }
  //   }

  //   return {} as AuthState
  // })

  const updateDataUser = React.useCallback(async (token: string) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`

    await api.get('/user/find-user-by-id').then(async (h) => {
      const user = h.data
      setData({ token, user })
    })
  }, [])

  const LoadingUser = useCallback(async () => {
    setLoading(true)

    const token = localStorage.getItem(keyToken)

    if (token) {
      updateDataUser(token)
    }

    setLoading(false)
  }, [updateDataUser])

  React.useEffect(() => {
    LoadingUser()
  }, [])

  const signIn = useCallback(async ({ membro, senha }: IUserCredentials) => {
    await api
      .post('/user/session', {
        membro,
        senha,
      })
      .then(async (h) => {
        const { token, user } = h.data
        api.defaults.headers.common.Authorization = `Bearer ${token}`

        await api.get('/user/find-user-by-id').then(async (h) => {
          const user = h.data
          setData({ token, user })
          localStorage.setItem(keyToken, token)
          setData({ token, user })
        })
      })
  }, [])

  const logOut = useCallback(async () => {
    localStorage.removeItem(keyToken)
    localStorage.removeItem(keyUser)

    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider value={{ signIn, user: data.user, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return context
}
