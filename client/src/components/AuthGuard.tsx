import { Outlet } from "react-router";

const AuthGuard = () => {
  // here we need to check that the user is authenticated or not, if not we will redirect him
  return <Outlet />;
};

export default AuthGuard;
