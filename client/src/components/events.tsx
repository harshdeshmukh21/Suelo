import Sidebar from "../comps/Side-bar.tsx";
import chipko from "../assets/image.png";
import Activity from "@/components/ui/create-act.tsx";
import { db } from "@/Firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button } from "./ui/button.tsx";

const Events = () => {
  interface Activity {
    id: string;
    name: string;
    location: string;
  }

  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const activitiesCollectionRef = collection(db, "activities");
    const unsubscribe = onSnapshot(activitiesCollectionRef, (snapshot) => {
      const activities = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        location: doc.data().location,
      }));
      setActivities(activities);
    });

    return unsubscribe; // Cleanup function to unsubscribe from the listener
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="right flex flex-col w-full m-2">
        <div className="upper w-full ">
          {" "}
          <div
            className="h-[250px] flex bg-contain border-black border-8 rounded-md w-full relative"
            style={{
              backgroundImage: `url(${chipko})`,
            }}
          ></div>
        </div>
        <h1 className="m-4 font-bold text-[30px] text-[#1F2114]">Events</h1>
        <div className="p-2 h-[400px] w-[55%] flex flex-row">
          <div className="w-[90%] h-[350px] overflow-scroll rounded-xl bg-[#1F2114] p-4 mt-[-20px]">
            <h1 className="text-[18px] font-semibold pb-2 text-white">
              Top Events
            </h1>
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="w-full outline mt-2 mb-4 h-[80px] items-center shadow-lg rounded-lg shadow-olive-500/40 p-3 flex border border-white"
              >
                <div className="flex flex-col w-full">
                  <h1 className="text-white">{activity.name}</h1>
                  <p className="text-gray-500">{activity.location}</p>
                </div>
                <div className="flex items-end justify-end w-full">
                  <Button className="bg-white text-black">Join</Button>
                </div>
              </div>
            ))}
          </div>
          <div className="list overflow-scroll p-2 h-[400px] w-[40%]">
            <Activity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
