import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/Firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { getAuth, User } from "firebase/auth";

const createActivity = async ({
  name,
  description,
  location,
  currentUser,
}: {
  name: string;
  description: string;
  location: string;
  currentUser: User | null;
}) => {
  try {
    const docRef = await addDoc(collection(db, "activities"), {
      name,
      description,
      location,
      author: {
        displayName: currentUser?.displayName || "",
        photoURL: currentUser?.photoURL || "",
      },
    });
    alert("Activity added");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export default function Activity() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = getAuth();
    const currentUser = auth.currentUser;

    try {
      await createActivity({
        name,
        description,
        location,
        currentUser,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="text-white bg-[#088536] border-[#088536]"
          style={{
            backgroundColor: "#088536",
            color: "white",
          }}
        >
          <PlusCircle className="h-3.5 w-3.5 mr-1" />
          Create Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#09090B] border-[#27272A]">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="text-white text-center items-center text-[25px] mb-4">
            Create a New Activity
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right text-white">
                Name
              </Label>
              <Input
                id="name"
                className="col-span-3 text-white border-[#27272A]"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name of the activity"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right text-white">
                Description
              </Label>
              <Input
                id="description"
                className="col-span-3 text-white border-[#27272A]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right text-white">
                Location
              </Label>
              <Input
                id="location"
                className="col-span-3 text-white border-[#27272A]"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
