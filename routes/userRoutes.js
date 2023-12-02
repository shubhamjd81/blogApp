import express from "express";
import {
  getAllUser,
  loginController,
  registerController,
} from "../controllers/userCotrollers.js";

const router = express.Router();

// get all users || GET
router.get("/all-users", getAllUser);

// create user || POST
router.post("/create", registerController);

// login || POST
router.post("/login", loginController);
export default router;
