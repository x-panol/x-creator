import React from "react";
import { Box, TextField } from "@mui/material";
import useCanvasStore from "@/store/useCanvasStore";

const VideoEditor = () => {
  const { nodes, onNodesChange, selectedNode } = useCanvasStore();

  const data = nodes.find((node) => node.id == selectedNode)?.data;

  return (
    <Box
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TextField
        value={data.imageURL || ""}
        onChange={(e) => {
          console.log(e);
        }}
        size="small"
        helperText="Please enter your name"
        id="demo-helper-text-aligned"
        label="Image"
      />
    </Box>
  );
};

export default VideoEditor;
