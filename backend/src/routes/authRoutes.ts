import { Request, Response, Router } from "express";

const router = Router();

router.post("/login", (req: Request, res: Response) => {
  res.json({ message: "Login" });
});

router.post("/register", (req: Request, res: Response) => {
  res.json({ message: "Register" });
});

router.post("/logout", (req: Request, res: Response) => {
  res.json({ message: "Logout" });
});

router.post("/refresh", (req: Request, res: Response) => {
  res.json({ message: "Refresh" });
});

router.get("/me", (req: Request, res: Response) => {
  res.json({ message: "Me" });
});

// --- For forgetten Password:  ----------------------
router.post("/forgot-password", (req: Request, res: Response) => {
  res.json({ message: "Forgot Password" });
});

router.post("/reset-password", (req: Request, res: Response) => {
  res.json({ message: "Reset Password" });
});

export default router;
