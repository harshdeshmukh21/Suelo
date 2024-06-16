import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, user } = useAuth0();
  console.log(user);

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
