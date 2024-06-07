import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EdgeState } from './edgeSlice';
import { filterData, NodeState } from './nodeSlice';

export interface TableRow {
	[key: string]: string | number | boolean;
}

export interface NodeData {
	id: string;
	data: TableRow[];
	type: string | undefined;
	position: { x: number; y: number };
	selectedFile: string | null;
	filterData?: filterData;
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
	name: 'workflows',
	initialState,
	reducers: {
		createNewWorkflow: (
			state,
			action: PayloadAction<{ id: string; name: string }>,
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
			} | null>,
		) => {
			const currentWorkflow = state.workflows.find(
				(workflow) => workflow.id === state.currentWorkflowId,
			);
			if (currentWorkflow) {
				const updatedWorkflow = {
					...currentWorkflow,
					...(action?.payload || {}),
				};
				localStorage.setItem(
					`workflow-${currentWorkflow.id}`,
					JSON.stringify(updatedWorkflow),
				);
			}
		},
		loadAllWorkflows: (state) => {
			const allKeys = Object.keys(localStorage);
			state.workflows = allKeys
				.filter((key) => key.startsWith('workflow-'))
				.map(
					(key) =>
						JSON.parse(
							localStorage.getItem(key) || '{}',
						) as Workflow,
				);
		},
		loadWorkflow: (state, action: PayloadAction<string>) => {
			const workflowData = localStorage.getItem(
				`workflow-${action.payload}`,
			);
			if (workflowData) {
				const workflow = JSON.parse(workflowData) as Workflow;
				const existingWorkflowIndex = state.workflows.findIndex(
					(workflow) => workflow.id === action.payload,
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
			action: PayloadAction<{ id: string; name: string }>,
		) => {
			const workflowIndex = state.workflows.findIndex(
				(workflow) => workflow.id === action.payload.id,
			);
			if (workflowIndex !== -1) {
				state.workflows[workflowIndex].name = action.payload.name;
				localStorage.setItem(
					`workflow-${action.payload.id}`,
					JSON.stringify(state.workflows[workflowIndex]),
				);
			}
		},
		deleteWorkflow: (state, action: PayloadAction<string>) => {
			state.workflows = state.workflows.filter(
				(workflow) => workflow.id !== action.payload,
			);
			localStorage.removeItem(`workflow-${action.payload}`);
			if (state.currentWorkflowId === action.payload) {
				state.currentWorkflowId = null;
			}
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
	deleteWorkflow
} = workflowSlice.actions;

export default workflowSlice.reducer;
