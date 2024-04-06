import Sidebar from "../comps/Side-bar.tsx";
import chipko from "../assets/image.png";

import DialogDemo from "@/components/ui/profile";
import { Button } from "./ui/button.tsx";

const Events = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="right flex flex-col w-full m-2">
        <div className="upper w-full ">
          {" "}
          <div
            className="h-[250px] flex bg-contain border-black border-8 rounded-md w-full relative"
            style={{
              backgroundImage: `url(${chipko})`,
            }}
          >
            <h1 className="text-4xl font-semi-bold m-4 text-white">Events</h1>
            <div className="flex justify-end z-50 items-end text-white w-full m-4">
              <DialogDemo />
            </div>
          </div>
        </div>
        {/* <div className="flex flex-col justify-center items-center text-center gap-16">
          <p className="text-black font-semi-bold text-2xl ">
            Activities
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
                      <Card className="w-full bg-[#1F2114] text-white">
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
        </div> */}
        <div className="list overflow-scroll p-2 h-[400px]">
          {" "}
          <div className="w-full outline h-[80px]  mt-8 mb-2 items-center shadow-lg rounded-lg shadow-olive-500/40 p-3 flex ">
            <div className="flex flex-col w-full">
              {" "}
              <h1>Tree-planters</h1>
              <p className=" text-gray-500">Mumbai</p>
            </div>
            <div className="flex items-end justify-end w-full">
              <Button>Join</Button>
            </div>
          </div>
          <div className="w-full outline mt-2 mb-2 h-[80px] items-center shadow-lg rounded-lg shadow-olive-500/40 p-3 flex ">
            <div className="flex flex-col w-full">
              {" "}
              <h1>Tree-planters</h1>
              <p className=" text-gray-500">Mumbai</p>
            </div>
            <div className="flex items-end justify-end w-full">
              <Button>Join</Button>
            </div>
          </div>
          <div className="w-full outline mt-2 mb-2 h-[80px] items-center shadow-lg rounded-lg shadow-olive-500/40 p-3 flex ">
            <div className="flex flex-col w-full">
              {" "}
              <h1>Tree-planters</h1>
              <p className=" text-gray-500">Mumbai</p>
            </div>
            <div className="flex items-end justify-end w-full">
              <Button>Join</Button>
            </div>
          </div>
          <div className="w-full outline mt-2 mb-2 h-[80px] items-center shadow-lg rounded-lg shadow-olive-500/40 p-3 flex ">
            <div className="flex flex-col w-full">
              {" "}
              <h1>Tree-planters</h1>
              <p className=" text-gray-500">Mumbai</p>
            </div>
            <div className="flex items-end justify-end w-full">
              <Button>Join</Button>
            </div>
          </div>
          <div className="w-full outline mt-2 mb-2 h-[80px] items-center shadow-lg rounded-lg shadow-olive-500/40 p-3 flex ">
            <div className="flex flex-col w-full">
              {" "}
              <h1>Tree-planters</h1>
              <p className=" text-gray-500">Mumbai</p>
            </div>
            <div className="flex items-end justify-end w-full">
              <Button>Join</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
