import { Request, Response, Router } from "express";

const router = Router();

router.post("/login", (req: Request, res: Response) => {
    res.json({ message: "Login" });
});

export default router;