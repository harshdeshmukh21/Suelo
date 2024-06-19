import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Landing from "./components/landing";
import Auth from "./components/auth";
import Login from "./components/login";
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
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/yieldatlas" element={<Map />} />
        <Route path="/events" element={<Events />} />
        <Route path="/updates" element={<Updates />} />
      </Routes>
    </Router>
  );
}

export default App;
