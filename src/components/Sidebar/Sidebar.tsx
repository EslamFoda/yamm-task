import { Link, useLocation } from "react-router-dom";
import { Box, Menu } from "lucide-react";

const navItems = [{ icon: Box, label: "Refund Orders", to: "/" }];

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={`bg-muted  ${
        isOpen ? "w-64" : "w-16"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between p-4">
        <h2
          className={`text-lg min-w-max font-semibold ${
            isOpen ? "block" : "hidden"
          }`}
        >
          Yamm
        </h2>
        <button onClick={toggleSidebar} className="rounded-md cursor-pointer">
          <Menu size={24} />
        </button>
      </div>
      <nav className="mt-5">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center py-2 px-4 ${
              location.pathname === item.to
                ? "bg-secondary-foreground text-secondary"
                : "hover:bg-background"
            }`}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            <span className={`ml-2 min-w-max ${isOpen ? "block" : "hidden"}`}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
