import { useLoader } from "@react-three/fiber";
import React from "react";
import { BackSide, TextureLoader } from "three";

const EqImageViewer = ({ image }: { image?: string }) => {
  const colorMap = useLoader(
    TextureLoader,
    image ||
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
};

export default EqImageViewer;
