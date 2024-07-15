import { useState, useEffect } from "react";
import Sidebar from "./Side-bar";
import { Textarea } from "@/components/ui/textarea";
import { auth, db } from "@/Firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
  where,
} from "firebase/firestore";

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
  const [isTextareaVisible, setIsTextareaVisible] = useState(false);
  const [updates, setUpdates] = useState<Update[]>([]);
  const user = auth.currentUser;

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

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewUpdate(event.target.value);
  };

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

      setNewUpdate("");
      setIsTextareaVisible(false);
    } catch (error) {
      console.error("Error adding update: ", error);
      alert("Failed to add update. Please try again.");
    }
  };

  const handleClose = () => {
    setNewUpdate("");
    setIsTextareaVisible(false);
  };

  return (
    <div className="flex relative">
      <Sidebar />
      <div className="flex flex-col items-center w-full text-white h-screen justify-center">
        <div className="list overflow-scroll p-2 h-[600px] w-[60%]">
          <h1 className="font-bold text-[30px] text-[#1F2114]">Updates</h1>
          {updates.map((update) => (
            <div
              key={update.id}
              className="w-full bg-[#171717] h-auto min-h-[100px] mt-8 mb-2 items-center shadow-lg rounded-lg shadow-olive-500/40 p-3 flex flex-col"
            >
              <div className="flex flex-row items-center space-x-3 w-full">
                <img
                  src={update.authorPicture}
                  className="h-10 w-10 rounded-full"
                  alt={update.authorName}
                />
                <h1>{update.authorName}</h1>
                <span className="ml-auto text-gray-400">
                  {update.createdAt.toDate().toLocaleDateString()}{" "}
                  {update.createdAt.toDate().toLocaleTimeString()}
                </span>
              </div>
              <div className="flex w-full">
                <h3 className="text-gray-400 mt-2">{update.content}</h3>
              </div>
            </div>
          ))}
        </div>
        {isTextareaVisible && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-[500px] p-4 rounded shadow">
              <Textarea
                value={newUpdate}
                onChange={handleInputChange}
                className="w-full text-black"
              />
              <div className="flex justify-between mt-2">
                <button
                  onClick={handleClose}
                  className="bg-[#171717] text-white font-bold py-2 px-4 rounded"
                >
                  Close
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-[#171717] text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsTextareaVisible(true)}
          className="fixed bottom-4 right-4 bg-[#171717] hover:bg-[blue-700] text-white font-bold py-2 px-4 rounded"
        >
          Add Update
        </button>
      </div>
    </div>
  );
};

export default Updates;
