import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { LogIn } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"
import useAuthStore from "../store/authStore"
import usePostUserLogin from "../hooks/usePostLogin"
import { useEffect } from "react"
import Loader from "../components/loader"

const LoginPage = () => {
  const navigate = useNavigate()
  const { setUserAuth, setErrorMessage, isLoading, setIsLoading, errorMessage } =
    useAuthStore()

  useEffect(() => {
    setErrorMessage(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { mutateAsync: loginMutation } = usePostUserLogin({
    onSuccess: (res) => {
      setUserAuth(res)
      navigate('/')
    },
    onError: (err) => {
      const msg = err?.response?.data?.error?.message ?? "Login failed."
      setErrorMessage(msg)
    },
    onSettled: () => setIsLoading(false),
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const form = e.target as HTMLFormElement
    loginMutation({
      identifier: (form.elements[0] as HTMLInputElement).value,
      password: (form.elements[1] as HTMLInputElement).value,
    })
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <LogIn className="mx-auto h-10 w-10 text-primary mb-4" />
            <CardTitle className="text-2xl">Welcome Back!</CardTitle>
            <CardDescription>
              Enter your credentials to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>
              {errorMessage && (
                <div>
                  <Label className="text-destructive">{errorMessage}</Label>
                </div>
              )}
              <Button type="submit" className="w-full text-secondary-foreground">
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center text-sm">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Button variant="link" asChild className="p-0 h-auto text-primary">
                <Link to="/register">Register</Link>
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default LoginPage
