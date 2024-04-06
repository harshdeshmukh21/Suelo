import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      console.log(isAuthenticated);
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    await loginWithRedirect();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <button
      className="text-black mt-4 font-montserrat opacity-60 text-xs"
      onClick={handleLogin}
    >
      Log In
    </button>
  );
};

export default LoginButton;
