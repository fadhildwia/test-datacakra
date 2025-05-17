import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Index } from './pages/Index'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <Routes>
        <Route element={<Layout><Outlet /></Layout>}>
          <Route path="/" element={<Index />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
