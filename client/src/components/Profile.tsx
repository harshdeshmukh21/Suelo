import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import { Users2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth, db } from "@/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import hyrdroponics from "../assets/hydroponics.png";
import dandelion from "../assets/dandelion.png";
import spinach from "../assets/spinach.png";
import sugarcane from "../assets/sugarcane.png";
import basil from "../assets/basil.png"; // Ensure the extension is correct
import bonsai from "../assets/bonsai.png";
import chia from "../assets/chia.png";

import { Separator } from "@/components/ui/separator";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);

  interface User {
    metadata: any;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          metadata: currentUser.metadata,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const badgeImages = [
    hyrdroponics,
    dandelion,
    spinach,
    sugarcane,
    basil,
    bonsai,
    chia,
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 bg-[#151518]">
      <Sidebar />
      <Card className="w-[92.7vw] h-[92.5vh] ml-[11.5vh] mt-[4vh] bg-black border-black text-white rounded-md">
        <CardContent className="flex flex-col justify-center items-center">
          <div className="overflow-hidden rounded-full h-[50px] w-[50px] mt-[20px]">
            {user && user.photoURL ? (
              <img
                src={user.photoURL}
                alt="User avatar"
                className="object-cover h-full w-full"
              />
            ) : (
              <Users2 className="h-8 w-8" />
            )}
          </div>
          <div className="text-[20px] font-medium text-white mt-[10px]">
            {user ? `${user.displayName}` : "Hello, Guest"}
          </div>
          <div>
            {user && (
              <div className="text-center mt-2 flex flex-row">
                <p className="text-sm text-gray-400">{user.email}</p>
                <p>
                  <Separator
                    orientation="vertical"
                    className="ml-2 mr-2 bg-gray-400"
                  />
                </p>
                <p className="text-sm text-gray-400">
                  Joined on:{" "}
                  {new Date(user.metadata.creationTime).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </CardContent>
        <Separator className="bg-[#27272A]" />
        <Tabs defaultValue="all">
          <div className="flex items-center flex-col justify-center">
            <TabsList className="bg-[black] border-black rounded-md">
              <TabsTrigger
                value="events"
                className="bg-[black] data-[state=active]:bg-[black] data-[state=active]:text-white"
              >
                Events
              </TabsTrigger>
              <TabsTrigger
                value="updates"
                className="bg-[black] data-[state=active]:bg-[black] data-[state=active]:text-white"
              >
                Updates
              </TabsTrigger>
              <TabsTrigger
                value="contributions"
                className="bg-[black] data-[state=active]:bg-[black] data-[state=active]:text-white"
              >
                Contributions
              </TabsTrigger>
              <TabsTrigger
                value="badges"
                className="bg-[black] data-[state=active]:bg-[black] data-[state=active]:text-white"
              >
                Badges
              </TabsTrigger>
            </TabsList>
            <Separator className="bg-[#27272A]" />
            <div className="ml-auto flex items-center gap-2"></div>
          </div>
          <TabsContent value="badges" className="flex justify-center">
            <Carousel className="w-full max-w-xs mt-12 border-black">
              <CarouselContent>
                {badgeImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <CardContent
                          className="flex aspect-square items-center justify-center p-6 bg-black text-white"
                          style={{
                            border: "2px solid #000000",
                            borderRadius: "10px",
                          }}
                        >
                          <img
                            src={image}
                            alt={`Badge ${index + 1}`}
                            className="h-[250px] w-[300px]"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious
                className="bg-black"
                style={{
                  backgroundColor: "#000000",
                  color: "white",
                }}
              />
              <CarouselNext
                className="bg-black"
                style={{
                  backgroundColor: "#000000",
                  color: "white",
                }}
              />
            </Carousel>
          </TabsContent>
        </Tabs>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
