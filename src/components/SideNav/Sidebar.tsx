import { Box } from "@mui/material";
import React from "react";

const Sidebar = () => {
  return (
    <Box
      sx={{
        ml: "10px",
        borderLeft: "1px solid",
        borderColor: "divider",
        bgcolor: "#101418",
      }}
    >
      Sidebar
    </Box>
  );
};

export default Sidebar;
