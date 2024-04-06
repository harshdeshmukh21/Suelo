import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { db } from "../Firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

const LoginButton = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();

  if(user){
    console.log(user);
  }

  useEffect(() => {
    if (isAuthenticated) {
      // Check if user exists in Firestore
      const userRef = doc(db, "users", user?.sub ?? "");
      getDoc(userRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            // User exists, navigate to dashboard
            navigate("/dashboard");
          } else {
            // User doesn't exist, create a new document in Firestore
            setDoc(userRef, {
              name: user?.name ?? "",
              email: user?.email ?? "",
              picture: user?.picture ?? "",
              // Add any other user properties you need
            })
              .then(() => {
                navigate("/dashboard");
              });
          }
        });
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