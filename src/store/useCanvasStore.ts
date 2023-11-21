import { Vector3 } from "@react-three/fiber";
import { Connection, Node, Edge, EdgeChange, NodeChange, OnConnect, OnEdgesChange, OnNodesChange, addEdge, applyEdgeChanges, applyNodeChanges } from "reactflow";
import { create } from "zustand";

export type InFoSpot = {
    type: string
    id: string
    position: Vector3
    content: string
}

export interface NodeData extends Node {
    data: {
        infoSpot: InFoSpot[]
        type: string
        image?: string
        video?: string
    }
}
type CanvasStore = {
    nodes: NodeData[];
    edges: Edge[];
    selectedNode: string | undefined;
    selectedInfoSpot: string | undefined;
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onNodeAdded: (node: Node) => void;
    onConnect: OnConnect;
    onNodeSelected: (key: string | undefined) => void;
    onInfoSpotSelected: (key: string | undefined) => void;
    onNodeDataUpdated: (node: NodeData) => void;
};

const useDemoStore = create<CanvasStore>((set, get) => ({
    nodes: [],
    edges: [],
    selectedNode: undefined,
    selectedInfoSpot: undefined,
    onInfoSpotSelected: (value: string | undefined) => {
        set({
            selectedInfoSpot: value,
        });
    },
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
    onNodeDataUpdated: (newNode: NodeData) => {
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