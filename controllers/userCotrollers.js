import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

// create user
export const registerController = async (req, res) => {
  console.log(req.body);
  try {
    const { username, email, password } = req.body;

    // validation
    if (!username || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // existing user
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "User already exists",
      });
    }

    // save user
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });
    await createUser.save();

    res.status(200).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error While Creating User",
      error,
    });
  }
};

// get all users
export const getAllUser = async (req, res) => {
  const allUser = await userModel.find();

  try {
    res.status(201).json({
      success: true,
      message: "All users",
      allUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Users not found",
    });
  }
};

// login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please fill all fields",
      });
    }

    const validUser = await userModel.findOne({ email });

    // user exists
    if (!validUser) {
      return res.status(500).json({
        success: false,
        message: "user doesn't exist",
      });
    }

    // compare hashed-password
    const validPassword = await bcrypt.compare(password, validUser.password);

    // password validation
    if (!validPassword) {
      return res.status(500).json({
        success: false,
        message: "invalid credentials",
      });
    }

    res.status(201).json({
      success: true,
      validUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while login",
    });
  }
};
