import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login, logout } from "../redux/store.js";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setInput((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const { data } = await axios.post("/api/v1/user/create", input);
      // console.log(input);
      const res = await fetch("/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      console.log(data);
      if (data?.success) {
        dispatch(login());
        toast.success("User login successfully");
        localStorage.setItem("userId", data?.validUser._id);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display="flex"
          flexDirection={"column"}
          margin={"auto"}
          alignItems={"center"}
          justifyContent={"center"}
          marginTop={5}
          boxShadow={(10, 10, 20)}
          padding={3}
          borderRadius={5}
          gap={2}
        >
          <Typography
            variant="h4"
            textAlign={"center"}
            padding={3}
            sx={{ textTransform: "uppercase" }}
          >
            Login
          </Typography>

          <TextField
            type="email"
            placeholder="email"
            id="email"
            required
            onChange={handleInput}
          />
          <TextField
            type="password"
            placeholder="password"
            id="password"
            required
            onChange={handleInput}
          />
          <Button
            sx={{ borderRadius: 5, marginTop: 3 }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
            sx={{ borderRadius: 5, marginTop: 3 }}
            type="submit"
            color="primary"
            onClick={() => navigate("/log-in")}
          >
            Dont have an account? Please Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
