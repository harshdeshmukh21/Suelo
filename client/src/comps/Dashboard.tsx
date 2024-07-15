import { useState, useEffect } from "react";
import star from "./star.png";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Card,
} from "@/components/card";
import Sidebar from "./Side-bar";
import Leaderboardwidget from "./Leaderboardwidget";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { db } from "@/Firebase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  arrayRemove,
  query,
  orderBy,
  limit,
  where,
  Timestamp,
} from "firebase/firestore";
import { Button } from "@/components/ui/button";

interface Activity {
  id: string;
  name: string;
  location: string;
  participants?: string[];
}

interface HighlightedUpdate {
  id: string;
  content: string;
  authorName: string;
  createdAt: Timestamp;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [joinedActivities, setJoinedActivities] = useState<string[]>([]);
  const [highlightedUpdates, setHighlightedUpdates] = useState<
    HighlightedUpdate[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const activitiesCollectionRef = collection(db, "activities");
    const unsubscribe = onSnapshot(activitiesCollectionRef, (snapshot) => {
      const fetchedActivities = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        location: doc.data().location,
        participants: doc.data().participants || [],
      }));
      setActivities(fetchedActivities);

      if (user) {
        const userJoinedActivities = fetchedActivities
          .filter((activity) => activity.participants.includes(user.uid))
          .map((activity) => activity.id);
        setJoinedActivities(userJoinedActivities);
      }
    });

    return unsubscribe;
  }, [user]);

  useEffect(() => {
    setLoading(true);
    const updatesCollectionRef = collection(db, "updates");
    const q = query(
      updatesCollectionRef,
      where("highlighted", "==", true),
      orderBy("createdAt", "desc"),
      limit(5)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedUpdates = snapshot.docs.map((doc) => ({
          id: doc.id,
          content: doc.data().content,
          authorName: doc.data().authorName,
          createdAt: doc.data().createdAt,
        }));
        setHighlightedUpdates(fetchedUpdates);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching updates:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === highlightedUpdates.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [highlightedUpdates]);

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

  const StatCard = ({ title, value }: { title: string; value: string }) => (
    <div className="bg-[#171717] w-[200px] rounded-xl ml-2 h-[200px] flex-col">
      <p className="ml-7 mt-6 text-center">{title}</p>
      <p className="text-[100px] text-center mt-[-10px]">{value}</p>
    </div>
  );

  return (
    <div className="text-white flex overflow-hidden">
      <Sidebar />
      <div className="right w-full ml-8">
        <div className="upper flex flex-row w-full justify-between items-center p-4">
          <h1 className="text-black text-xl">
            Hello {user ? user.displayName : "User"}
          </h1>
          <div className="text-black p-2 flex flex-row bg-gray-100 rounded-3xl border border-gray-100 mr-6">
            <h1 className="text-[14px] mr-2">2000</h1>
            <img src={star} className="h-5" alt="Star" />
          </div>
        </div>
        <div className="flex flex-row justify-center gap-0">
          <div className="w-2/4 flex justify-center">
            <Card className="bg-[#171717] h-[200px] text-white w-[380px] mr-[30px] flex justify-center items-center">
              <div className="w-[350px]">
                <CardHeader>
                  <CardTitle>
                    <div className="text-left text-[24px] font-semibold text-white mt-8">
                      Highlighted Updates
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="overflow-scroll bg-white text-black flex justify-center items-center rounded-md h-[100px] mb-8">
                  {loading ? (
                    <p>Loading updates...</p>
                  ) : highlightedUpdates.length === 0 ? (
                    <p>No updates available.</p>
                  ) : (
                    <div className="flex flex-col justify-center items-center mt-[30px]">
                      <CardHeader>
                        <CardTitle>
                          {highlightedUpdates[currentIndex]?.authorName ||
                            "Anonymous"}
                        </CardTitle>
                        <CardDescription>
                          {highlightedUpdates[currentIndex]?.content ||
                            "No content"}
                        </CardDescription>
                      </CardHeader>
                    </div>
                  )}
                </CardContent>
              </div>
            </Card>
          </div>
          <div className="w-full flex flex-row mr-[35px] gap-0">
            <StatCard title="Trees Planted" value="100" />
            <StatCard title="Involved in Activities" value="120" />
            <StatCard title="Commits" value="75" />
            <StatCard title="Plants discovered" value="30" />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-[90%] mt-8 h-[350px] overflow-scroll rounded-xl bg-[#171717] p-4">
            <h1 className="text-[24px] font-semibold pb-2">
              Joined Activities
            </h1>
            {activities
              .filter((activity) => joinedActivities.includes(activity.id))
              .map((activity) => (
                <div
                  key={activity.id}
                  className="w-full outline mt-2 mb-4 h-[80px] items-center shadow-lg rounded-lg shadow-olive-500/40 p-3 flex"
                >
                  <div className="flex flex-col w-full">
                    <h1>{activity.name}</h1>
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
          <Leaderboardwidget />
        </div>
      </div>
    </div>
  );
}
