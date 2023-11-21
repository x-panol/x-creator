import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const NodeItems = () => {
  const onDragStart = React.useCallback(
    (event: React.DragEvent, nodeType: string) => {
      event.stopPropagation();
      // event.preventDefault();
      event.dataTransfer.setData("application/reactflow", nodeType);
      event.dataTransfer.effectAllowed = "move";
    },
    []
  );

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: "50px",
        mr: "10px",
        borderRight: "1px solid",
        borderColor: "divider",
        width: "250px",
        overflow: "hidden",
        color: "white",
      }}
    >
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton
              draggable
              onDragStart={(event) => onDragStart(event, "image")}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Image" color="white" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              draggable
              onDragStart={(event) => onDragStart(event, "video")}
            >
              <ListItemIcon>
                <OndemandVideoIcon />
              </ListItemIcon>
              <ListItemText primary="Video" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              draggable
              onDragStart={(event) => onDragStart(event, "audio")}
            >
              <ListItemIcon>
                <VolumeUpIcon />
              </ListItemIcon>
              <ListItemText primary="Audio" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
};

export default NodeItems;
