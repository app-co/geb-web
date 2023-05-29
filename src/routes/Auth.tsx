import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/authcontext'

export function AuthRoute() {
  const { user } = useAuth()

  console.log(user, 'user')

  return user ? <Outlet /> : <Navigate to="/" />
}
