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

const loader = new TextureLoader();
const arrows = {
  front: {
    position: [10, -9, 0],
    angle: [0, 0, 0],
  },
  back: {
    position: [-10, -9, 0],
    angle: [0, Math.PI, 0],
  },
  left: {
    position: [0, -9, -10],
    angle: [0, Math.PI / 2, 0],
  },
  right: {
    position: [0, -9, 10],
    angle: [0, -Math.PI / 2, 0],
  },
};

function Arrow({ position, angle }: { position: any; angle: any }) {
  const colorMap = useLoader(TextureLoader, "./arrow.png");
  return (
    <mesh
      position={position}
      rotation={angle}
      onPointerEnter={() => {
        console.log("hover");
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        console.log("pointer");
        document.body.style.cursor = "default";
      }}
    >
      <boxGeometry args={[5, 0.2, 5]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
}

function Scene() {
  const colorMap = useLoader(
    TextureLoader,
    "https://pchen66.github.io/Panolens/examples/asset/textures/equirectangular/field.jpg"
  );
  return (
    <>
      <ambientLight intensity={7} />
      <directionalLight />
      <mesh>
        <sphereGeometry args={[40, 32, 32]} />
        <meshStandardMaterial map={colorMap} side={BackSide} />
      </mesh>
    </>
  );
}

const theme = createTheme();

export default function Home() {
  const colorMap = useLoader(
    TextureLoader,
    "https://pchen66.github.io/Panolens/examples/asset/textures/equirectangular/field.jpg"
  );

  return (
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
            backgroundColor: "white",
          },
          main: {
            width: "100%",
            height: "100%",
          },
        }}
      />

      <CssBaseline />
      <main>
        <Canvas
          style={{ width: "100%", height: "100%", backgroundColor: "blue" }}
        >
          <Scene />
          <Arrow {...arrows.front} />
          <Arrow {...arrows.back} />
          <Arrow {...arrows.left} />
          <Arrow {...arrows.right} />
          <OrbitControls />
        </Canvas>
      </main>
    </ThemeProvider>
  );
}
