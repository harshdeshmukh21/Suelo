import { useNavigate } from "react-router-dom"
import { Button } from "./components/button"
import './App.css'


const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full h-screen flex items-center justify-center flex-col home">    <div className="flex flex-row items-center justify-center"><h1 className="text-[200px] font-bold text-white">Suelo</h1></div>
            <Button className="bg-[#1F2114] " onClick={() => navigate("/auth")}>Get Started</Button></div>

    )
}

export default Home