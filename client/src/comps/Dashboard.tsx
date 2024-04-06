import { Card } from "@/components/ui/card.tsx";
import star from './star.png'
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Sidebar from "./Side-bar";

export default function Dashboard() {
    return (
        <div className="text-white flex ">
            <Sidebar />
            <div className="right w-4/5 ml-10">
                <div className="upper flex flex-row w-full"><div className="flex flex-row justify-start w-full items-center p-4">
                    <h1 className="text-black text-xl ">Hello User</h1>
                </div>

                    <div className="flex flex-row w-full items-end justify-end h-20 p-4">
                        <div className="text-black p-2 flex flex-row bg-gray-100 rounded-3xl border border-gray-100">
                            <h1 className="text-xl mr-2">2000</h1>
                            <img src={star} className="h-6" />
                        </div>
                    </div>
                </div>

                <div className="w-2/5 ">
                    <Card className="bg-[#1F2114] text-white">
                        <CardHeader>
                            <CardTitle>High Lighted Updates</CardTitle>
                        </CardHeader>
                        <CardContent className="overflow-scroll h-10">
                            <CardHeader>
                                <CardTitle>HarshlovesTrees</CardTitle>
                                <CardDescription>We have planted over 2000 trees today kuddos to us</CardDescription>
                            </CardHeader>
                            <CardHeader>
                                <CardTitle>HarshlovesTrees</CardTitle>
                                <CardDescription>We have planted over 2000 trees today kuddos to us</CardDescription>
                            </CardHeader>
                            <CardHeader>
                                <CardTitle>HarshlovesTrees</CardTitle>
                                <CardDescription>We have planted over 2000 trees today kuddos to us</CardDescription>
                            </CardHeader>
                        </CardContent>

                    </Card>
                </div>
            </div>
        </div>

    );
}