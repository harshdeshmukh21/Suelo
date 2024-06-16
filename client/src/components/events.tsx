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
          ></div>
        </div>
        <h1 className="m-4 font-bold text-[30px] text-[#1F2114]">Events</h1>
        <div className="flex mt-[-40px]">
          <div className="list overflow-scroll p-2 h-[400px] w-[60%]">
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
                <h1>Soil Evaluation</h1>
                <p className=" text-gray-500">Pune</p>
              </div>
              <div className="flex items-end justify-end w-full">
                <Button>Join</Button>
              </div>
            </div>
            <div className="w-full outline mt-2 mb-2 h-[80px] items-center shadow-lg rounded-lg shadow-olive-500/40 p-3 flex ">
              <div className="flex flex-col w-full">
                {" "}
                <h1>Go Green</h1>
                <p className=" text-gray-500">Panvel</p>
              </div>
              <div className="flex items-end justify-end w-full">
                <Button>Join</Button>
              </div>
            </div>
            <div className="w-full outline mt-2 mb-2 h-[80px] items-center shadow-lg rounded-lg shadow-olive-500/40 p-3 flex ">
              <div className="flex flex-col w-full">
                {" "}
                <h1>Trees for Life</h1>
                <p className=" text-gray-500">Delhi</p>
              </div>
              <div className="flex items-end justify-end w-full">
                <Button>Join</Button>
              </div>
            </div>
          </div>
          <div className="list overflow-scroll p-2 h-[400px] w-[40%]">
            {" "}
            <div className="w-full outline h-[80px]  mt-8 mb-2 items-center shadow-lg rounded-lg shadow-olive-500/40 p-3 flex ">
              <div className="flex flex-col w-full">
                {" "}
                <h1>Tree-planters</h1>
                <p className=" text-gray-500">Mumbai</p>
              </div>
              <div className="flex items-end justify-end w-full"></div>
            </div>
            <div className="w-full outline mt-2 mb-2 h-[80px] items-center shadow-lg rounded-lg shadow-olive-500/40 p-3 flex ">
              <div className="flex flex-col w-full">
                {" "}
                <h1>Tree-planters</h1>
                <p className=" text-gray-500">Mumbai</p>
              </div>
              <div className="flex items-end justify-end w-full"></div>
            </div>
            <div className="w-full outline mt-2 mb-2 h-[80px] items-center shadow-lg rounded-lg shadow-olive-500/40 p-3 flex ">
              <div className="flex flex-col w-full">
                {" "}
                <h1>Tree-planters</h1>
                <p className=" text-gray-500">Mumbai</p>
              </div>
              <div className="flex items-end justify-end w-full"></div>
            </div>
            <DialogDemo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
