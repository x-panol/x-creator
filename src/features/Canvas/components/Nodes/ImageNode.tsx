import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Handle, Position } from "reactflow";
import DeleteIcon from "@mui/icons-material/Delete";
import useCanvasStore from "@/store/useCanvasStore";

const ImageNode = (props: any) => {
  const { onNodeSelected } = useCanvasStore();
  return (
    <Box
      onClick={(e) => {
        console.log(props);
        onNodeSelected(props.id);
      }}
      sx={{
        width: "100px",
        height: "100px",
        bgcolor: "white",
        borderRadius: "100%",
        boxShadow: (theme) => theme.shadows[21],
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography color="black" fontWeight={"700"}>
        {" "}
        Image
      </Typography>
      <IconButton color="error" size="small">
        <DeleteIcon />
      </IconButton>
      <Handle type="source" id="left" position={Position.Left} />
      <Handle type="target" id="right" position={Position.Right} />
      <Handle type="target" id="bottom" position={Position.Bottom} />
      <Handle type="source" id="top" position={Position.Top} />
    </Box>
  );
};

export default ImageNode;
