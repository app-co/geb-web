import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/authcontext'
import { Cadastro } from '../pages/Cadastro'
import { Convidados } from '../pages/Convidados'
import { Home } from '../pages/Home'
import { LogIn } from '../pages/LogIn'
import { Users } from '../pages/Users'
import { RouteApp } from './App'
import { AuthRoute } from './Auth'

export function Router() {
  const { user } = useAuth()

  function PrivateRoue({ path, element }: any) {
    return user ? element : <Navigate to="/" replace />
  }

  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/home" element={<PrivateRoue element={<Home />} />} />
      <Route path="/users" element={<PrivateRoue element={<Users />} />} />
      <Route path="/guest" element={<PrivateRoue element={<Convidados />} />} />
      <Route path="/create" element={<PrivateRoue element={<Cadastro />} />} />
    </Routes>
  )
}
