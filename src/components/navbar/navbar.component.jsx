import React from "react";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
const Navbar = ({ user,isLogined,navbarHeight,handleDrawerToggle }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{height: navbarHeight}}>
        <Toolbar>
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
            {isLogined ?<Link  to="/">Logout</Link> :<Link to="/register">Login</Link>}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
