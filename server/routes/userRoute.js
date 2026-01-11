import express from "express";
import {
  login,
  signup,
  updateProfilePic,
} from "../controller/userController.js";
import { checkAuth, protectRoute } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.put("/update-profile", protectRoute, updateProfilePic);
userRouter.get("/check", protectRoute, checkAuth);

export default userRouter;
