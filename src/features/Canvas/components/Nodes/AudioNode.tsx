import React from "react";
import { Box, Typography } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const AudioNode = () => {
  return (
    <Box
      sx={{
        width: "50px",
        height: "50px",
        bgcolor: "transparent",
        borderRadius: "100%",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <VolumeUpIcon
        color="primary"
        sx={{
          width: "50px",
          height: "50px",
          bgColor: (theme) => theme.palette.primary,
          fill: (theme) => theme.palette.primary,
          stroke: (theme) => theme.palette.primary,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "60px",
          height: "60px",
          bgcolor: "#899faf5c",
          borderRadius: "100%",
        }}
      ></Box>
    </Box>
  );
};

export default AudioNode;
