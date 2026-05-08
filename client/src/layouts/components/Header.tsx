import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className="w-full sticky top-0 z-50">
      <div className="max-w-6xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        {/* glass card */}
        <div className="glass-card h-16 shadow-md flex-between px-4">
          {/* Logo  */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-sm font-semibold tracking-wide"
              role="button"
            >
              PlanMe
            </Link>
            <p className="hidden text-xs text-muted-foreground sm:inline">
              Note AI
            </p>
          </div>

          <Button variant="default" size="lg" onClick={() => alert("Logout")}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
