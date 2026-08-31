import express from 'express';

const router=express.Router();
import teamController from '../controllers/team.controller.js';


router.post("/",teamController.createTeam);
router.get("/",teamController.getAllTeams)
router.get("/getEmployeeDrp",teamController.getEmployeeDrp);
router.get("/getManagerDrp",teamController.getManagerDrp)
router.get("/getTeamLeadDrp",teamController.getTeamLeadDrp);


export default router;