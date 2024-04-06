import { useAuth0 } from "@auth0/auth0-react";
// import "./login.css";

const LoginButton = () => {
  const { loginWithRedirect, user } = useAuth0();

  // Correctly use console.log to print the user information
  console.log("Current User:", user);

  return (
    <button
      className="text-black mt-4 font-montserrat opacity-60 text-xs"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </button>
  );
};
export default LoginButton;
