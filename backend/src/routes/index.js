import express from "express";
import userRoutes from "./user.routes.js";
import teamRoutes from './team.routes.js'
import taskRoutes from './task.routes.js'
import authRouter from './auth.routes.js'

const router = express.Router();

router.use("/users", userRoutes);
router.use("/teams",teamRoutes)
router.use("/task",taskRoutes);
router.use("/auth",authRouter)

export default router;