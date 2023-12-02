import React from "react";
import {
  Box,
  AppBar,
  Button,
  Toolbar,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/store";

const Header = () => {
  const [value, setValue] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");

  // local state
  const handleLogOut = () => {
    try {
      dispatch(logout());
      localStorage.clear();
      toast.success("Logged Out successfully");
      navigate("/log-in");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h4">My Blog App</Typography>

          <Box display={"flex"} marginLeft={"auto"} marginRight={"auto"}>
            {isLogin ? (
              <Tabs textColor="inherit">
                <Tab label={"Blogs"} LinkComponent={Link} to="/" />

                <Tab label={"My Blogs"} LinkComponent={Link} to="/my-blogs" />

                <Tab
                  label={"Create Blog"}
                  LinkComponent={Link}
                  to="/create-blog"
                />
              </Tabs>
            ) : (
              ""
            )}
          </Box>

          <Box display={"flex"} marginLeft="auto">
            {!isLogin ? (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/log-in"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            ) : (
              ""
            )}
            {isLogin ? (
              <Button sx={{ margin: 1, color: "white" }} onClick={handleLogOut}>
                LogOut
              </Button>
            ) : (
              ""
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
