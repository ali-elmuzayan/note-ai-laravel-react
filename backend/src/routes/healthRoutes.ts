import { Request, Response, Router } from "express";

const router = Router();

router.get("/health", (req: Request, res: Response) => {
    res.json({ message: "Health check", status: "ok", service: "note-ai-backend", timestamp: new Date().toISOString() });
});

export default router;