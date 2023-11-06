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

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];

const nodeTypes = {
  video: VideoNode,
  audio: AudioNode,
  image: ImageNode,
};

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];
const getId = (prefix: string) => `${prefix}-${crypto.randomUUID()}`;

const Canvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const reactFlowWrapper = useRef(null);

  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

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

      setNodes((nds) => nds.concat(newNode));
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
          width: "300px",
        }}
      >
        s
      </Box>
    </Box>
  );
};

export default Canvas;
