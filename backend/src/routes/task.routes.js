import express from 'express';
import AuthMiddleware from '../middlewares/auth.middleware.js'
const router=express.Router();
import taskController from '../controllers/task.controller.js';
import upload from '../middlewares/upload.middleware.js';


router.post("/",upload.array("attachments", 5),taskController.createTask);
router.get("/",AuthMiddleware,taskController.getAllTask);
router.put("/:id",upload.array("attachments", 5),taskController.UpdateTask);
router.patch("/:id",taskController.deleteTask);
router.patch("/changeStatus/:id",taskController.changeStatus)
// router.get("/getTeamLeadDrp",teamController.getTeamLeadDrp);


export default router;