import Router from "express"
import { checkUser } from "../middlewares/auth.middleware.js";
import { allPostController, newPostController, postDeleteController, userPostController } from "../controllers/post.controller.js";

const router=Router();

//secured Routes
router.route("/add-post").post(checkUser,newPostController);

router.route("/delete-post/:id").delete(checkUser,postDeleteController);

router.route("/all-posts").get(checkUser,allPostController);

router.route("/posts").get(checkUser,userPostController);

export default router;