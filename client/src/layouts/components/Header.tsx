import { Button } from "@/components/ui/button";
import { LogOut, Sparkles } from "lucide-react";
import { Link, NavLink } from "react-router";

const navLinks = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/dashboard/notes", label: "Notes" },
  { to: "/dashboard/tasks", label: "Tasks" },
  { to: "/dashboard/projects", label: "Projects" },
  { to: "/dashboard/pomodoro", label: "Pomodoro" },
];

const Header = () => {
  return (
    <header className="w-full sticky top-0 z-50 py-4 px-4 mb-4">
      <div className=" max-w-6xl mx-auto ">
        {/* glass card */}
        <div className="glass-card h-16 flex-between pl-4 pr-2 sm:pl-6 sm:pr-4">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group no-underline"
            aria-label="PlanMe home"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
              <Sparkles className="w-5 h-5" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-base font-semibold tracking-tight">
                PlanMe
              </span>
              <span className="hidden sm:inline text-[11px] text-muted-foreground -mt-0.5">
                Note AI
              </span>
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm font-medium no-underline transition-colors ${
                    isActive
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => alert("Logout")}
              className="md:h-9 md:px-2.5 md:gap-1.5 md:rounded-lg md:text-sm md:[&_svg:not([class*='size-'])]:size-4"
            >
              <LogOut />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
