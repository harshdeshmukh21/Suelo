import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { auth, db } from "@/Firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Update {
  id: string;
  content: string;
  authorName: string;
  authorPicture: string;
  createdAt: Timestamp;
  highlighted: boolean;
}

const Updates = () => {
  const [newUpdate, setNewUpdate] = useState("");
  const [updates, setUpdates] = useState<Update[]>([]);
  const user = auth.currentUser;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUpdate(event.target.value);
  };

  useEffect(() => {
    const updatesCollectionRef = collection(db, "updates");
    const q = query(updatesCollectionRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedUpdates = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Update[];
      setUpdates(fetchedUpdates);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    if (!user || !newUpdate.trim()) return;
    try {
      const updatesCollectionRef = collection(db, "updates");
      await addDoc(updatesCollectionRef, {
        content: newUpdate,
        authorName: user.displayName || "Anonymous",
        authorPicture: user.photoURL || "",
        createdAt: Timestamp.now(),
        highlighted: true,
      });
      setNewUpdate(""); // Clear the input after posting
    } catch (error) {
      console.error("Error adding update: ", error);
      alert("Failed to add update. Please try again.");
    }
  };

  return (
    <div className="flex flex-row flex-wrap bg-[#171717] h-[100vh]">
      <Sidebar />
      <div className="flex flex-col pl-20 p-8 flex-1 h-full">
        <div className="flex-1 overflow-y-auto mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-auto">
            {updates.map((update) => (
              <div
                key={update.id}
                className="w-full bg-black text-gray-200 p-4 shadow-lg rounded-lg shadow-olive-500/40 flex flex-col"
                style={{ minHeight: "auto", height: "auto" }}
              >
                <div className="flex flex-row font-medium items-center space-x-3 w-full">
                  <img
                    src={update.authorPicture}
                    className="h-10"
                    alt={update.authorName}
                  />
                  <h1 className="text-white">{update.authorName}</h1>
                  <span className="ml-auto text-gray-400 text-sm font-normal">
                    {update.createdAt.toDate().toLocaleDateString()}{" "}
                    {update.createdAt.toDate().toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex w-full mt-2">
                  <h3 className="text-white break-words">{update.content}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full items-end gap-4">
          <Input
            type="text"
            className="flex-1 border text-white rounded-md placeholder:text-white"
            placeholder="What is happening?"
            value={newUpdate}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            className="hover:bg-black hover:text-white bg-[#088536] rounded-md text-white"
            onClick={handleSubmit}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Updates;
