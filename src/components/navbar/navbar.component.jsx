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
  /**
   * Move user to register screen and clear user data from local storage
   */
  const handleLogout = () => {
    localStorage.clear();
    setIsLogined(false);
    navigate("/register",{replace:true});
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ height: navbarHeight,'&.MuiAppBar-root':{boxShadow:"none"} }}>
        <Toolbar sx={{ bgcolor: "#313628", color: "#E8E9EB" }}>
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
          
          <Avatar src={require("../../assets/icons/young-man.png")} alt={user?.name[0]} sx={{bgcolor:"primary",margin:"16px",color:"#F06543"}}  ></Avatar>
          <Typography margin={2}   sx={{display:{xs:"none",sm:"none",md:"block",lg:"block"}}}>{user?.name}</Typography>
          
          {isLogined ? (
            <CommonButton
              variant="outlined"
              onClick={handleLogout}
              sx={{
                color: "#E8E9EB",
                border: "2px solid #E8E9EB ",
                background:"#313628",
                "&:hover": {
                  color: "#313628",
                  border: "2px solid secondary ",
                  background:"#E8E9EB",
                },
              }}
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
