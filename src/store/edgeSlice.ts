import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EdgeData {
	id: string;
	source: string;
	target: string;
	animated?: boolean;
	data?: any;
}

export interface EdgeState {
	edgesData: EdgeData[];
}

const initialState: EdgeState = {
	edgesData: [],
};

const edgeSlice = createSlice({
	name: 'edges',
	initialState,
	reducers: {
		loadEdges: (state, action: PayloadAction<string>) => {
			const workflowData = localStorage.getItem(
				`workflow-${action.payload}`,
			);
			if (workflowData) {
				const parsedWorkflowData = JSON.parse(workflowData);
				const edgesData = parsedWorkflowData?.edges?.edgesData ?? [];
				state.edgesData = edgesData;
			}
		},
		setEdgesData: (state, action: PayloadAction<EdgeData[]>) => {
			state.edgesData = action.payload;
		},
		updateEdgeData: (
			state,
			action: PayloadAction<{ id: string; data: any }>,
		) => {
			const edge = state.edgesData.find(
				(edge) => edge.id === action.payload.id,
			);
			if (edge) {
				edge.data = action.payload.data;
			}
		},
	},
});

export const { setEdgesData, updateEdgeData, loadEdges } = edgeSlice.actions;

export default edgeSlice.reducer;
