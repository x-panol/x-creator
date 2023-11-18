import React, { useEffect } from "react";

import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { TextureLoader, BackSide } from "three";
import Arrow from "@/features/Panorama/components/Arrow";
import { arrows } from "@/features/Panorama/utils";
import EqImageViewer from "@/features/Panorama/components/EqImageViewer";
import { Box, List, ListItem, Popper, Typography } from "@mui/material";
import useCanvasStore from "@/store/useCanvasStore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PolylineIcon from "@mui/icons-material/Polyline";
import InfoSpot from "@/features/Panorama/components/InfoSpot";

type NodeDataProps = {
  left?: string;
  right?: string;
  front?: string;
  back?: string;
  imagePath?: string;
  videoPath?: string;
};

type State = "poly" | "info" | "idle";

const PanormaViewr = () => {
  const { selectedNode, nodes, edges, onNodeSelected } = useCanvasStore();
  const [nodeData, setNodeData] = React.useState<NodeDataProps>();
  const node = nodes.find((node) => node.id == selectedNode);
  const [currentState, setCurrenState] = React.useState<State>("idle");
  const popperRef = React.useRef(null);

  useEffect(() => {
    const left = edges.find(
      (edge) => edge.source === selectedNode && edge.sourceHandle === "left"
    );
    const right = edges.find(
      (edge) => edge.target === selectedNode && edge.targetHandle === "right"
    );
    const front = edges.find(
      (edge) => edge.source === selectedNode && edge.sourceHandle === "top"
    );
    const back = edges.find(
      (edge) => edge.target === selectedNode && edge.targetHandle === "bottom"
    );

    setNodeData({
      ...nodeData,
      left: left?.target,
      right: right?.source,
      front: front?.target,
      back: back?.source,
    });
  }, [selectedNode, edges]);

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [infoSpots, setInfoSpots] = React.useState<any[]>([]);

  const handleClick = (event) => {
    setAnchorEl(document.body);
    popperRef.current.style.top = `${event.layerY + 50}px`;
    popperRef.current.style.left = `${
      event.layerX - popperRef.current.offsetWidth / 3
    }px`;
    console.log(event);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // A png with transparency to use as the target sprite.
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box sx={{ width: "100%", height: "100%", display: "flex" }}>
      <Box sx={{ width: "50px", mt: "40px" }}>
        <List>
          <ListItem
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
            }}
            onClick={() => setCurrenState("info")}
          >
            <LocationOnIcon
              sx={{ color: currentState == "info" ? "purple" : "white" }}
            />
            <Typography variant="body2" fontSize=".7rem">
              InfoSpot
            </Typography>
          </ListItem>
          <ListItem
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
            }}
            onClick={() => setCurrenState("poly")}
          >
            <PolylineIcon />
            <Typography variant="body2" fontSize=".7rem">
              Poly
            </Typography>
          </ListItem>
        </List>
      </Box>
      <Canvas
        style={{
          width: "100%",
          padding: "10px",
          height: "100%",
          flex: "1 1 0",
          paddingLeft: "5px",
        }}
      >
        {infoSpots.map((info) => (
          <InfoSpot
            key={info.toString()}
            onHover={handleClick}
            onMouseLeave={handleClose}
            position={info}
          />
        ))}
        {nodeData && (
          <>
            <EqImageViewer
              image={node?.data.imageURL}
              onClick={(event) => {
                if (currentState === "info") {
                  const point = event.point;
                  point.normalize();

                  // Scale to radius
                  point.multiplyScalar(30);
                  setCurrenState("idle");
                  setInfoSpots([...infoSpots, point]);
                }
              }}
            />
            {nodeData?.front && (
              <Arrow
                {...arrows.front}
                onClick={() => onNodeSelected(nodeData.front)}
              />
            )}
            {nodeData?.back && (
              <Arrow
                {...arrows.back}
                onClick={() => onNodeSelected(nodeData.back)}
              />
            )}
            {nodeData?.left && (
              <Arrow
                {...arrows.left}
                onClick={() => onNodeSelected(nodeData.left)}
              />
            )}
            {nodeData?.right && (
              <Arrow
                {...arrows.right}
                onClick={() => onNodeSelected(nodeData.right)}
              />
            )}
            <OrbitControls
              maxZoom={1.5}
              minZoom={1.5}
              maxDistance={5}
              minDistance={5}
            />
          </>
        )}
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
      <Box
        id={id}
        ref={popperRef}
        sx={{ position: "absolute" }}
        visibility={open ? "visible" : "hidden"}
      >
        <Box
          sx={{
            border: 1,
            p: 1,
            bgcolor: "background.paper",
            borderWidth: "0",
            borderRadius: "10px",
          }}
        >
          The content of the Popper.
        </Box>
      </Box>
    </Box>
  );
};

export default PanormaViewr;
