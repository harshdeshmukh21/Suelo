import { Card } from "@/components/card"
import Sidebar from "./Side-bar"



const Updates = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="bg-white">
                <Card />
            </div>
        </div>
    )
}

export default Updates