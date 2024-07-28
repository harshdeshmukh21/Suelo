import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/comps/Side-bar";
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
    description: string;
    createdBy: string;
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
        description: doc.data().description,
        createdBy: doc.data().createdBy,
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
    <div className="flex min-h-screen w-full flex-col bg-muted/40 bg-[#151518]">
      <Sidebar></Sidebar>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList className="bg-[#27272A] border-black rounded-md">
                <TabsTrigger
                  value="all"
                  className="bg-[#27272A] data-[state=active]:bg-[#09090B] data-[state=active]:text-white"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="joined"
                  className="bg-[#27272A] data-[state=active]:bg-[#09090B] data-[state=active]:text-white"
                >
                  Joined
                </TabsTrigger>
                <TabsTrigger
                  value="created"
                  className="bg-[#27272A] data-[state=active]:bg-[#09090B] data-[state=active]:text-white"
                >
                  Created
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Activity />
              </div>
            </div>

            <TabsContent value="all">
              <Card
                x-chunk="dashboard-06-chunk-0"
                className="bg-[#09090B] border-[#09090B] text-white rounded-md"
              >
                <CardHeader>
                  <CardTitle className="text-[30px]">Events</CardTitle>
                  <CardDescription className="text-[#A1A1AA]">
                    Manage your products and view their sales performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow style={{ borderBottom: "1px solid #27272A" }}>
                        <TableHead className="text-[#A1A1AA]">Name</TableHead>
                        <TableHead className="text-[#A1A1AA]">
                          Description
                        </TableHead>
                        <TableHead className="text-[#A1A1AA]">Status</TableHead>
                        <TableHead className="hidden md:table-cell text-[#A1A1AA]">
                          People Joined
                        </TableHead>
                        <TableHead className="hidden md:table-cell text-[#A1A1AA]">
                          Created at
                        </TableHead>
                        <TableHead className="hidden md:table-cell text-[#A1A1AA]">
                          Location
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activities.map((activity) => (
                        <TableRow style={{ borderBottom: "1px solid #27272A" }}>
                          <TableCell className="font-medium">
                            {activity.name}
                          </TableCell>
                          <TableCell>{activity.description}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {!joinedActivities.includes(activity.id) ? (
                              <Button
                                className="bg-white text-black transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-200 h-[30px] w-[60px]"
                                onClick={() => joinActivity(activity.id)}
                              >
                                Join
                              </Button>
                            ) : (
                              <Button
                                className="bg-red-500 text-white transition duration-300 ease-in-out transform hover:scale-105 hover:bg-red-600 h-[30px] w-[60px]"
                                onClick={() => leaveActivity(activity.id)}
                              >
                                Leave
                              </Button>
                            )}
                          </TableCell>
                          <TableCell className="hidden md:table-cell items-end">
                            <p className="ml-[30px]">25</p>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-07-12 10:42 AM
                          </TableCell>
                          <TableCell>{activity.location}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="joined">
              <Card
                x-chunk="dashboard-06-chunk-0"
                className="bg-[#09090B] border-[#09090B] text-white rounded-md"
              >
                <CardHeader>
                  <CardTitle className="text-[30px]">Events</CardTitle>
                  <CardDescription className="text-[#A1A1AA]">
                    Manage your products and view their sales performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow style={{ borderBottom: "1px solid #27272A" }}>
                        <TableHead className="text-[#A1A1AA]">Name</TableHead>
                        <TableHead className="text-[#A1A1AA]">
                          Description
                        </TableHead>
                        <TableHead className="text-[#A1A1AA]">Status</TableHead>
                        <TableHead className="hidden md:table-cell text-[#A1A1AA]">
                          People Joined
                        </TableHead>
                        <TableHead className="hidden md:table-cell text-[#A1A1AA]">
                          Created at
                        </TableHead>
                        <TableHead className="hidden md:table-cell text-[#A1A1AA]">
                          Location
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activities
                        .filter((activity) =>
                          joinedActivities.includes(activity.id)
                        )
                        .map((activity) => (
                          <TableRow
                            style={{ borderBottom: "1px solid #27272A" }}
                          >
                            <TableCell className="font-medium">
                              {activity.name}
                            </TableCell>
                            <TableCell>{activity.description}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {!joinedActivities.includes(activity.id) ? (
                                <Button
                                  className="bg-white text-black transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-200 h-[30px] w-[60px]"
                                  onClick={() => joinActivity(activity.id)}
                                >
                                  Join
                                </Button>
                              ) : (
                                <Button
                                  className="bg-red-500 text-white transition duration-300 ease-in-out transform hover:scale-105 hover:bg-red-600 h-[30px] w-[60px]"
                                  onClick={() => leaveActivity(activity.id)}
                                >
                                  Leave
                                </Button>
                              )}
                            </TableCell>
                            <TableCell className="hidden md:table-cell items-end">
                              <p className="ml-[30px]">25</p>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              2023-07-12 10:42 AM
                            </TableCell>
                            <TableCell>{activity.location}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="created">
              <Card
                x-chunk="dashboard-06-chunk-0"
                className="bg-[#09090B] border-[#09090B] text-white rounded-md"
              >
                <CardHeader>
                  <CardTitle className="text-[30px]">
                    My Created Events
                  </CardTitle>
                  <CardDescription className="text-[#A1A1AA]">
                    Manage the events you've created and view their performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow style={{ borderBottom: "1px solid #27272A" }}>
                        <TableHead className="text-[#A1A1AA]">Name</TableHead>
                        <TableHead className="text-[#A1A1AA]">
                          Description
                        </TableHead>
                        <TableHead className="text-[#A1A1AA]">Status</TableHead>
                        <TableHead className="hidden md:table-cell text-[#A1A1AA]">
                          People Joined
                        </TableHead>
                        <TableHead className="hidden md:table-cell text-[#A1A1AA]">
                          Created at
                        </TableHead>
                        <TableHead className="hidden md:table-cell text-[#A1A1AA]">
                          Location
                        </TableHead>
                        <TableHead className="hidden md:table-cell text-[#A1A1AA]">
                          <p className="ml-[7px]">Edit</p>
                          <span className="sr-only text-white">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activities
                        .filter(
                          (activity) => user && activity.createdBy === user.uid
                        )
                        .map((activity) => (
                          <TableRow
                            key={activity.id}
                            style={{ borderBottom: "1px solid #27272A" }}
                          >
                            <TableCell className="font-medium">
                              {activity.name}
                            </TableCell>
                            <TableCell>{activity.description}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              <Badge variant="secondary">Active</Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell items-end">
                              <p className="ml-[30px]">
                                {activity.participants?.length || 0}
                              </p>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              2023-07-12 10:42 AM
                            </TableCell>
                            <TableCell>{activity.location}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>Edit</DropdownMenuItem>
                                  <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing{" "}
                    <strong>
                      {
                        activities.filter(
                          (activity) => user && activity.createdBy === user.uid
                        ).length
                      }
                    </strong>{" "}
                    of your created events
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Events;
