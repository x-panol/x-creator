import { Vector3, useLoader } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { TextureLoader } from "three";
import { useSpring, animated, config } from "@react-spring/three";

function Arrow({
  position,
  angle,
  onClick,
}: {
  position: any;
  angle: any;
  onClick: any;
}) {
  const [hovered, setHovered] = useState(false);
  const { scale } = useSpring({
    scale: hovered ? 1.2 : 1,
    config: config.wobbly,
  });

  const colorMap = useLoader(TextureLoader, "./arrow.png");
  console.log(scale.get());
  useEffect(() => {
    // if (hovered) {
    //   set({ scale: [1.2, 1.2, 1.2] });
    // } else {
    //   set({ scale: [1.2, 1.2, 1.2] });
    // }
  }, [hovered]);
  return (
    <animated.mesh
      position={position}
      rotation={angle}
      scale={scale}
      onPointerEnter={() => {
        document.body.style.cursor = "pointer";
        setHovered(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = "unset";
        setHovered(false);
      }}
      onClick={() => {
        onClick();
      }}
    >
      <boxGeometry args={[5, 0.2, 5]} />
      <meshStandardMaterial map={colorMap} />
    </animated.mesh>
  );
}

export default Arrow;
