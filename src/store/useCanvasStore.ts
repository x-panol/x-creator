import { Connection, Node, Edge, EdgeChange, NodeChange, OnConnect, OnEdgesChange, OnNodesChange, addEdge, applyEdgeChanges, applyNodeChanges } from "reactflow";
import { create } from "zustand";


type CanvasStore = {
    nodes: Node[];
    edges: Edge[];
    selectedNode: string | undefined;
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onNodeAdded: (node: Node) => void;
    onConnect: OnConnect;
    onNodeSelected: (key: string | undefined) => void;
    onNodeDataUpdated: (node: Node) => void;
};

const useDemoStore = create<CanvasStore>((set, get) => ({
    nodes: [],
    edges: [],
    selectedNode: undefined,
    onNodesChange: (changes: NodeChange[]) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes as any) as unknown as Node[],
        });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    onConnect: (connection: Connection) => {
        set({
            edges: addEdge(connection, get().edges),
        });
    },
    onNodeAdded: (node: Node) => {
        set({
            nodes: get().nodes.concat(node),
            selectedNode: node.id
        });

    },
    onNodeDataUpdated: (newNode: Node) => {
        set({
            nodes: get().nodes.map((node) =>
                node.id === newNode.id ? newNode : node
            ),
        });
    },
    onNodeSelected: (value: string | undefined) => {
        set({
            selectedNode: value,
        });
    },
}));

export default useDemoStore;