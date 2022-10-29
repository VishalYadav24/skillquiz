import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CommonButton from "../custom-styles/custombutton.component";

const drawerWidth = 200;

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
        {questions?.map((data) => {
          return (
            <ListItem key={data?.id}>
              <CommonButton
                onClick={() => handleClick("", data?.id)}
                variant="outlined"
                style={
                  attempts.includes(data?.id.toString()) ? {color: "#fff", backgroundColor: "green", borderColor: "green",transition:"ease-in .75s" }
                  :
                  {}
                }
              >
                <Typography variant="span">
                  Question
                  <br />
                  {data?.id}
                </Typography>
              </CommonButton>
            </ListItem>
          );
        })}
         <Box padding="16px">
            <Typography>
              Answered: {attempts.length}
            </Typography>
            <Typography>
              Un-answered: { questions?.length - attempts?.length}
            </Typography>
          </Box>
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
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "block",md:"block",lg:"none",xl:"none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              marginTop: navbarHeight,
              height: "100%",
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
              height: "calc(100vh - 112px)",
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
