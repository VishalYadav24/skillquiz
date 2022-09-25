import React from "react";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
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
        <Toolbar sx={{ bgcolor: "#FEDBD3",color:'#4A4453' }}>
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
          <Typography margin={2}>{user?.name}</Typography>
          {isLogined ? (
            <Button variant="outlined" color="success" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="success" variant="contained" onClick={handleLogout}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
