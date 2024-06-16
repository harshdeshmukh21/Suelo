import { useState, useEffect } from "react";
import star from "./star.png";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { Card } from "@/components/card";
import Sidebar from "./Side-bar";
import Remainder from "./Remainder";
import Leaderboardwidget from "./Leaderboardwidget";
import { useAuth0 } from "@auth0/auth0-react";

export default function Dashboard() {
  const { user } = useAuth0();

  const [highlightedUpdates] = useState([
    {
      title: "Harsh loves Trees",
      description: "We have planted over 2000 trees today kudos to us",
    },
    {
      title: "Atharva-plants",
      description: "We have planted over 2000 trees today kudos to us",
    },
    {
      title: "Arya is a tree planter!",
      description: "I have planted over 100 trees in a week",
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === highlightedUpdates.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [highlightedUpdates]);

  return (
    <div className="text-white flex overflow-hidden">
      <Sidebar />
      <div className="right w-full ml-8">
        <div className="upper flex flex-row w-full">
          <div className="flex flex-row justify-start w-full items-center p-4">
            <h1 className="text-black text-xl ">
              Hello {user ? user.name : "User"}
            </h1>
          </div>

          <div className="flex flex-row w-full items-end justify-end p-4 mr-4 gap-8">
            <div className="text-black p-2 flex flex-row bg-gray-100 rounded-3xl border border-gray-100">
              <h1 className="text-[14px] mr-2">2000</h1>
              <img src={star} className="h-5" />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center gap-0">
          <div className="w-2/4 flex justify-center">
            <Card className="bg-[#1F2114] h-[200px] text-white w-[380px] mr-[30px] flex justify-center items-center">
              <div className="w-[350px]">
                <CardHeader>
                  <CardTitle>
                    <div className="text-left text-[24px] font-semibold text-white mt-8">
                      Highlighted Updates
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="overflow-scroll bg-white text-black flex justify-center items-center rounded-md h-[100px] mb-8">
                  <div className="flex flex-col justify-center items-center mt-[30px]">
                    <CardHeader>
                      <CardTitle>
                        {highlightedUpdates[currentIndex].title}
                      </CardTitle>
                      <CardDescription>
                        {highlightedUpdates[currentIndex].description}
                      </CardDescription>
                    </CardHeader>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
          <div className="w-full flex flex-row mr-[35px] gap-0">
            <div className="bg-[#1F2114] w-[200px] rounded-xl ml-2 h-[200px] flex-col">
              <p className="ml-12 mt-6">Trees Planted</p>
              <p className="text-[100px] ml-3 mt-[-10px]">100</p>
            </div>
            <div className="bg-[#1F2114] w-[200px] rounded-xl ml-2 h-[200px]">
              <p className="ml-7 mt-6">Involved in Activities</p>
              <p className="text-[100px] ml-3 mt-[-10px]">120</p>
            </div>
            <div className="bg-[#1F2114] w-[200px] rounded-xl ml-2 h-[200px]">
              <p className="ml-16 mt-6">Commits</p>
              <p className="text-[100px] ml-10 mt-[-10px]">75</p>
            </div>
            <div className="bg-[#1F2114] w-[200px] rounded-xl ml-2 h-[200px]">
              <p className="ml-10 mt-6">Plants discovered</p>
              <p className="text-[100px] ml-12 mt-[-10px]">30</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <Remainder />
          <Leaderboardwidget />
        </div>
      </div>
    </div>
  );
}
