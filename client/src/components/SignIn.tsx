import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const signInUser = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/dashboard"))
      .then(() => alert("User signed in successfully"))
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-[black]">
      <Card className="mx-auto max-w-sm bg-[#000000] border-[#27272A] text-white">
        <CardHeader>
          <img src={logo} alt="" className="h-20" />
          <CardTitle className="text-xl">Sign In</CardTitle>
          <CardDescription className="text-[#A1A1AA]">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-[#27272A]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-[#27272A]"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#088536]"
              style={{
                backgroundColor: "#088536",
                color: "white",
              }}
              onClick={signInUser}
            >
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm text-[#A1A1AA]">
            Already have an account?{" "}
            <a
              className="underline cursor-pointer"
              onClick={() => navigate("/SignUp")}
            >
              Sign Up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
