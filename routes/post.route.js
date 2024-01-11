import Router from "express"
import { upload } from "../middlewares/multer.middleware.js";
import { checkUser } from "../middlewares/auth.middleware.js";
import { newPostController, postDeleteController } from "../controllers/post.controller.js";

const router=Router();

//secured Routes
router.route("/add-post").post(checkUser,upload.single('image'),newPostController);

router.route("/delete-post/:id").delete(checkUser,postDeleteController);


export default router;