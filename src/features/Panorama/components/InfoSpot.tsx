import React, { useRef, useState } from "react";
import { TextureLoader } from "three";
import { useSpring, animated, config } from "@react-spring/three";
import { Popover, Tooltip, Typography } from "@mui/material";

const InfoSpot = ({ onHover, onMouseLeave }: any) => {
  const loader = new TextureLoader();
  const [hovered, setHovered] = useState(false);
  const { scale } = useSpring({
    scale: hovered ? 6 : 4,
    config: { mass: 1, tension: 280, friction: 60 },
  });
  const meshRef = useRef();

  const texture = loader.load("./information.png");
  return (
    <>
      <animated.sprite
        position={[0, 0, -35]}
        scale={scale}
        onPointerEnter={(event) => {
          console.log(event);
          setHovered(true);
          document.body.style.cursor = "pointer";

          onHover(event);
        }}
        onPointerLeave={(event) => {
          console.log(event);
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
