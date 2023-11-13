import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import useCanvasStore from "@/store/useCanvasStore";

const ImageEditor = () => {
  const { nodes, onNodeDataUpdated, selectedNode } = useCanvasStore();

  const node = nodes.find((node) => node.id == selectedNode);

  return (
    <Box
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="subtitle2">{node?.id}</Typography>
      <TextField
        value={node?.data?.imageURL || ""}
        onChange={(e) => {
          if (node) {
            node!.data["imageURL"] = e.target.value;

            onNodeDataUpdated(node);
          }
        }}
        size="small"
        helperText="Please enter your name"
        id="demo-helper-text-aligned"
        label="Image"
      />
    </Box>
  );
};

export default ImageEditor;
