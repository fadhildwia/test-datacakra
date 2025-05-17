import "./App.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout"
import { Index } from "./pages/Index"
import { ArticlePage } from "./pages/ArticlePage"
import { CategoryPage } from "./pages/CategoryPage"
import { ProtectedRoute } from "./routes/ProtectedRoute"
import LoginPage from "./pages/LoginPage"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <Layout>
                <Outlet />
              </Layout>
            }
          >
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Index />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Index />} />
              <Route path="/articles" element={<ArticlePage />} />
              <Route path="/categories" element={<CategoryPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
