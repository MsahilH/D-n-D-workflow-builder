import React from 'react';
import './SidePanelStyle.css';
import Button from 'components/Button';
import { useDispatch } from 'react-redux';
import { addNode } from 'store/nodeSlice';

const SidePanel = () => {
	const dispatch = useDispatch();

	const handleAddNode = (type: string) => {
		const newNodeId = `node-${Date.now()}`;
		dispatch(
			addNode({
				id: newNodeId,
				type,
				data: [],
				position: { x: 100, y: 100 },
				selectedFile: null,
			}),
		);
	};
	return (
		<aside className="side-panel flex flex-col gap-6 text-left">
			<div className="flex flex-col gap-5 border border-border-color p-3">
				<h4 className="text-lg">Input</h4>
				<Button
					className="text-left"
					onClick={() => handleAddNode('FileNode')}
				>
					Add File Node
				</Button>
			</div>

			<div className="flex flex-col gap-5 border border-border-color p-3">
				<h4 className="text-lg">Transformer Nodes</h4>
				<div className="flex flex-col gap-5">
					<Button
						className="text-left"
						onClick={() => handleAddNode('FilterNode')}
					>
						Add Filter Node
					</Button>
				</div>
				<div className="flex flex-col gap-5">
					<Button
						className="text-left"
						onClick={() => handleAddNode('ReduceNode')}
					>
						Add Reduce Node
					</Button>
				</div>
				<div className="flex flex-col gap-5">
					<Button
						className="text-left"
						onClick={() => handleAddNode('FilterNode')}
					>
						Add Find Node
					</Button>
				</div>
				<div className="flex flex-col gap-5">
					<Button
						className="text-left"
						onClick={() => handleAddNode('MapNode')}
					>
						Add Map Node
					</Button>
				</div>
			</div>
		</aside>
	);
};

export default SidePanel;
