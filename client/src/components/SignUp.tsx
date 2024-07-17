import { useState } from "react";
import { auth } from "../Firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
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
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

const SignUp: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const saveDataToFirebase = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => alert("User created successfully"))
      .then(() => navigate("/dashboard"));
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => alert("User signed in successfully"))
      .then(() => navigate("/dashboard"))

      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <img src={logo} alt="" className="h-20" />
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  type="text"
                  placeholder="Max"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={saveDataToFirebase}
            >
              Create an account
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={signInWithGoogle}
            >
              Sign up with{" "}
              <img
                src="https://img.icons8.com/color/48/000000/google-logo.png"
                alt="Google"
                className="h-5 w-5 ml-1"
              />
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link className="underline cursor-pointer" to={"/SignIn"}>
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
