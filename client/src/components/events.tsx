import Sidebar from "@/comps/Side-bar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const Events = () => {
  return (
    <div className="flex row">
      <Sidebar></Sidebar>
      <div className="h-[150px] w-[1500px] mt-20 bg-[url('https://cdn.sanity.io/images/oyzyxja8/v2/062f3d6cc3c04944e38c95589f9cb7b3061582c2-2500x1080.jpg?w=2048&q=90&auto=format')]"></div>
    </div>
  );
};

export default Events;
