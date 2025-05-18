import { Link, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { Button } from "../components/ui/button"
import { AlertTriangle, ArrowLeft } from "lucide-react"

const NotFound = () => {
  const location = useLocation()

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    )
  }, [location.pathname])

  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center py-12">
      <AlertTriangle className="h-20 w-20 text-destructive mb-6" />
      <h1 className="text-6xl font-bold mb-4 text-destructive">404</h1>
      <h2 className="text-3xl font-semibold mb-3">Page Not Found</h2>
      <Button asChild size="lg">
        <Link to="/">
          <ArrowLeft className="mr-2 h-5 w-5 text-secondary-foreground" />
          <span className="text-secondary-foreground">Return to Homepage</span>
        </Link>
      </Button>
    </div>
  )
}

export default NotFound