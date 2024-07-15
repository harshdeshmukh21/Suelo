
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import logo from '../assets/logo.svg'

export default function login() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen w-full">

      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <img src={logo} alt="" className="h-20" />
          <CardTitle className="text-xl">Sign In</CardTitle>
          <CardDescription>
            Enter your information to Login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>

          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <a className="underline cursor-pointer" onClick={() => navigate("/SignUp")}>
              Sign Up
            </a>
          </div>
        </CardContent>
      </Card>
    </div >

  )
}
