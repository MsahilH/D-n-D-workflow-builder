import { configureStore } from '@reduxjs/toolkit';
import workflowReducer from './workflowSlice';
import nodeReducer from './nodeSlice';
import edgeReducer from './edgeSlice';

export const store = configureStore({
	reducer: {
		workflows: workflowReducer,
		nodes: nodeReducer,
		edges: edgeReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export const getState = store.getState;
export type AppDispatch = typeof store.dispatch;
