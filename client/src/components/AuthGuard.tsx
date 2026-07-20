import { useUser } from "@clerk/react";
import { Navigate, Outlet } from "react-router";
import { Skeleton } from "./ui/skeleton";

const AuthGuard = () => {
  // here we need to check that the user is authenticated or not, if not we will redirect him
  const { user, isLoaded } = useUser();
  if (!isLoaded) {
    return <Skeleton className="h-full w-full" />;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return <Outlet />;
};

export default AuthGuard;
