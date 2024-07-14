import { Button } from "@/components/ui/button";
import logo from "./image.png";
import { useNavigate } from "react-router-dom";
import logoutImage from "../assets/Logout.png";
import userpfp from "../assets/user-pfp.png";
import { useAuth0 } from "@auth0/auth0-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="h-screen bg-[#171717] flex p-5 items-center flex-col justify-content-around">
      <div className="flex items-center flex-row">
        <img src={logo} className="h-7 w-7" />
        <h1 className="ml-2 text-xl text-white font-Montserrat">Suelo</h1>
      </div>
      <div className="flex flex-col items-start">
        <Button
          className="m-1 mt-10 text-white"
          onClick={() => navigate("/dashboard")}
          variant="ghost"
        >
          Dashboard
        </Button>
        <Button
          className="m-1 font-white text-white focus:text-white active:text-white"
          variant="ghost"
          onClick={() => navigate("/events")}
        >
          Activities
        </Button>
        <Button
          className="m-1 text-white focus:text-white active:text-white"
          variant="ghost"
          onClick={() => navigate("/updates")}
        >
          Updates
        </Button>
        <Button
          className="m-1 text-white focus:text-white active:text-white"
          variant="ghost"
          onClick={() => navigate("/yieldatlas")}
        >
          Map
        </Button>
      </div>

      {/* <a href="http://">
        <div className="h-7 w-7 mt-4" onClick={() => navigate("/auth")}>
          <img src={userpfp} alt="Logout" />
        </div>
      </a> */}

      <div className="h-9 w-9 mt-[350px]">
        <img src={logoutImage} alt="logout" onClick={handleLogout} />
      </div>
    </div>
  );
};

export default Sidebar;
