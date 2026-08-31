import express from "express";

import userController from "../controllers/user.controller.js";
import validate from "../middlewares/validation.middleware.js";
import { createUserSchema ,updateUserSchema} from "../validations/user.validation.js";

const router = express.Router();

router.post(
  "/",
  validate(createUserSchema),
  userController.createUser
);

router.get("/",userController.getAllUser)
router.get("/:id",userController.getUserById);
router.put("/:id",validate(updateUserSchema), userController.updateUser)
router.patch("/:id/deactivate",userController.deactivateUser);
router.patch("/:id/activate",userController.activateUser);
export default router;