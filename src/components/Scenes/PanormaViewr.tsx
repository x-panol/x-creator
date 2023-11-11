import React, { useEffect } from "react";

import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { TextureLoader, BackSide } from "three";
import Arrow from "@/features/Panorama/components/Arrow";
import { arrows } from "@/features/Panorama/utils";
import EqImageViewer from "@/features/Panorama/components/EqImageViewer";
import { Box } from "@mui/material";
import useCanvasStore from "@/store/useCanvasStore";

type NodeDataProps = {
  left?: string;
  right?: string;
  front?: string;
  back?: string;
  imagePath?: string;
  videoPath?: string;
};

const PanormaViewr = () => {
  const { selectedNode, nodes, edges, onNodeSelected } = useCanvasStore();
  const [nodeData, setNodeData] = React.useState<NodeDataProps>();
  const node = nodes.find((node) => node.id == selectedNode);

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

  const colorMap = useLoader(
    TextureLoader,
    "https://pchen66.github.io/Panolens/examples/asset/textures/equirectangular/field.jpg"
  );
  console.log(nodeData);
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
        {nodeData && (
          <>
            <EqImageViewer image={node?.data.imageURL} />
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
    </Box>
  );
};

export default PanormaViewr;
