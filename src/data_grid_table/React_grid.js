import React, { useMemo, useState, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "@ag-grid-community/styles/ag-grid.css"; // this id the core CSS needed for the grid without this CSS  the grid will  not work
import "@ag-grid-community/styles/ag-theme-quartz.css";
import "../style.css";
// import "ag-grid-enterprise"
// import MyFilter from "./MyFilter";
import MultiSelect from "../components/MultiSelect";
const React_grid = () => {
  const gridRef = useRef();
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = ["madhu", "Ganesh", "Ramu", "Ganeshesh"];
  const handleSelectionChange = (newSelectedOptions) => {
    setSelectedOptions(newSelectedOptions);
  };
  const [rowData, setRowData] = useState([
    { id: 1, col1: "Alice", col2: "Johnson", col3: 23, col4: 30000 },
    { id: 2, col1: "Bob", col2: "Smith", col3: 24, col4: 32000 },
    { id: 3, col1: "Charlie", col2: "Brown", col3: 30, col4: 25000 },
    { id: 4, col1: "David", col2: "Williams", col3: 12, col4: 20000 },
    { id: 5, col1: "Eve", col2: "Davis", col3: 35, col4: 15000 },
  ]);

  const [colData, setColData] = useState([
    {
      field: "id",
      headerName: "SNO",
      cellEditor: "agSelectCellEditor",
      cellEditorParams: { values: [1, 2, 3, 4, 10] },
      minWidth: 100,
      maxWidth: 200,
    },
    { field: "col1", headerName: "First Name", minWidth: 150, maxWidth: 250 },
    { field: "col2", headerName: "Last Name", minWidth: 150, maxWidth: 250 },
    {
      valueGetter: (p) => {
        return p.data.col1 + " " + p.data.col2;
      },
      headerName: "Full Name",
      minWidth: 150,
      maxWidth: 250,
    },
    { field: "col3", headerName: "Age", minWidth: 150, maxWidth: 250 },
    {
      valueFormatter: (p) => {
        return "Rs. " + p.data.col4.toLocaleString();
      },
      headerName: "Salary",
      cellClassRules: {
        green: (p) => {
          return p.data !== "";
        },
      },
      minWidth: 150,
      maxWidth: 250,
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      // filter: MyFilter,
      // floatingFilter: true,
      editable: true,
      sortable :true,
    };
  });

  const rowClassRules = useMemo(
    () => ({
      "odd-row": (p) => p.node.rowIndex % 2 !== 0,
      "even-row": (p) => p.node.rowIndex % 2 === 0,
    }),
    []
  );

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setGridOption(
      "quickFilterText",
      document.getElementById("filter-text-box").value
    );
  }, []);

  return (
    <div style={{ height: "500px", margin: "45px" }}>
      <MultiSelect
        options={options}
        selectedOptions={selectedOptions}
        onChange={handleSelectionChange}
      />

      <div className="inputField">
        <h2>Quick Filter</h2>
        <input
          type="search"
          placeholder=" Quick Filter"
          style={{ boxShadow: "-1px -1px 2px 1px rgba(0,0,0,0.9)" }}
          id="filter-text-box"
          onInput={onFilterTextBoxChanged}
        />
      </div>
      <AgGridReact
        className="ag-theme-quartz"
        style={{ height: "300px" }}
        ref={gridRef}
        rowGroupPanelShow="always"
        rowClassRules={rowClassRules}
        rowData={rowData}
        columnDefs={colData}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={5}
        paginationPageSizeSelector={[1, 2, 3, 4, 5]}
        onGridReady={onGridReady}
      />
    </div>
  );
};

export default React_grid;
