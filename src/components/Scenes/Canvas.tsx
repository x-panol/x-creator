import { Box } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import NodeItemsSidebar from "@/features/Canvas/components/NodeItemsSidebar";
import "reactflow/dist/style.css";
import VideoNode from "@/features/Canvas/components/Nodes/VideoNode";
import AudioNode from "@/features/Canvas/components/Nodes/AudioNode";
import ImageNode from "@/features/Canvas/components/Nodes/ImageNode";
import useCanvasStore from "@/store/useCanvasStore";
import VideoEditor from "@/features/Canvas/components/SideNav/VideoEditor";
import AudoiEditor from "@/features/Canvas/components/SideNav/AudoiEditor";
import ImageEditor from "@/features/Canvas/components/SideNav/ImageEditor";

const nodeTypes = {
  video: VideoNode,
  audio: AudioNode,
  image: ImageNode,
};

const getId = (prefix: string) => `${prefix}-${crypto.randomUUID()}`;

const Canvas = () => {
  const {
    edges,
    nodes,
    selectedNode,
    onConnect,
    onEdgesChange,
    onNodesChange,
    onNodeAdded,
  } = useCanvasStore();
  const reactFlowWrapper = useRef(null);

  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const renderSideNav = () => {
    const node = nodes.find((node) => selectedNode === node.id);
    if (!node) return;
    switch (node?.type) {
      case "video":
        return <VideoEditor />;
      case "audio":
        return <AudoiEditor />;
      case "image":
        return <ImageEditor />;
      default:
        return null;
    }
  };

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      console.log("Pro");
      if (reactFlowInstance === null) return;
      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId("test"),
        type,
        position,
        data: { label: `${type} node` },
      };

      onNodeAdded(newNode);
    },
    [reactFlowInstance]
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        bgcolor: "#101418",
      }}
      className="reactflow-wrapper"
      ref={reactFlowWrapper}
    >
      <NodeItemsSidebar />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        fitView={true}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
      <Box
        sx={{
          ml: "10px",
          borderLeft: "1px solid",
          borderColor: "divider",
          bgcolor: "#101418",
          width: "350px",
        }}
      >
        {renderSideNav()}
      </Box>
    </Box>
  );
};

export default Canvas;
