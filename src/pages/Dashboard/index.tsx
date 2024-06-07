import React, { useEffect, useState } from 'react';
import './DashboardStyle.css';
import Button from 'components/Button';
import DynamicInput from 'components/Form/DynamicInput';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useNavigate } from 'react-router-dom';
import {
	deleteWorkflow,
	updateWorkflow,
	createNewWorkflow,
	loadAllWorkflows,
	saveWorkflow,
	setCurrentWorkflow,
	
} from "store/workflowSlice";

const Dashboard = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const workflows = useSelector(
		(state: RootState) => state.workflows.workflows,
	);
	const [newWorkflowName, setNewWorkflowName] = useState<string>('');
	const [error, setError] = useState<string>('');	
	useEffect(() => {
		dispatch(loadAllWorkflows());
	}, []);

	const handleCreateWorkflow = () => {
		const newWorkflowId = `workflow-${Date.now()}`;

		if (!newWorkflowName.trim()) {
			setError('Workflow name cannot be empty.');
			return;
		}

		const isDuplicate = workflows.some(
			(workflow) => workflow.name === newWorkflowName.trim(),
		);

		if (isDuplicate) {
			setError('Workflow name already exists.');
			return;
		}
		setError('');

		dispatch(
			createNewWorkflow({ id: newWorkflowId, name: newWorkflowName }),
		);
		dispatch(saveWorkflow(null));
		dispatch(setCurrentWorkflow(newWorkflowId));
		navigate(`/workflow/${newWorkflowId}`);
		setNewWorkflowName('');
	};

	const updateWorkflowName = (workflowId: string, workflowName: string) => {
        if (!workflowName.trim()) {
            setError('Workflow name cannot be empty.');
            return;
        }

        const isDuplicate = workflows.some(
            (workflow) => workflow.name === workflowName.trim() && workflow.id !== workflowId,
        );

        if (isDuplicate) {
            setError('Workflow name already exists.');
            return;
        }
        setError('');

        dispatch(
            updateWorkflow({ id: workflowId, name: workflowName }),
        );
    };

    const deleteWorkflows = (workflowId: string) => {
        dispatch(deleteWorkflow(workflowId));
    };

	const handleSelectWorkflow = (workflowId: string) => {
		navigate(`/workflow/${workflowId}`);
		dispatch(setCurrentWorkflow(workflowId));
	};

	console.log("this is workflows",workflows );

	return (
		<div className="dashboard-container">
			<div className="header">
				<DynamicInput
					type="text"
					error={error}
					placeholder="New Workflow Name"
					value={newWorkflowName}
					onChange={(e) => {
						console.log("this is event.",e);
						setNewWorkflowName(e.target.value)}}
					onKeyDown={(e) => {
						console.log("this is event.",e);
					}}
				/>
				<Button onClick={handleCreateWorkflow}>
					Create New Workflow
				</Button>
			</div>
			{!workflows.length && (
				<div className="w-full mt-[100px] h-full flex items-center justify-center">
					<h1 className="text-xl">Create new work flow </h1>
				</div>
			)}
			{!!workflows.length && (
				<div>
					<h2 className="text-xl">Existing Workflows</h2>
					<ul className="mt-5 flex flex-col gap-2">
						{workflows.map((workflow) => (
							<li
								onClick={() =>
									handleSelectWorkflow(workflow.id)
								}
								className="p-3 px-6 border cursor-pointer rounded border-border-color bg-background text-[16px]"
								key={workflow.id}
							>
								{workflow.name}
								<Button onClick={() => updateWorkflowName(workflow.id,workflow.name)}>update</Button>
								<Button onClick={() => deleteWorkflows(workflow.id)}>Delete</Button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
