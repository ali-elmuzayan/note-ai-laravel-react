import { Route, Routes } from "react-router";
import AuthLayout from "./layouts/AuthLayout";
import AuthGuard from "./components/AuthGuard";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Tasks from "./pages/Dashboard/Tasks";
import Notes from "./pages/Dashboard/Notes";
import Dashboard from "./pages/Dashboard";
import Pomodoro from "./pages/Dashboard/Pomodoro";
import Projects from "./pages/Dashboard/Projects";
import ProjectDetail from "./pages/Dashboard/Projects/ProjectDetail";

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
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/notes" element={<Notes />} />
          <Route path="/dashboard/notes/:id" element={<div>Note</div>} />
          <Route path="/dashboard/tasks" element={<Tasks />} />
          <Route path="/dashboard/pomodoro" element={<Pomodoro />} />
          <Route path="/dashboard/projects" element={<Projects />} />
          <Route path="/dashboard/projects/:id" element={<ProjectDetail />} />
        </Route>
      </Route>

      {/* Not Found Route */}
      {/* <Route path="*" element={<div>Not Found</div>} /> */}
    </Routes>
  );
};

export default App;
