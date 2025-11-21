import express from "express"
// import for crud
import { getAllUsers } from "../controllers/userController.js";
import { getOneUSer } from "../controllers/userController.js";
import { UpdateOneUser } from "../controllers/userController.js";
import { deleteUser } from "../controllers/userController.js";
// import multer helper {upload function} so tha tit can respond every time the function is called 
import upload from "../../uploads/multerConfig.js";

const router = express.Router();
// crud for users

router.get("/",getAllUsers);
router.get("/:id",getOneUSer);
router.put("/:id",upload.single("pfp"),UpdateOneUser);
router.delete("/:id",deleteUser)

export default router;



