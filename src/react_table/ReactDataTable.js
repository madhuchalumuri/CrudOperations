import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import MockData from "./MOCK_DATA.json";
import "./ReactDataTable.css"
import { colors } from "@mui/material";
const ReactDataTable = () => {
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "First Name",
      selector: (row) => row.first_name,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.last_name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
    },
  ];
  const data = useMemo(() => MockData, []);
  const [tableData, setTableData] = useState(data);

  const handleChange = (e) => {
    let inputValue = e.target.value.toLowerCase();
    const newTableData = data.filter((row) => {
      return (
        row.first_name.toLowerCase().includes(inputValue) ||
        row.last_name.toLowerCase().includes(inputValue) ||
        row.email.toLowerCase().includes(inputValue) ||
        row.age.toString().includes(inputValue) ||
        row.gender.toLowerCase().includes(inputValue)
      );
    });
    setTableData(newTableData);
    console.log(tableData);
  };

  const customStyles = {
    rows : {
      style : {
        backgroundColor : "#f2f2f2",
      }
    },
  
  headCells : {
    style : {
      backgroundColor : "blue",
      color : "white",
      fontSize : "20px",
      fontWeight : "700"
    }
  },
  
}

  return (
    <div>
      <span className="inputField">
        <label>Quick Filter</label>
        <input type="text" onChange={handleChange} placeholder="Filter .." />
      </span>
      <DataTable className="dataTable"
        columns={columns}
        data={tableData}
        pagination
        fixedHeader
        customStyles={customStyles}
      ></DataTable>
    </div>
  );
};

export default ReactDataTable;
