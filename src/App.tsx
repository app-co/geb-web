import { Router } from './routes'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './context'
import { QueryClient, QueryClientProvider } from 'react-query'

function App() {
  const queryClient = new QueryClient()

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppProvider>
            <Router />
          </AppProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  )
}

export default App
