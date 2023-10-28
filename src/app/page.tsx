"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  CssBaseline,
  createTheme,
  ThemeProvider,
  GlobalStyles,
} from "@mui/material";
import { TextureLoader, BackSide } from "three";
import Arrow from "@/features/Panorama/components/Arrow";
import { arrows } from "@/features/Panorama/utils";
import EqImageViewer from "@/features/Panorama/components/EqImageViewer";

export default function Home() {
  const colorMap = useLoader(
    TextureLoader,
    "https://pchen66.github.io/Panolens/examples/asset/textures/equirectangular/field.jpg"
  );

  return (
    <main>
      <Canvas style={{ width: "100%", padding: "10px", height: "100%" }}>
        <EqImageViewer />
        <Arrow {...arrows.front} />
        <Arrow {...arrows.back} />
        <Arrow {...arrows.left} />
        <Arrow {...arrows.right} />
        <OrbitControls />
      </Canvas>
    </main>
  );
}
