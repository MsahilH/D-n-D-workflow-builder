import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EdgeState } from "./edgeSlice";
import { processData, NodeState } from "./nodeSlice";

export interface TableRow {
  [key: string]: string | number | boolean;
}

export interface NodeData {
  id: string;
  data: TableRow[];
  type: string | undefined;
  actionType: string;
  position: { x: number; y: number };
  selectedFile: string | null;
  filterData?: processData;
}

interface EdgeData {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
}

interface Workflow {
  id: string;
  name: string;
  selectedFileName: string | null;
  nodesData: NodeData[];
  edgesData: EdgeData[];
}

interface WorkflowState {
  workflows: Workflow[];
  currentWorkflowId: string | null;
}

const initialState: WorkflowState = {
  workflows: [],
  currentWorkflowId: null,
};

const workflowSlice = createSlice({
  name: "workflows",
  initialState,
  reducers: {
    createNewWorkflow: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      const newWorkflow: Workflow = {
        id: action.payload.id,
        name: action.payload.name,
        selectedFileName: null,
        nodesData: [],
        edgesData: [],
      };
      state.workflows.push(newWorkflow);
      state.currentWorkflowId = action.payload.id;
    },
    setCurrentWorkflow: (state, action: PayloadAction<string>) => {
      state.currentWorkflowId = action.payload;
    },
    saveWorkflow: (
      state,
      action: PayloadAction<{
        nodes?: NodeState;
        edges: EdgeState;
      } | null>
    ) => {
      const currentWorkflow = state.workflows.find(
        (workflow) => workflow.id === state.currentWorkflowId
      );
      if (currentWorkflow) {
        const updatedWorkflow = {
          ...currentWorkflow,
          ...(action?.payload || {}),
        };
        localStorage.setItem(
          `workflow-${currentWorkflow.id}`,
          JSON.stringify(updatedWorkflow)
        );
      }
    },
    loadAllWorkflows: (state) => {
      const allKeys = Object.keys(localStorage);
      state.workflows = allKeys
        .filter((key) => key.startsWith("workflow-"))
        .map(
          (key) => JSON.parse(localStorage.getItem(key) || "{}") as Workflow
        );
    },
    loadWorkflow: (state, action: PayloadAction<string>) => {
      const workflowData = localStorage.getItem(`workflow-${action.payload}`);
      if (workflowData) {
        const workflow = JSON.parse(workflowData) as Workflow;
        const existingWorkflowIndex = state.workflows.findIndex(
          (workflow) => workflow.id === action.payload
        );
        if (existingWorkflowIndex !== -1) {
          state.workflows[existingWorkflowIndex] = workflow;
        } else {
          state.workflows.push(workflow);
        }
        state.currentWorkflowId = action.payload;
      }
    },
    updateWorkflow: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      const { id, name } = action.payload;
      const updatedWorkflows = state.workflows.map((workflow) =>
        workflow.id === id ? { ...workflow, name } : workflow
      );
      const workflowId = action.payload.id;
      const workflowName = action.payload.name;
      const workflowKey = `workflow-${workflowId}`;

      const updatedLocalStorageData = {
        ...JSON.parse(localStorage.getItem(workflowKey) || "{}"),
        name: workflowName,
      };
      localStorage.setItem(
        workflowKey,
        JSON.stringify(updatedLocalStorageData)
      );
      return {
        ...state,
        workflows: state.workflows.map((workflow) =>
          workflow.id === id ? { ...workflow, name } : workflow
        ),
      };
    },
    deleteWorkflow: (state, action: PayloadAction<string>) => {
      const workflowId = action.payload;
      const workflowKey = `workflow-${workflowId}`;
      state.workflows = state.workflows.filter(
        (workflow) => workflow.id !== workflowId
      );
      const updatedWorkflow = {
        ...state.workflows,
      };
      localStorage.removeItem(workflowKey);
    },
  },
});

export const {
  createNewWorkflow,
  setCurrentWorkflow,
  saveWorkflow,
  loadAllWorkflows,
  loadWorkflow,
  updateWorkflow,
  deleteWorkflow,
} = workflowSlice.actions;

export default workflowSlice.reducer;
