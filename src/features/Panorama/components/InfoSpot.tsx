import React, { useRef, useState } from "react";
import { TextureLoader } from "three";
import { useSpring, animated, config } from "@react-spring/three";
import { Popover, Tooltip, Typography } from "@mui/material";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
const InfoSpot = ({ onHover, onMouseLeave, position }: any) => {
  const loader = new TextureLoader();
  const [hovered, setHovered] = useState(false);
  const [grabbed, setGrabbed] = useState(false);

  const [newPosition, setNewPosition] = useState(position);
  const { scale } = useSpring({
    scale: hovered ? 6 : 4,
    config: { mass: 1, tension: 340, friction: 20 },
  });
  const meshRef = useRef();
  const { camera } = useThree();
  const texture = loader.load("./information.png");
  return (
    <>
      <animated.sprite
        position={newPosition}
        scale={scale}
        onPointerDown={() => {
          setGrabbed(true);
        }}
        onPointerUp={() => {
          setGrabbed(false);
        }}
        onPointerEnter={(event) => {
          setHovered(true);
          document.body.style.cursor = "pointer";
          const vector = event.object.position.clone();
          vector.project(camera);
          const doc = document.getElementById("canvas");
          const x = (vector.x * 0.5 + 0.5) * doc?.offsetWidth;
          const y = (vector.y * -0.5 + 0.5) * doc?.offsetHeight;

          console.log(`Screen position: ${x}px, ${y}px`);
          onHover({ x, y });
        }}
        onPointerMove={(event) => {
          if (grabbed) {
            event.stopPropagation();

            const point = event.point;
            point.normalize();

            // Scale to radius
            point.multiplyScalar(30);
            setNewPosition(point);
          }
        }}
        onPointerLeave={(event) => {
          setGrabbed(false);
          setHovered(false);
          document.body.style.cursor = "unset";
          onMouseLeave();
        }}
      >
        <spriteMaterial attach="material" map={texture} />
      </animated.sprite>
    </>
  );
};

export default InfoSpot;
