import { Fade, Modal, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment } from "react";
import { useState } from "react";
import Image from "../../assets/annie-spratt-0ZPSX_mQ3xI-unsplash.jpg";
const Score = ({}) => {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Fragment>
          <Box
      sx={{
        height: "100vh",
        backgroundImage: `url(${Image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    ></Box>
      <Modal open={open} onClose={handleClose}>
        <Fade in={open}>
          <Stack
            justifyContent="center"
            alignItems="center"
            
          >
            <Paper sx={{ width: "400px" }}>
              <Typography> Congratulations on COmpleting quiz</Typography>
            
            </Paper>
          </Stack>
        </Fade>
      </Modal>
    </Fragment>
  );
};

export default Score;
