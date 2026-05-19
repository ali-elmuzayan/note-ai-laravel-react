import {  Route, Routes } from "react-router";
import AuthLayout from "./layouts/AuthLayout";
import AuthGuard from "./components/AuthGuard";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Notes from "./pages/app/Notes";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";

const App = () => {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<Home />} />

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      {/* The Application With Protected routes  */}
      <Route element={<AuthGuard />}>
        <Route path="/dashboard" element={<AppLayout />}>
          <Route index element={<App />} />
          <Route path="notes" element={<Notes />} />
          <Route path="notes/:id" element={<div>Note</div>} />
        </Route>
      </Route>

      {/* Not Found Route */}
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};

export default App;
