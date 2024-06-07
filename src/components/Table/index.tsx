import React, { useState } from 'react';

import './TableStyle.css';
import { ReactComponent as SvgArrow } from 'assets/svg/arrow.svg';
import { TableRow } from 'store/workflowSlice';

interface TableProps {
	data: TableRow[];
}

const Table: React.FC<TableProps> = ({ data }) => {
	const [sortConfig, setSortConfig] = useState<{
		key: string;
		direction: 'ascending' | 'descending';
	} | null>(null);

	const sortedData = React.useMemo(() => {
		let sortableData = [...data];
		if (sortConfig !== null) {
			sortableData.sort((a, b) => {
				if (a[sortConfig.key] < b[sortConfig.key]) {
					return sortConfig.direction === 'ascending' ? -1 : 1;
				}
				if (a[sortConfig.key] > b[sortConfig.key]) {
					return sortConfig.direction === 'ascending' ? 1 : -1;
				}
				return 0;
			});
		}
		return sortableData;
	}, [data, sortConfig]);

	const requestSort = (key: string) => {
		let direction: 'ascending' | 'descending' = 'ascending';
		if (
			sortConfig &&
			sortConfig.key === key &&
			sortConfig.direction === 'ascending'
		) {
			direction = 'descending';
		}
		setSortConfig({ key, direction });
	};

	return (
		<>
			{data.length > 0 && (
				<table className="custom-table">
					<thead>
						<tr>
							{Object.keys(data[0]).map((key) => (
								<th key={key} onClick={() => requestSort(key)}>
									<div className="table-heading-col">
										<span>{key}</span> <SvgArrow />
									</div>
								</th>
							))}
						</tr>
					</thead>

					<tbody>
						{sortedData.map((row, index) => (
							<tr key={index}>
								{Object.values(row).map((cell, i) => (
									<td key={i}>{cell}</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			)}
		</>
	);
};

export default Table;
