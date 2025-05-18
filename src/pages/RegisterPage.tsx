import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { UserPlus } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import usePostUserRegister from "../hooks/usePostRegister"
import useAuthStore from "../store/authStore"
import { useEffect } from "react"

const RegisterPage = () => {
  const navigate = useNavigate()
  const { setUserAuth, setErrorMessage, setIsLoading, errorMessage } =
  useAuthStore()

  useEffect(() => {
    setErrorMessage(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { mutateAsync: registerMutation } = usePostUserRegister({
    onSuccess: (res) => {
      setUserAuth(res)
      navigate('/')
    },
    onError: (err) => {
      const msg = err?.response?.data?.error?.message ?? "Register failed."
      setErrorMessage(msg)
    },
    onSettled: () => setIsLoading(false),
  })

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    if ((form.elements[2] as HTMLInputElement).value === (form.elements[3] as HTMLInputElement).value) {
      setIsLoading(true)
      registerMutation({
        username: (form.elements[0] as HTMLInputElement).value,
        email: (form.elements[1] as HTMLInputElement).value,
        password: (form.elements[2] as HTMLInputElement).value,
      })
    } else {
      const msg = "Passwords do not match."
      setErrorMessage(msg)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <UserPlus className="mx-auto h-10 w-10 text-primary mb-4" />
          <CardTitle className="text-2xl">Create an Account</CardTitle>
          <CardDescription>Join Travel Apps and start your adventure.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="Your Name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" placeholder="••••••••" required />
            </div>
            {errorMessage && (
              <div>
                <Label className="text-destructive">{errorMessage}</Label>
              </div>
            )}
            <Button type="submit" className="w-full text-secondary-foreground">
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Button variant="link" asChild className="p-0 h-auto text-primary">
              <Link to="/login">Login</Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default RegisterPage