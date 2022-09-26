import React from "react";
import { AppBar, Avatar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import CommonButton from "../custom-styles/custombutton.component";
const Navbar = ({
  user,
  isLogined,
  navbarHeight,
  handleDrawerToggle,
  setIsLogined,
}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    setIsLogined(false);
    navigate("/register");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ height: navbarHeight }}>
        <Toolbar sx={{ bgcolor: "#FEDBD3", color: "#4A4453" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ marginRight: 2 }}
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SkillScore
          </Typography>
          <Avatar sx={{bgcolor:"orange"}} >{user?.name[0]}</Avatar>
          <Typography margin={2}>{user?.name}</Typography>
          {isLogined ? (
            <CommonButton
              variant="outlined"
              sx={{
                color: "#2F4858",
                border: "2px solid #2F4858 ",
                "&:hover": {
                  color: "#2F4858",
                  border: "2px solid #2F4858 ",
                },
              }}
              onClick={handleLogout}
            >
              Logout
            </CommonButton>
          ) : (
            <CommonButton
              variant="contained"
              onClick={handleLogout}
              sx={{
                color: "#2F4858",
                border: "2px solid #2F4858 ",
                background:"#fefefe",
                "&:hover": {
                  color: "#2F4858",
                  border: "2px solid #2F4858 ",
                  background:"#fefefe",
                },
              }}
            >
              Login
            </CommonButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
