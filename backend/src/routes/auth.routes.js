import express from 'express';
import userController from '../controllers/user.controller.js';
const router=express.Router();


router.post("/",userController.login);
router.get("/getAccessToken",userController.getAccessToken)

export default router;