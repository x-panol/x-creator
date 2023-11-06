import { Box, Typography } from "@mui/material";
import React from "react";
import { Handle, Position } from "reactflow";

const VideoNode = () => {
  return (
    <Box
      sx={{
        width: "100px",
        height: "100px",
        bgcolor: "white",
        borderRadius: "100%",
        boxShadow: (theme) => theme.shadows[21],
        boxShadow: (theme) => theme.shadows[21],
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography color="black">Video</Typography>
      <Handle type="source" id="prompt-handle" position={Position.Left} />
      <Handle type="target" id="prompt-handle2" position={Position.Right} />
      <Handle type="target" id="prompt-handle3" position={Position.Bottom} />
      <Handle type="source" id="prompt-handle4" position={Position.Top} />
    </Box>
  );
};

export default VideoNode;
