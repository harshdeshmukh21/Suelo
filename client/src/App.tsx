import { Button } from "./components/ui/button";
import "./App.css";
import Component from "./components/ui/navbar";

function App() {
  return (
    <div className="bg-black h-screen">
      <Button>Hello</Button>
      <Component />
    </div>
  );
}

export default App;
