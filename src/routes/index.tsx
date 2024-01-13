import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../context/authcontext'
import { Home } from '../pages/Home'
import { LogIn } from '../pages/LogIn'
import { Membros } from '../pages/Membros'
import { NewMembro } from '../pages/NewMembro'
import { Presenca } from '../pages/Presenca'
import { Rank } from '../pages/Rank'

export function Router() {
  const { user } = useAuth()

  console.log({ user })

  function PrivateRoue({ path, element }: any) {
    return user ? element : <Navigate to="/" replace />
  }

  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/home" element={<PrivateRoue element={<Home />} />} />
      <Route path="/membros" element={<PrivateRoue element={<Membros />} />} />
      <Route
        path="/new-membro"
        element={<PrivateRoue element={<NewMembro />} />}
      />
      <Route path="/rank" element={<PrivateRoue element={<Rank />} />} />
      <Route
        path="/presenca"
        element={<PrivateRoue element={<Presenca />} />}
      />
    </Routes>
  )
}
