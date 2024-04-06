import { Button } from "@/components/ui/button";
import logo from "./image.png";
import DialogDemo from "@/components/ui/profile";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-[#1F2114] flex p-5 items-center flex-col ">
      <div className="flex items-center flex-row">
        <img src={logo} className="h-7 w-7" />
        <h1 className="ml-2 text-xl text-white font-Montserrat">Suelo</h1>
      </div>
      <div className="flex flex-col items-start">
        <Button className="m-1 mt-10 text-white" onClick={() => navigate("/dashboard")} variant="ghost">
          Dashboard
        </Button>
        <Button
          className="m-1 font-white text-white focus:text-white active:text-white"
          variant="ghost" onClick={() => navigate("/events")}
        >
          Activities
        </Button>
        <Button
          className="m-1 text-white focus:text-white active:text-white"
          variant="ghost" onClick={() => navigate("/updates")}
        >
          Updates
        </Button>
        <Button
          className="m-1 text-white focus:text-white active:text-white"
          variant="ghost" onClick={() => navigate("/yieldatlas")}
        >
          Map
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
