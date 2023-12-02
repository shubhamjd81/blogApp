import mongoose, { mongo } from "mongoose";
import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";

// create
export const createBlog = async (req, res) => {
  try {
    console.log(req.body);

    const { title, description, image, user } = req.body;

    // validation
    if (!title || !description || !image || !user) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const existingUser = await User.findById(user);

    if (!existingUser) {
      return res.status(200).json({
        success: false,
        message: "User doesn't exists!",
      });
    }

    const createBlog = new Blog({ title, description, image, user });
    await createBlog.save();

    existingUser.blogs.push(createBlog);
    await existingUser.save();

    // const session = await mongoose.startSession();
    // session.startTransaction();
    // await createBlog.save({ session });
    // existingUser.blogs.push(createBlog);
    // await existingUser.save({ session });
    // await session.commitTransaction();
    // await createBlog.save();

    res.status(200).json({
      success: true,
      message: "Blog Created",
      createBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Could't create blog",
      error,
    });
  }
};

// read
export const getBlog = async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate("user");

    if (!blogs) {
      return res.status(400).json({
        success: false,
        message: "Couldn't found blogs",
      });
    }

    return res.status(201).json({
      success: true,
      blogCount: blogs.length,
      message: "All blog lists",
      blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error while getting blogs",
    });
  }
};

// read
export const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(200).json({
        success: false,
        message: "couldn't found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "blog fetched",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error while fetchng blog",
    });
  }
};

// update
export const updateBlog = async (req, res) => {
  const { id } = req.params;

  try {
    console.log("Inside try-block");
    const findBlog = await Blog({ id });
    if (!findBlog) {
      return res.status(200).json({
        success: false,
        message: "Blog not found",
      });
    }

    const updateBlog = await Blog.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Blog updated",
      updateBlog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error while updating blog",
    });
  }
};

// delete blog
export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteBlog = await Blog.findByIdAndDelete(id).populate("user");
    console.log(deleteBlog);

    await deleteBlog?.user?.blogs.pull(deleteBlog);
    await deleteBlog?.save();

    res.status(200).json({
      success: true,
      message: "Blog Deleted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting blog",
    });
  }
};

// user blog
export const userBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Note: Populate() fetch/get related-data from another-table
    const userBlog = await User.findById(id).populate("blogs");

    if (!userBlog) {
      return res.status(404).json({
        success: false,
        message: "user blog didn't found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "user's blog list",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "error while getting blog",
    });
  }
};
