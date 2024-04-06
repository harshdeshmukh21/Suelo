import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Landing from "./components/landing";
import Auth from "./components/auth";
import Dashboard from "./comps/Dashboard";
import Map from "./components/Map";
import Events from "./components/events";
import "./App.css";
import "./index.css";

import "./App.css";
import Updates from "./comps/Updates";
import Home from "./Home";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/yieldatlas/*" element={<Map />} />
        <Route path="/events/*" element={<Events />} />
        <Route path="/updates/*" element={<Updates />} />
      </Routes>
    </Router>
  );
}

export default App;
