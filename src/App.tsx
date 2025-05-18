import "./App.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout"
import { Index } from "./pages/Index"
import { ArticlePage } from "./pages/ArticlePage"
import { ProtectedRoute } from "./routes/ProtectedRoute"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { PublicRoute } from "./routes/PublicRoute"
import NotFound from "./pages/NotFound"
import CategoryPage from "./pages/CategoryPage"
import ArticleDetailPage from "./pages/ArticleDetailPage"

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
            <Route path="/" element={<Index />} />
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/articles" element={<ArticlePage />} />
              <Route path="/articles/:documentId" element={<ArticleDetailPage />} />
              <Route path="/categories" element={<CategoryPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
