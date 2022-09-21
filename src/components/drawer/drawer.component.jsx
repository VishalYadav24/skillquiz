import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const {
    window,
    questions,
    navbarHeight,
    mobileOpen,
    setMobileOpen,
    handleDrawerToggle,
    handleClick,
    attempts,
  } = props;

  const drawer = (
    <div>
      <List>
        {questions.map((data) => {
          return (
            <ListItem key={data?.id}>
              <Button
                onClick={() => handleClick("", data?.id)}
                variant="outlined"
                style={
                  attempts.includes(data?.id.toString()) ? {color: "#fff", backgroundColor: "#926dde", borderColor: "#926dde",transition:"ease-in .75s" }
                  :
                  {}
                }
              >
                <Typography variant="span">
                  Question
                  <br />
                  {data?.id}
                </Typography>
              </Button>
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              marginTop: navbarHeight,
              height: "calc(100% - 100px)",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              marginTop: navbarHeight,
              height: "calc(100% - 100px)",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
