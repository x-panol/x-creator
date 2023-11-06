"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import {
  CssBaseline,
  createTheme,
  ThemeProvider,
  GlobalStyles,
} from "@mui/material";
import Sidebar from "@/components/SideNav/Sidebar";
import { Box, Tabs, Tab, Typography, useTheme, AppBar } from "@mui/material";
import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const style = React.useMemo(
    () => [
      {
        backgroundColor: "black",
        display: "grid",

        gridTemplateRows: "64px 1fr",
        minHeight: "100vh",
        maxHeight: "100vh",
      },
    ],
    []
  );

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <GlobalStyles
            styles={{
              html: {
                minHeight: "100%",
                height: "100%",
              },
              body: {
                width: "100%",
                minHeight: "100%",
                height: "100%",
              },
              main: {
                width: "100%",
                height: "100%",
              },
            }}
          />

          <CssBaseline />
          <Box sx={style}>
            <NavBar />
            {children}
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
