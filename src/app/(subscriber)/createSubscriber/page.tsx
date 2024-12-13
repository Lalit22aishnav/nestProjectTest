'use client'
import React, { useRef, useState } from "react";
// Theme
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

// Row Data Interface
interface IRow {
  id: number;
  course: string;
  univercity: string;
  percentage: string;
}

// Create new GridExample component
const GridExample = () => {
  // Initial row data
  const [rowData, setRowData] = useState<IRow[]>([
    { id: 1, course: "", univercity: "", percentage: "0"},
  ]);

  const gridRef = useRef<AgGridReact>(null);


  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState<ColDef[]>([
    { field: "id", headerName: "ID", sortable: true, },
    { field: "course", headerName: "Course", editable: true },
    { field: "univercity", headerName: "Univercity", editable: true },
    { field: "percentage", headerName: "Percentage", editable: true,valueFormatter:(params)=>{
      return `${params.value}%`;
    } },
    {
      headerName: "Actions",
      cellRenderer: (params: any) => {
        const handleEdit = () => alert(`Editing Row ID: ${params.data.id}`);
        const handleDelete = () =>
          setRowData((prev) => prev.filter((row) => row.id !== params.data.id));

        return (
          <div >
            <button onClick={handleEdit} style={{ marginRight: "10px" }}> ✏️</button>
            <button onClick={handleDelete}>🗑️</button>
          </div>
        );
      },
    },
  ]);

  // Add a new row
  const handleAddRow = () => {
    const newRow: IRow = {
      id: rowData.length + 1,
      course: "",
      univercity: "",
      percentage: "0",
    };
    setRowData([...rowData, newRow]);
  };

  const getAllGridData = () => {
    const allData: IRow[] = [];
    gridRef.current?.api.forEachNode((node) => {
      allData.push(node.data);
    });
    console.log(allData); // Log all grid data
    alert(JSON.stringify(allData, null, 2)); // Display data in an alert
  };

  // Container: Defines the grid's theme & dimensions.
  return (
    <div style={{ width: "100%", height: "100%" }}>

      <form action="">

          

      </form>

      <button onClick={handleAddRow} style={{ marginBottom: 10 }}>
        Add Row
      </button>
      <button onClick={getAllGridData} style={{ marginBottom: 10, marginLeft: 10 }}>
        Get All Data
      </button>
      <div className="ag-theme-alpine" style={{ height: 250, width: "100%" }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={{ flex: 1, sortable: true }}
        />
      </div>
    </div>
  );
};

export default GridExample;