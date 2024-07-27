import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/SignIn";
import Dashboard from "./comps/Dashboard";
import Events from "./components/events";
import "./App.css";
import "./index.css";
import Updates from "./comps/Updates";
import Home from "./Home";
import Map from "./components/Map";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";
import { TooltipProvider } from "@radix-ui/react-tooltip";

function App() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Hello", user.displayName);
      } else {
        console.log("You are logged out");
      }
    });
  }, []);

  return (
    <TooltipProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/yieldatlas" element={<Map />} />
          <Route path="/events" element={<Events />} />
          <Route path="/updates" element={<Updates />} />
        </Routes>
      </Router>
    </TooltipProvider>
  );
}

export default App;
