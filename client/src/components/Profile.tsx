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
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 bg-[#151518]">
      <Sidebar />
      <Card className="w-[93vw] h-[94vh] ml-[10vh] mt-[3vh] bg-black border-black text-white rounded-md">
        {/* <CardHeader>
          <CardTitle className="text-[30px]">Profile</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader> */}
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
          <TabsContent value="events">
            <Card
              x-chunk="dashboard-06-chunk-0"
              className="bg-[black] border-[#09090B] text-white rounded-md"
            >
              <CardHeader>
                <CardTitle className="text-[30px]">All Events</CardTitle>
                <CardDescription className="text-[#A1A1AA]">
                  Go through new and upcoming events.
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of <strong>32</strong> products
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="joined">
            <Card
              x-chunk="dashboard-06-chunk-0"
              className="bg-[black] border-[#09090B] text-white rounded-md"
            >
              <CardHeader>
                <CardTitle className="text-[30px]">Joined Events</CardTitle>
                <CardDescription className="text-[#A1A1AA]">
                  Manage the events you've joined.
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of <strong>32</strong> products
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="badges" className="flex justify-center">
            <Carousel className="w-full max-w-xs mt-12">
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <span className="text-4xl font-semibold">
                            {index + 1}
                          </span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </TabsContent>
        </Tabs>
        {/* </main> */}
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};
export default Profile;
