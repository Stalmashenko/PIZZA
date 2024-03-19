import { useMemo } from 'react';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function Grid({rowData, columnDefs}: AgGridReactProps) {
	const defaultColDef = useMemo(() => ({
		sortable: true,
		filter: true,
		resizable: true
	}), []);

	return (
		<div className='ag-theme-alpine' style={{ height: 300, width: 650}}>
			<AgGridReact 
				rowData={rowData}
				columnDefs={columnDefs}
				defaultColDef={defaultColDef}
			/>
		</div>
	);
}

export default Grid;