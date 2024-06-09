import Button from 'components/Button';
import DynamicInput from 'components/Form/DynamicInput';
import { Conditions, conditionOptions } from 'constants/conditionConstant';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import {
	processData,
	removeNode,
	setFilteredNodeData,
	setNodeData,
	setSelectedNodeData,
} from 'store/nodeSlice';
import { RootState } from 'store/store';
import { TableRow } from 'store/workflowSlice';
import { findDeepestData } from 'utils/findDeepData';

const handleStyle = {
	height: '100%',
	borderRadius: '0 10px 10px 0',
	backgroundColor: '#6866ac',
	border: '0',
	width: '25px',
	right: '-24px',
};

const targetStyle = {
	borderRadius: '8px 0px 0px 8px',
	backgroundColor: '#6866ac',
	width: '15px',
	height: '18px',
	border: '0',
	left: '-15px',
};

interface ColumnOption {
	value: string;
	label: string;
}

const ReduceNode = ({ data, ...res }: any) => {
	const updateNodeInternals = useUpdateNodeInternals();
	const selectedNode = useSelector(
		(state: RootState) => state.nodes.selectedNodeData,
	);
	const nodeData = useSelector((state: RootState) => state.nodes.nodesData);
	const currentNode = nodeData.find((node) => node.id === res.id);
	const [filterData, setFilterData] = useState<processData>(
		currentNode?.filterData || {
			column: 'select column',
			condition: 'condition',
			value: 'select Value',
		},
	);
	const [columnsOptions, setColumnsOptions] = useState<ColumnOption[]>([]);
	const [valueOptions, setValueOptions] = useState<ColumnOption[]>([]);

	const dispatch = useDispatch();

	const handleRemoveNode = () => {
		dispatch(removeNode(data.id));
	};

	useEffect(() => {
		const deepData = findDeepestData(data);
		if (deepData.length > 0) {
			const firstRow = deepData[0];
			const columnNames = Object.keys(firstRow);
			const formattedColumns = columnNames.map((column) => ({
				value: column,
				label: column,
			}));
			setColumnsOptions(formattedColumns);
		}
	}, [data]);

	useEffect(() => {
		updateNodeInternals(data.id);
	}, [data, updateNodeInternals]);

	const handleColumnChange = (
		event: React.ChangeEvent<HTMLSelectElement>,
	) => {
		const value = event.target.value;
		setFilterData((prev:any) => ({
			...prev,
			column: value,
		}));

		const deepData = findDeepestData(data);
		const columnValues = deepData.map((row: any) => row[value]);
		const uniqueValues = Array.from(new Set(columnValues));
		const formattedValues = uniqueValues.map((val) => ({
			value: val as string,
			label: val as string,
		}));

		setValueOptions(formattedValues);
	};
	const handleConditionChange = (
		event: React.ChangeEvent<HTMLSelectElement>,
	) => {
		const value = event.target.value;
		setFilterData((prev:any) => ({
			...prev,
			condition: value,
		}));
	};

	const handleValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		setFilterData((prev: any) => ({
			...prev,
			value: value,
		}));
	};

	const runFilter = () => {
		const { column, condition, value } = filterData;

		if (
			!column ||
			column === 'select column' ||
			!condition ||
			condition === 'condition' ||
			!value ||
			value === 'select Value'
		)
			return;
		const deepData = findDeepestData(data);
		if (!deepData.length) return;
		const filteredData = deepData.filter((row: any) => {
			switch (condition) {
				case Conditions.IS_EQUAL:
					return row[column] === value;
				case Conditions.IS_NOT_EQUAL_TO:
					return row[column] !== value;
				case Conditions.INCLUDES:
					return row[column].includes(value);
				case Conditions.DOES_NOT_INCLUDE:
					return !row[column].includes(value);
				default:
					return false;
			}
		});

		const updatedNodeData = {
			...selectedNode,
			id: selectedNode?.id ?? '',
			type: selectedNode?.type ?? '',
			position: selectedNode?.position ?? { x: 0, y: 0 },
			selectedFile: selectedNode?.selectedFile ?? null,
			data: filteredData as TableRow[],
		};
		dispatch(setSelectedNodeData(updatedNodeData));
		dispatch(
			setFilteredNodeData({
				id: data.id,
				filterData,
			}),
		);
	};

	return (
		<div className="bg-background border relative w-[200px] border-workflow-color">
			<div className="py-2 px-3 border-b border-border-color flex items-center justify-between">
				Reduce <Button onClick={handleRemoveNode}>X</Button>
			</div>
			<div className="py-2 flex flex-col gap-3 px-3 border-b border-border-color">
				<div>
					<DynamicInput
						type="select"
						options={columnsOptions}
						placeholder={filterData.column}
						onChange={handleColumnChange}
					/>
				</div>
				<div>
					<DynamicInput
						type="select"
						options={conditionOptions}
						placeholder={filterData.condition}
						onChange={handleConditionChange}
					/>
				</div>
				<div>
					<DynamicInput
						type="select"
						options={valueOptions}
						placeholder={filterData.value}
						onChange={handleValueChange}
					/>
				</div>

				<Button variant="solid" onClick={runFilter}>
					Run
				</Button>
			</div>
			<Handle
				style={targetStyle}
				type="target"
				position={Position.Left}
				id={`FilterData-target-${data.id}`}
			/>
			<Handle
				type="source"
				style={handleStyle}
				position={Position.Right}
				id={`FilterData-source-${data.id}`}
			/>
		</div>
	);
};

export default ReduceNode;
