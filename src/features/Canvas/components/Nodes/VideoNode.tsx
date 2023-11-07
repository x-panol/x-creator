import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Handle, Position } from "reactflow";
import DeleteIcon from "@mui/icons-material/Delete";
import useCanvasStore from "@/store/useCanvasStore";

const VideoNode = (props: any) => {
  const { onNodeSelected } = useCanvasStore();
  return (
    <Box
      onClick={() => {
        onNodeSelected(props.id);
      }}
      sx={{
        width: "100px",
        height: "100px",
        bgcolor: "white",
        borderRadius: "100%",
        boxShadow: (theme) => theme.shadows[21],
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography color="black" fontWeight={"700"}>
        Video
      </Typography>
      <IconButton color="error" size="small">
        <DeleteIcon />
      </IconButton>
      <Handle
        type="source"
        id="start"
        aria-label="start"
        position={Position.Left}
      />
      <Handle
        type="target"
        id="end"
        aria-label="end"
        position={Position.Right}
      />
    </Box>
  );
};

export default VideoNode;
