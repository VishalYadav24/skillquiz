import { Close } from "@mui/icons-material";
import { Alert, IconButton, Snackbar } from "@mui/material";
import React from "react";

const Notifications = ({
  notification,
  type,
  showNotification,
  setShowNotification,
}) => {
  const handleClose = (event, reason) => {
    console.log(event,reason)
    if (reason === "clickaway") {
      return;
    }
     setShowNotification(()=>false);
  };



  return (
    <div>
      <Snackbar
        open={showNotification}
        onClose={handleClose}
        autoHideDuration={4000}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Alert severity={notification?.type} action={
          <IconButton size="smaller" onClick={()=> handleClose("clickaway")}>
            <Close></Close>
          </IconButton>
        }>{notification?.message}
        
        </Alert>

      </Snackbar>
    </div>
  );
};

export default Notifications;
