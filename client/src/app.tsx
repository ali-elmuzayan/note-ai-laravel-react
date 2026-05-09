import { Route, Routes } from "react-router";
import AuthLayout from "./layouts/AuthLayout";
import AuthGuard from "./components/AuthGuard";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Notes from "./pages/app/Notes";

const App = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<div>Login</div>} />
        <Route path="/register" element={<div>Register</div>} />
      </Route>

      {/* The Application With Protected routes  */}
      <Route element={<AuthGuard />}>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/:id" element={<div>Note</div>} />
        </Route>
      </Route>

      {/* Not Found Route */}
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};

export default App;
