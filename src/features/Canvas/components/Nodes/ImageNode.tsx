import { Box, Typography } from "@mui/material";
import React from "react";

const ImageNode = () => {
  return (
    <Box
      sx={{
        width: "100px",
        height: "100px",
        bgcolor: "white",
        borderRadius: "100%",
        boxShadow: (theme) => theme.shadows[21],
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography color="black"> Image</Typography>
    </Box>
  );
};

export default ImageNode;
