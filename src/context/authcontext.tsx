import React, { createContext, useCallback, useContext } from 'react'
import { IUserDtos } from '../dtos'
import { api } from '../services'
import { make } from '../hooks'
import { IUser } from '../hooks/dto/interfaces'

interface IUserCredentials {
  apelido: string
  senha: string
}

interface AuthState {
  token: string
  user: IUser
}

interface AuthContextData {
  user: IUser
  signIn(credentials: IUserCredentials): Promise<void>
  logOut: () => void
}

const keyUser = '@geb:user'
const keyToken = '@geb:tokn'

const AuthContext = createContext<AuthContextData>({} as AuthContextData)
const { mutations, get } = make()

export function AuthProvider({ children }: any) {
  const [data, setData] = React.useState<AuthState>({} as AuthState)
  const [loading, setLoading] = React.useState<boolean>(false)
  const { mutateAsync, isLoading } = mutations.session()

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

    const user = await get.userById()
    setData({ token, user })
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

  const signIn = useCallback(async ({ apelido, senha }: IUserCredentials) => {
    const log = await mutateAsync({ apelido, senha })

    const { token } = log
    api.defaults.headers.common.Authorization = `Bearer ${token}`

    const user = await get.userById()
    setData({ token, user })
    localStorage.setItem(keyToken, token)
    setData({ token, user })
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
