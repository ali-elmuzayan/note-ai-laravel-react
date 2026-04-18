import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full h-16 bg-white shadow-md flex items-center justify-between px-4">
      <h1 className="text-3xl font-bold">Note AI</h1>
      <Button variant="default" size="lg" onClick={() => alert("Logout")}>
        Logout
      </Button>
    </header>
  );
};

export default Header;
