import React, { useEffect } from 'react';
import SidePanel from 'layout/SidePanel';
import Footer from 'layout/Footer';
import './WorkflowBuilderStyle.css';
import { useParams } from 'react-router-dom';

import FlowCanvas from './FlowCanvas';
import { useDispatch } from 'react-redux';
import { loadWorkflow } from 'store/workflowSlice';

const WorkflowBuilder = () => {
	const params = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadWorkflow(params.workflowId || ''));
	}, []);

	return (
		<div className="workflow-container">
			<div className="main-content">
				<SidePanel />
				<FlowCanvas />
			</div>
			<Footer />
		</div>
	);
};

export default WorkflowBuilder;
