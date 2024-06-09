import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NodeData, TableRow } from "./workflowSlice";

export interface processData {
  column: string;
  condition: string;
  value: string;
}

export interface NodeState {
  nodesData: NodeData[];
  selectedNodeData: {
    id: string;
    type: string;
    actionType: string;
    position: { x: number; y: number };
    data: TableRow[] | [];
    selectedFile: string | null;
    processData?: processData;
  } | null;
}

const initialState: NodeState = {
  nodesData: [],
  selectedNodeData: null,
};

const nodeSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    removeNode: (state, action: PayloadAction<string>) => {
      state.nodesData = state.nodesData.filter(
        (node) => node.id !== action.payload
      );
      if (state.selectedNodeData?.id === action.payload) {
        state.selectedNodeData = null;
      }
    },
    removeNodeData: (state, action: PayloadAction<string>) => {
      const findNodeIndex = state.nodesData.findIndex(
        (n) => n.id === action.payload
      );
      if (findNodeIndex !== -1) {
        state.nodesData[findNodeIndex] = {
          ...state.nodesData[findNodeIndex],
          selectedFile: null,
          data: [],
        };
        if (state.selectedNodeData) {
          state.selectedNodeData.data = [];
          state.selectedNodeData.selectedFile = null;
        }
      }
    },
    loadNodes: (state, action: PayloadAction<string>) => {
      const workflowData = localStorage.getItem(`workflow-${action.payload}`);
      if (workflowData) {
        const workflow = JSON.parse(workflowData);
        state.nodesData = workflow?.nodes?.nodesData || [];
        state.selectedNodeData = workflow?.nodes?.selectedNodeData || {};
      }
    },
    addNode: (
      state,
      action: PayloadAction<{
        id: string;
        type: string;
        actionType: string;
        data: TableRow[];
        position: { x: number; y: number };
        selectedFile: string | null;
      }>
    ) => {
      state.nodesData.push({
        id: action.payload.id,
        data: action.payload.data,
        type: action.payload.type,
        actionType: action.payload.actionType,
        position: action.payload.position,
        selectedFile: action.payload.selectedFile,
      });
    },
    setNodeData: (state, action: PayloadAction<NodeData>) => {
      const existingNodeIndex = state.nodesData.findIndex(
        (node) => node.id === action.payload.id
      );
      if (existingNodeIndex !== -1) {
        state.nodesData[existingNodeIndex] = action.payload;
      } else {
        state.nodesData.push(action.payload);
      }
    },
    setNodePosition: (
      state,
      action: PayloadAction<{
        id: string;
        position: { x: number; y: number };
      }>
    ) => {
      const node = state.nodesData.find(
        (node) => node.id === action.payload.id
      );
      if (node) {
        node.position = action.payload.position;
      }
    },

    setSelectedNodeData: (
      state,
      action: PayloadAction<{
        id: string;
        type: string;
        actionType: string;
        data: TableRow[];
        position: { x: number; y: number };
        selectedFile: string | null;
      } | null>
    ) => {
      state.selectedNodeData = action.payload;
    },
    setFilteredNodeData: (
      state,
      action: PayloadAction<{
        id: string;
        filterData: {
          column: string;
          condition: string;
          value: string;
        };
      }>
    ) => {
      const { id, filterData } = action.payload;
      const node = state.nodesData.find((node) => node.id === id);
      if (node) {
        node.filterData = filterData;
      }
    },
  },
});

export const {
  addNode,
  setNodeData,
  setNodePosition,
  setSelectedNodeData,
  loadNodes,
  removeNodeData,
  removeNode,
  setFilteredNodeData,
} = nodeSlice.actions;

export default nodeSlice.reducer;
