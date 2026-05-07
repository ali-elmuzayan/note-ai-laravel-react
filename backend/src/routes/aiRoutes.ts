import { Request, Response, Router } from "express";

const router = Router();

router.post("/generate", (req: Request, res: Response) => {
    res.json({ message: "Generate AI" });
});

export default router;
