import { useLoader } from "@react-three/fiber";
import React from "react";
import { TextureLoader } from "three";

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

export default Arrow;
