"use client";

import Canvas from "@/components/Scenes/Canvas";
import PanormaViewr from "@/components/Scenes/PanormaViewr";
import { Box, Tabs, Tab, Typography, useTheme, AppBar } from "@mui/material";
import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      style={{ width: "100%", height: "100%" }}
      {...other}
    >
      {value === index && <Box sx={{ height: "100%" }}>{children}</Box>}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function Home() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  return (
    <main>
      <Box
        sx={{
          height: "100%",
          borderLeft: "1px solid",
          borderColor: "divider",
          bgcolor: "#101418",
          width: "auto",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            width: "auto",
            height: "100%",
            display: "flex",
            position: "relative",
            flexDirection: "column",
            [`& .react-swipeable-view-container`]: {
              height: "100%",
            },
          }}
        >
          <AppBar
            position="static"
            sx={{
              width: "fit-content",
              position: "absolute",
              top: "0",
              left: 0,
              zIndex: 1,
              borderBottomRightRadius: "10px",
              borderBottomLeftRadius: "10px",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="scrollable"
              aria-label="full width tabs example"
              sx={{
                backgroundColor: "transparent",
                [`& .MuiButtonBase-root`]: {
                  color: "white",
                  padding: (theme) => theme.spacing(1),
                  minWidth: "0",
                },
              }}
            >
              <Tab
                label={<Typography variant="caption">Scene</Typography>}
                {...a11yProps(0)}
              />
              <Tab
                label={<Typography variant="caption">Canvas</Typography>}
                {...a11yProps(1)}
              />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            style={{ height: "100%", flex: "1 1 0" }}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <PanormaViewr />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <Canvas />
            </TabPanel>
          </SwipeableViews>
        </Box>
      </Box>
    </main>
  );
}
