import React from 'react';
import './HeaderStyle.css';

import { ReactComponent as Logo } from 'assets/svg/logo.svg';
import Button from 'components/Button';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveWorkflow } from 'store/workflowSlice';
import { getState } from 'store/store';

const Header = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const handleSaveWorkflow = () => {
		const nodes = getState().nodes;
		const edges = getState().edges;

		if (params.workflowId) {
			dispatch(saveWorkflow({ nodes, edges }));
		}
	};
	return (
		<header>
			<div className="navigation">
				<Logo />
				<ul>
					<li>
						<Button>VIEW</Button>
					</li>
					<li>
						<Button>HELP</Button>
					</li>
				</ul>
			</div>
			{params.workflowId && (
				<Button onClick={handleSaveWorkflow}>Save Workflow</Button>
			)}
		</header>
	);
};

export default Header;
