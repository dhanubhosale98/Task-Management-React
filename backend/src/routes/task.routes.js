import express from 'express';
import AuthMiddleware from '../middlewares/auth.middleware.js'
const router=express.Router();
import taskController from '../controllers/task.controller.js';
import upload from '../middlewares/upload.middleware.js';


router.post("/",AuthMiddleware,upload.array("attachments", 5),taskController.createTask);
router.get("/",AuthMiddleware,taskController.getAllTask);
router.put("/:id",AuthMiddleware,upload.array("attachments", 5),taskController.UpdateTask);
router.patch("/:id",AuthMiddleware,taskController.deleteTask);
router.patch("/changeStatus/:id",AuthMiddleware,taskController.changeStatus)
// router.get("/getTeamLeadDrp",teamController.getTeamLeadDrp);


export default router;