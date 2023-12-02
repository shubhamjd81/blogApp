import express from "express";
import {
  createBlog,
  getBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
  userBlog,
} from "../controllers/blogControllers.js";

const router = express.Router();

// create blog
router.post("/create-blog", createBlog);

// read all blog
router.get("/all-blog", getBlog);
router.get("/get-blog/:id", getBlogById);

// update blog
router.put("/update-blog/:id", updateBlog);

// delete blog
router.delete("/delete-blog/:id", deleteBlog);

// user blog
router.get("/user-blog/:id", userBlog);

export default router;
