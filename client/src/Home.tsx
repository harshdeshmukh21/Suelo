import { useNavigate } from "react-router-dom"
import { Button } from "./components/button"


const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full h-screen flex items-center justify-center flex-col">    <div><h1 className="text-4xl">Suelo</h1></div>
            <Button onClick={() => navigate("/auth")}>Get Started</Button></div>

    )
}

export default Home