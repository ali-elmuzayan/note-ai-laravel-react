import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import AppLayout from "./layouts/AppLayout";
import AuthGuard from "./components/AuthGuard";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
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
          </Route>
        </Route>

        {/* Not Found Route */}
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
