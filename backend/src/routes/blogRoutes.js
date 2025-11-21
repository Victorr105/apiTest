import { getAllBlogs } from "../controllers/blogController.js";
import { getOneBlogs } from "../controllers/blogController.js";
import { createBlog } from "../controllers/blogController.js";
import { deleteBlog } from "../controllers/blogController.js";
import { updateBlog } from "../controllers/blogController.js";
//we use the express router to set up routing in node 

import express from "express"

const router = express.Router()

router.get("/",getAllBlogs)
router.get("/:id",getOneBlogs)
router.post("/",createBlog)
router.delete('/:id', deleteBlog);
router.put("/:id",updateBlog)
export default router

