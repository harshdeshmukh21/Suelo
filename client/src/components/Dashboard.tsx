import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ListFilter, Users2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth, db } from "@/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  interface User {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
  }
  interface Update {
    id: string;
    content: string;
    authorName: string;
    authorPicture: string;
    createdAt: Timestamp;
    highlighted: boolean;
  }

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [user, setUser] = useState<User | null>(null);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 7;

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#171717]">
      <Sidebar></Sidebar>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="text-m font-medium text-white ml-2">
            {user ? `Hello, ${user.displayName}` : "Hello, Guest"}
          </div>
          <div className="relative ml-auto flex-1 md:grow-0"></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                {user && user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Users2 className="h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-black text-white border-black"
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-800" />
              <Link to="/profile">
                <DropdownMenuItem
                  className="text-white bg-[black] border-[black]"
                  style={{
                    backgroundColor: "#000000",
                    color: "white",
                  }}
                >
                  Profile
                </DropdownMenuItem>
              </Link>
              {/* <DropdownMenuSeparator className="bg-black" /> */}
              <DropdownMenuItem
                className="text-white bg-[black] border-[black]"
                style={{
                  backgroundColor: "#000000",
                  color: "white",
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card
                className="sm:col-span-2 bg-black border-[#27272A] rounded-md"
                x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-[30px]">
                    Daily Quote
                  </CardTitle>
                  <CardDescription className="max-w-lg leading-relaxed text-[#A1A1AA]">
                    Introducing Our Dynamic Orders Dashboard for Seamless
                    Management and Insightful Analysis.
                  </CardDescription>
                </CardHeader>
                <CardFooter></CardFooter>
              </Card>
              <Card
                x-chunk="dashboard-05-chunk-1"
                className="bg-black border-[#27272A] rounded-md"
              >
                <CardHeader className="pb-2">
                  <CardDescription className="text-[#A1A1AA]">
                    Trees Planted
                  </CardDescription>
                  <CardTitle className="text-4xl text-white">329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground text-[#A1A1AA]">
                    +25% from last week
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress
                    value={20}
                    aria-label="12% increase"
                    className="bg-white [&>div]:bg-[#088536]"
                  />
                </CardFooter>
              </Card>
              <Card
                x-chunk="dashboard-05-chunk-2"
                className="bg-black border-[#27272A] rounded-md"
              >
                <CardHeader className="pb-2">
                  <CardDescription className="text-[#A1A1AA]">
                    Activities Joined
                  </CardDescription>
                  <CardTitle className="text-4xl text-white ">59</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground text-[#A1A1AA]">
                    +10% from last month
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress
                    value={50}
                    aria-label="12% increase"
                    className="bg-white [&>div]:bg-[#088536]"
                  />
                </CardFooter>
              </Card>
            </div>
            <Tabs defaultValue="week">
              <div className="flex items-center">
                <TabsList className="bg-[#27272A] border-black rounded-md">
                  <TabsTrigger
                    value="week"
                    className="bg-[#27272A] data-[state=active]:bg-[#09090B] data-[state=active]:text-white"
                  >
                    Week
                  </TabsTrigger>
                  <TabsTrigger
                    value="month"
                    className="data-[state=active]:bg-[#09090B] data-[state=active]:text-white"
                  >
                    Month
                  </TabsTrigger>
                  <TabsTrigger
                    value="year"
                    className="data-[state=active]:bg-[#09090B] data-[state=active]:text-white"
                  >
                    Year
                  </TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="h-8 gap-1 bg-[#088536] text-white"
                        style={{
                          backgroundColor: "#088536",
                          color: "white",
                        }}
                      >
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Fulfilled
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Declined
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Refunded
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <TabsContent value="week">
                <Card
                  x-chunk="dashboard-05-chunk-3"
                  className="bg-black border-[#27272A] rounded-md h-[55vh] overflow-scroll text-white"
                >
                  <CardHeader className="px-7">
                    <CardTitle className="text-white text-[30px]">
                      Leaderboard
                    </CardTitle>
                    <CardDescription>
                      List of our most active planters.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table className="text-white">
                      <TableHeader>
                        <TableRow style={{ borderBottom: "1px solid #27272A" }}>
                          <TableHead>Customer</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Type
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Date
                          </TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow
                          className="bg-accent"
                          style={{ borderBottom: "1px solid #27272A" }}
                        >
                          <TableCell>
                            <div className="font-medium">Liam Johnson</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              liam@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Fulfilled
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-23
                          </TableCell>
                          <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                        <TableRow style={{ borderBottom: "1px solid #27272A" }}>
                          <TableCell>
                            <div className="font-medium">Olivia Smith</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              olivia@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Refund
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="outline">
                              Declined
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-24
                          </TableCell>
                          <TableCell className="text-right">$150.00</TableCell>
                        </TableRow>
                        <TableRow style={{ borderBottom: "1px solid #27272A" }}>
                          <TableCell>
                            <div className="font-medium">Noah Williams</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              noah@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Subscription
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Fulfilled
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-25
                          </TableCell>
                          <TableCell className="text-right">$350.00</TableCell>
                        </TableRow>
                        <TableRow style={{ borderBottom: "1px solid #27272A" }}>
                          <TableCell>
                            <div className="font-medium">Emma Brown</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              emma@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Fulfilled
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-26
                          </TableCell>
                          <TableCell className="text-right">$450.00</TableCell>
                        </TableRow>
                        <TableRow style={{ borderBottom: "1px solid #27272A" }}>
                          <TableCell>
                            <div className="font-medium">Liam Johnson</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              liam@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Fulfilled
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-23
                          </TableCell>
                          <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                        <TableRow style={{ borderBottom: "1px solid #27272A" }}>
                          <TableCell>
                            <div className="font-medium">Liam Johnson</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              liam@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Fulfilled
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-23
                          </TableCell>
                          <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                        <TableRow style={{ borderBottom: "1px solid #27272A" }}>
                          <TableCell>
                            <div className="font-medium">Olivia Smith</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              olivia@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Refund
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="outline">
                              Declined
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-24
                          </TableCell>
                          <TableCell className="text-right">$150.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">Emma Brown</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              emma@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Fulfilled
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-26
                          </TableCell>
                          <TableCell className="text-right">$450.00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="month">
                <Card
                  x-chunk="dashboard-05-chunk-3"
                  className="bg-black border-[#27272A] rounded-md h-[55vh] overflow-scroll text-white"
                >
                  <CardHeader className="px-7">
                    <CardTitle className="text-white text-[30px]">
                      Leaderboard
                    </CardTitle>
                    <CardDescription>
                      List of our most active planters.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table className="text-white">
                      <TableHeader>
                        <TableRow style={{ borderBottom: "1px solid #27272A" }}>
                          <TableHead>Customer</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Type
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Date
                          </TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow
                          className="bg-accent"
                          style={{ borderBottom: "1px solid #27272A" }}
                        >
                          <TableCell>
                            <div className="font-medium">Liam Johnson</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              liam@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Fulfilled
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-23
                          </TableCell>
                          <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                        <TableRow style={{ borderBottom: "1px solid #27272A" }}>
                          <TableCell>
                            <div className="font-medium">Olivia Smith</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              olivia@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Refund
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="outline">
                              Declined
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-24
                          </TableCell>
                          <TableCell className="text-right">$150.00</TableCell>
                        </TableRow>
                        <TableRow style={{ borderBottom: "1px solid #27272A" }}>
                          <TableCell>
                            <div className="font-medium">Noah Williams</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              noah@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Subscription
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Fulfilled
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-25
                          </TableCell>
                          <TableCell className="text-right">$350.00</TableCell>
                        </TableRow>
                        <TableRow style={{ borderBottom: "1px solid #27272A" }}>
                          <TableCell>
                            <div className="font-medium">Emma Brown</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              emma@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Fulfilled
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-26
                          </TableCell>
                          <TableCell className="text-right">$450.00</TableCell>
                        </TableRow>
                        <TableRow style={{ borderBottom: "1px solid #27272A" }}>
                          <TableCell>
                            <div className="font-medium">Liam Johnson</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              liam@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Fulfilled
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-23
                          </TableCell>
                          <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                        <TableRow style={{ borderBottom: "1px solid #27272A" }}>
                          <TableCell>
                            <div className="font-medium">Liam Johnson</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              liam@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Fulfilled
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-23
                          </TableCell>
                          <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                        <TableRow style={{ borderBottom: "1px solid #27272A" }}>
                          <TableCell>
                            <div className="font-medium">Olivia Smith</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              olivia@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Refund
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="outline">
                              Declined
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-24
                          </TableCell>
                          <TableCell className="text-right">$150.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">Emma Brown</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              emma@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Fulfilled
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-26
                          </TableCell>
                          <TableCell className="text-right">$450.00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="year">
                <Card
                  x-chunk="dashboard-05-chunk-3"
                  className="bg-black border-[#27272A] rounded-md h-[55vh] overflow-scroll text-white"
                >
                  <CardHeader className="px-7">
                    <CardTitle className="text-white text-[30px]">
                      Leaderboard
                    </CardTitle>
                    <CardDescription>
                      List of our most active planters.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table className="text-white">
                      <TableHeader>
                        <TableRow style={{ borderBottom: "1px solid #27272A" }}>
                          <TableHead>Customer</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Type
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Date
                          </TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow
                          className="bg-accent"
                          style={{ borderBottom: "1px solid #27272A" }}
                        >
                          <TableCell>
                            <div className="font-medium">Liam Johnson</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              liam@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Fulfilled
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-23
                          </TableCell>
                          <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                        <TableRow style={{ borderBottom: "1px solid #27272A" }}>
                          <TableCell>
                            <div className="font-medium">Olivia Smith</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              olivia@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Refund
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="outline">
                              Declined
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-24
                          </TableCell>
                          <TableCell className="text-right">$150.00</TableCell>
                        </TableRow>
                        <TableRow style={{ borderBottom: "1px solid #27272A" }}>
                          <TableCell>
                            <div className="font-medium">Noah Williams</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              noah@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Subscription
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Fulfilled
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-25
                          </TableCell>
                          <TableCell className="text-right">$350.00</TableCell>
                        </TableRow>
                        <TableRow style={{ borderBottom: "1px solid #27272A" }}>
                          <TableCell>
                            <div className="font-medium">Emma Brown</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              emma@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Fulfilled
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-26
                          </TableCell>
                          <TableCell className="text-right">$450.00</TableCell>
                        </TableRow>
                        <TableRow style={{ borderBottom: "1px solid #27272A" }}>
                          <TableCell>
                            <div className="font-medium">Liam Johnson</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              liam@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Fulfilled
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-23
                          </TableCell>
                          <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                        <TableRow style={{ borderBottom: "1px solid #27272A" }}>
                          <TableCell>
                            <div className="font-medium">Liam Johnson</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              liam@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Fulfilled
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-23
                          </TableCell>
                          <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                        <TableRow style={{ borderBottom: "1px solid #27272A" }}>
                          <TableCell>
                            <div className="font-medium">Olivia Smith</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              olivia@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Refund
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="outline">
                              Declined
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-24
                          </TableCell>
                          <TableCell className="text-right">$150.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">Emma Brown</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              emma@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Fulfilled
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-26
                          </TableCell>
                          <TableCell className="text-right">$450.00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <Card className="overflow-hidden bg-black border-[#27272A] rounded-md text-white h-[88vh]">
              <CardHeader className="flex flex-row items-start bg-muted/50 bg-black border-[#171717]">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg text-white text-[30px]">
                    Recent Updates
                  </CardTitle>
                  <CardDescription>{currentDate}</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <Pagination className="ml-auto mr-0 w-auto">
                    <PaginationContent>
                      <PaginationItem>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-6 w-6 text-black"
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(0, prev - 1))
                          }
                          disabled={currentPage === 0}
                        >
                          <ChevronLeft className="h-3.5 w-3.5" />
                          <span className="sr-only">Previous Updates</span>
                        </Button>
                      </PaginationItem>
                      <PaginationItem>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-6 w-6 text-black"
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(
                                Math.ceil(updates.length / itemsPerPage) - 1,
                                prev + 1
                              )
                            )
                          }
                          disabled={
                            currentPage ===
                            Math.ceil(updates.length / itemsPerPage) - 1
                          }
                        >
                          <ChevronRight className="h-3.5 w-3.5" />
                          <span className="sr-only">Next Updates</span>
                        </Button>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm max-h-[400px]">
                {updates
                  .slice(
                    currentPage * itemsPerPage,
                    (currentPage + 1) * itemsPerPage
                  )
                  .map((update) => (
                    <div
                      key={update.id}
                      className="flex flex-col gap-2 mt-[-1.2px]"
                    >
                      <div className="flex items-center gap-2">
                        <div className="font-semibold text-[17px]">
                          {update.authorName}
                        </div>
                        <time
                          className="text-[12px] opacity-65 mt-[4px]"
                          dateTime={update.createdAt.toDate().toISOString()}
                        >
                          {update.createdAt.toDate().toLocaleDateString()}
                        </time>
                        <time
                          className="text-[12px] opacity-65 mt-[4px]"
                          dateTime={update.createdAt.toDate().toISOString()}
                        >
                          {update.createdAt.toDate().toLocaleTimeString()}
                        </time>
                      </div>
                      <div className="font-light">{update.content}</div>
                      {<Separator className="my-2 bg-[#27272A]" />}
                    </div>
                  ))}
              </CardContent>
              {/* <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                  Updated <time dateTime="2023-11-23">November 23, 2023</time>
                </div>
                <Pagination className="ml-auto mr-0 w-auto">
                  <PaginationContent>
                    <PaginationItem>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6 text-black"
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(0, prev - 1))
                        }
                        disabled={currentPage === 0}
                      >
                        <ChevronLeft className="h-3.5 w-3.5" />
                        <span className="sr-only">Previous Updates</span>
                      </Button>
                    </PaginationItem>
                    <PaginationItem>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6 text-black"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(
                              Math.ceil(updates.length / itemsPerPage) - 1,
                              prev + 1
                            )
                          )
                        }
                        disabled={
                          currentPage ===
                          Math.ceil(updates.length / itemsPerPage) - 1
                        }
                      >
                        <ChevronRight className="h-3.5 w-3.5" />
                        <span className="sr-only">Next Updates</span>
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardFooter> */}
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
