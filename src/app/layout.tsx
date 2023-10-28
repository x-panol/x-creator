"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { Box } from "@mui/material";
import NavBar from "@/components/NavBar";
import {
  CssBaseline,
  createTheme,
  ThemeProvider,
  GlobalStyles,
} from "@mui/material";
import Sidebar from "@/components/SideNav/Sidebar";
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
        gridTemplateColumns: {
          xs: "1fr",
          sm: " minmax(450px, 1fr) minmax(64px, 200px)",
          md: "minmax(600px, 1fr) minmax(160px, 300px) ",
        },
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
            <Sidebar />
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
