import express from 'express';
import AuthMiddleware from '../middlewares/auth.middleware.js'
const router=express.Router();
import taskController from '../controllers/task.controller.js';


router.post("/",taskController.createTask);
router.get("/",AuthMiddleware,taskController.getAllTask);
router.put("/:id",taskController.UpdateTask);
router.patch("/:id",taskController.deleteTask);
router.patch("/changeStatus/:id",taskController.changeStatus)
// router.get("/getTeamLeadDrp",teamController.getTeamLeadDrp);


export default router;