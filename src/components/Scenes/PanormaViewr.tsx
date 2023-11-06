import React from "react";

import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { TextureLoader, BackSide } from "three";
import Arrow from "@/features/Panorama/components/Arrow";
import { arrows } from "@/features/Panorama/utils";
import EqImageViewer from "@/features/Panorama/components/EqImageViewer";
import { Box } from "@mui/material";

const PanormaViewr = () => {
  const colorMap = useLoader(
    TextureLoader,
    "https://pchen66.github.io/Panolens/examples/asset/textures/equirectangular/field.jpg"
  );
  return (
    <Box sx={{ width: "100%", height: "100%", display: "flex" }}>
      <Canvas
        style={{
          width: "100%",
          padding: "10px",
          height: "100%",
          flex: "1 1 0",
        }}
      >
        <EqImageViewer />
        <Arrow {...arrows.front} />
        <Arrow {...arrows.back} />
        <Arrow {...arrows.left} />
        <Arrow {...arrows.right} />
        <OrbitControls
          maxZoom={1.5}
          minZoom={1.5}
          maxDistance={5}
          minDistance={5}
        />
      </Canvas>
      <Box
        sx={{
          ml: "10px",
          borderLeft: "1px solid",
          borderColor: "divider",
          bgcolor: "#101418",
          width: "300px",
        }}
      >
        s
      </Box>
    </Box>
  );
};

export default PanormaViewr;
