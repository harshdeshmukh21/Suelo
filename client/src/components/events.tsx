import Sidebar from "../comps/Side-bar.tsx";
import chipko from "../assets/image.png";
import Activity from "@/components/ui/create-act.tsx";
import { db } from "@/Firebase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button } from "./ui/button.tsx";
import { getAuth } from "firebase/auth";

const Events = () => {
  interface Activity {
    id: string;
    name: string;
    location: string;
    participants?: string[];
  }

  const [activities, setActivities] = useState<Activity[]>([]);
  const [joinedActivities, setJoinedActivities] = useState<string[]>([]);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const activitiesCollectionRef = collection(db, "activities");
    const unsubscribe = onSnapshot(activitiesCollectionRef, (snapshot) => {
      const activities = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        location: doc.data().location,
        participants: doc.data().participants || [],
      }));
      setActivities(activities);

      if (user) {
        const userJoinedActivities = activities
          .filter((activity) => activity.participants.includes(user.uid))
          .map((activity) => activity.id);
        setJoinedActivities(userJoinedActivities);
      }
    });

    return unsubscribe;
  }, [user]);

  const joinActivity = async (activityId: string) => {
    if (!user) {
      alert("Please log in to join an activity");
      return;
    }

    const activityRef = doc(db, "activities", activityId);

    try {
      await updateDoc(activityRef, {
        participants: arrayUnion(user.uid),
      });

      setJoinedActivities([...joinedActivities, activityId]);
      alert("Successfully joined the activity!");
    } catch (error) {
      console.error("Error joining activity: ", error);
      alert("Failed to join the activity. Please try again.");
    }
  };

  const leaveActivity = async (activityId: string) => {
    if (!user) {
      alert("Please log in to leave an activity");
      return;
    }

    const activityRef = doc(db, "activities", activityId);

    try {
      await updateDoc(activityRef, {
        participants: arrayRemove(user.uid),
      });

      setJoinedActivities(joinedActivities.filter((id) => id !== activityId));
      alert("Successfully left the activity!");
    } catch (error) {
      console.error("Error leaving activity: ", error);
      alert("Failed to leave the activity. Please try again.");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="right flex flex-col w-full m-2">
        <div className="upper w-full ">
          <div
            className="h-[250px] flex bg-contain border-black border-8 rounded-md w-full relative"
            style={{
              backgroundImage: `url(${chipko})`,
            }}
          ></div>
        </div>
        <div className="flex flex-row gap-[965px]">
          <h1 className="m-4 font-bold text-[30px] text-[#1F2114]">Events</h1>
          <div className="list overflow-scroll p-2 h-[400px] w-[40%] mt-4">
            <Activity />
          </div>
        </div>

        <div className="p-2 h-[400px] w-[100%] flex flex-row mt-[-330px]">
          <div className="w-[90%] h-[350px] overflow-scroll rounded-xl bg-[#171717] p-4 mt-[-20px]">
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
                  {!joinedActivities.includes(activity.id) ? (
                    <Button
                      className="bg-white text-black transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-200"
                      onClick={() => joinActivity(activity.id)}
                    >
                      Join
                    </Button>
                  ) : (
                    <Button
                      className="bg-red-500 text-white transition duration-300 ease-in-out transform hover:scale-105 hover:bg-red-600"
                      onClick={() => leaveActivity(activity.id)}
                    >
                      Leave
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="w-[90%] h-[350px] overflow-scroll rounded-xl bg-[#171717] p-4 mt-[-20px] ml-8">
            <h1 className="text-[18px] font-semibold pb-2 text-white">
              Joined Activities
            </h1>
            {activities
              .filter((activity) => joinedActivities.includes(activity.id))
              .map((activity) => (
                <div
                  key={activity.id}
                  className="w-full outline mt-2 mb-4 h-[80px] items-center shadow-lg rounded-lg shadow-olive-500/40 p-3 flex border border-white"
                >
                  <div className="flex flex-col w-full">
                    <h1 className="text-white">{activity.name}</h1>
                    <p className="text-gray-500">{activity.location}</p>
                  </div>
                  <div className="flex items-end justify-end w-full">
                    <Button
                      className="bg-red-500 text-white transition duration-300 ease-in-out transform hover:scale-105 hover:bg-red-600"
                      onClick={() => leaveActivity(activity.id)}
                    >
                      Leave
                    </Button>
                  </div>
                </div>
              ))}
          </div>
          <div className="w-[90%] h-[350px] overflow-scroll rounded-xl bg-[#171717] p-4 mt-[-20px] ml-8">
            <h1 className="text-[18px] font-semibold pb-2 text-white">
              Created Activities
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
