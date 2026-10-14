import express from "express";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import commentsController from "../controllers/comments.controller.js";

const router = express.Router();

router.get("/:id", AuthMiddleware, commentsController.getAllComments);

router.post("/", AuthMiddleware, commentsController.createComment);

router.post("/delete/:id", AuthMiddleware, commentsController.deleteComments);
router.post("/edit/:id", AuthMiddleware, commentsController.editComment);

export default router;
