import React, { createContext, useCallback, useContext, useState } from 'react'
import { IUser } from '../dtos'
import { api } from '../services'

interface IUserCredentials {
  membro: string
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

export function AuthProvider({ children }: any) {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem(keyToken)
    const user = localStorage.getItem(keyUser)

    if (token && user) {
      api.defaults.headers.common.Authorization = `Bearer ${token[1]}`

      return { token, user: JSON.parse(user) }
    }

    return {} as AuthState
  })

  React.useEffect(() => {
    const token = localStorage.getItem(keyToken)

    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`
    }
  }, [])

  const signIn = useCallback(async ({ membro, senha }: IUserCredentials) => {
    await api
      .post('/user/session', {
        membro,
        senha,
      })
      .then((h) => {
        const { token, user } = h.data

        localStorage.setItem(keyToken, token)
        localStorage.setItem(keyUser, JSON.stringify(user))
        console.log(token)
        api.defaults.headers.common.Authorization = `Bearer ${token}`

        setData({ token, user })
      })
    // .catch((h) => {
    //   if (h.message === 'Network Error') {
    //     return alert('Erro de conexão com o servidor')
    //   }
    //   return alert(`Ops! Algo deu errado. ${h.response.data.message}`)
    // })
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
