import Sidebar from "../comps/Side-bar.tsx";
import chipko from "../assets/image.png";
import { Card, CardContent } from "@/components/card.tsx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const JoinAct = () => {
  return (
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  );
};

const Events = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div
        className="h-[250px] flex bg-contain border-black border-8 rounded-md w-full m-2 relative"
        style={{
          backgroundImage: `url(${chipko})`,
        }}
      >
        <h1 className="text-4xl font-semi-bold m-4 text-white">Events</h1>
        <div className="flex justify-end items-end w-full m-4">
          <button
            className="mt-16 bg-[#1F2114] text-white p-3 rounded-xl"
            onClick={JoinAct}
          >
            Create Activity
          </button>
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center gap-16">
          <p className="text-black font-semi-bold text-4xl mt-[600px]">
            Join an Activity
          </p>
          <div className="flex flex-col items-center justify-center h-full">
            <Carousel
              opts={{
                align: "start",
              }}
              orientation="vertical"
              className="w-full max-w-xs"
            >
              <CarouselContent className="-mt-1 h-[200px]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index} className="pt-1 md:basis-1/2">
                    <div className="p-1">
                      <Card className="w-[300px] bg-[#1F2114] text-white">
                        <CardContent className="flex items-center justify-center p-6">
                          <span className="text-4xl font-semi-bold">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
