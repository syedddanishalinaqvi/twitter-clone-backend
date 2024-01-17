import Router from "express"
import {userLoginController, userRegisterController,userLogoutController, getUserController} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { checkUser } from "../middlewares/auth.middleware.js";

const router=Router();

router.route("/register").post(upload.single('avatar'),userRegisterController);

router.route("/login").post(userLoginController);

//secured Routes
router.route("/logout").post(checkUser, userLogoutController);

router.route("/get-user").get(checkUser, getUserController);

export default router;