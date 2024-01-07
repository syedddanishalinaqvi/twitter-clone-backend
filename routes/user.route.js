import Router from "express"
import {userRegisterController} from "../controllers/user.controller.js";

const router=Router();

router.route("/register").post(userRegisterController);


export default router;