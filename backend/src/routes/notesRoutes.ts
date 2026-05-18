import { Router } from "express";
import { deleteNote } from "../controller/noteController";

const router = Router();

router.delete("/:id", deleteNote);

export default router;
