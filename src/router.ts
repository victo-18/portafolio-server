import { Router } from "express";
import { inputValidator } from "./middleware/validation";
import { createNotification } from "./routes/createNotification";

const router=Router()
router.post('/',inputValidator,createNotification)
export default router