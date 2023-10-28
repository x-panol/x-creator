"use client";

import React from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import FindInPageRoundedIcon from "@mui/icons-material/FindInPageRounded";
import ArticleIcon from "@mui/icons-material/Article";
import SaveIcon from "@mui/icons-material/Save";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Settings from "@mui/icons-material/Settings";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import WidgetsIcon from "@mui/icons-material/Widgets";

const TopNavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openCreateFlow, setOpenCreateFlow] = React.useState<boolean>(true);

  const open = Boolean(anchorEl);
  const [chatBoxOpen, setChatBoxOpen] = React.useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      component="header"
      className="Header"
      sx={[
        {
          p: 2,
          gap: 2,
          bgcolor: "#101418",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gridColumn: "1 / -1",
          borderBottom: "1px solid",
          borderColor: "divider",
          position: "sticky",
          top: 0,
          zIndex: 1100,
        },
      ]}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Button
          size="medium"
          color="primary"
          variant="contained"
          sx={{
            display: { xs: "none", sm: "inline-flex" },
            borderRadius: "10px",
            minWidth: 0,
            padding: "5px",
          }}
          onClick={handleClick}
        >
          <WidgetsIcon />
        </Button>
        <Typography component="h3" fontWeight="700">
          X-Panol
        </Typography>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{ width: "300px" }}
          slotProps={{
            paper: {
              sx: {
                width: "300px",
              },
            },
          }}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              setOpenCreateFlow(true);
              handleClose();
            }}
          >
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <Typography fontSize={"14px"}>New Flow</Typography>
          </MenuItem>
          <MenuItem disabled onClick={handleClose}>
            <ListItemIcon>
              <FileOpenIcon />
            </ListItemIcon>
            <Typography fontSize={"14px"}>Open</Typography>
          </MenuItem>
          <Divider />
          <MenuItem disabled onClick={handleClose}>
            <ListItemIcon>
              <SaveIcon />
            </ListItemIcon>
            <Typography fontSize={"14px"}>Save</Typography>
          </MenuItem>
          <MenuItem disabled onClick={handleClose}>
            <ListItemIcon>
              <SaveAsIcon />
            </ListItemIcon>
            <Typography fontSize={"14px"}>Save As</Typography>
          </MenuItem>
          <Divider />
          <MenuItem disabled onClick={handleClose}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <Typography fontSize={"14px"}>Settings</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default React.memo(TopNavBar);
