
import { Button } from "@/components/ui/button"
import logo from './image.png'



const Sidebar = () => {
    return (
        <div className="h-screen bg-[#1F2114] flex p-5 items-center flex-col ">
            <div className="flex items-center flex-row" >     <img src={logo} className="h-7 w-7" /><h1 className="ml-2 text-xl">Suelo</h1></div>
            <div className="flex flex-col items-start"><Button className='m-1 mt-10' variant="ghost">Dashboard </Button>
                <Button className='m-1' variant="ghost">Activities</Button>
                <Button className='m-1' variant="ghost">Updates</Button>
                <Button className='m-1' variant="ghost">Map</Button></div>

        </div>
    )
}

export default Sidebar