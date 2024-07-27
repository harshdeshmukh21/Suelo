import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  User,
  Calendar,
  Pen,
  Map,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const iconStyle = { color: "white" };

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Calendar, label: "Events", path: "/events" },
    { icon: Pen, label: "Updates", path: "/updates" },
    { icon: Map, label: "Map", path: "/yieldatlas" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col bg-background sm:flex bg-black">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        {navItems.map((item) => (
          <Tooltip key={item.path}>
            <TooltipTrigger asChild>
              <Link
                to={item.path}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:text-foreground md:h-8 md:w-8
                  ${
                    location.pathname === item.path
                      ? "bg-[#088536]"
                      : "hover:bg-gray-800"
                  }`}
              >
                <item.icon className="h-5 w-5" style={iconStyle} />
                <span className="sr-only">{item.label}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{item.label}</TooltipContent>
          </Tooltip>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
