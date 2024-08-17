import React, { useMemo } from "react";
import MOCK_DATA from "./MOCK_DATA.json";
import { useTable, useSortBy, useGlobalFilter , usePagination} from "react-table";
import "./table.css";
// import { SetFilter } from "ag-grid-enterprise";
const Table = () => {
  const COLUMNS = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "First Name",
      accessor: "first_name",
    },
    {
      Header: "Last Name",
      accessor: "last_name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Gender",
      accessor: "gender",
    },
    {
      Header: "Age",
      accessor: "age",
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);


  const tableData = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,

  );

  const { getTableProps, getTableBodyProps, headerGroups, page,nextPage, previousPage , canNextPage, canPreviousPage, pageOptions, setPageSize , prepareRow ,state : {globalFilter,pageIndex, pageSize} ,setGlobalFilter} =
    tableData;
  // getTableProps : - it is a function which needs to be destructure on the table tag

  //filtering 
  
  
    return (
    <div>
      <span>
        <label>Quick Filter</label>
        <input type="text"  value={globalFilter || ""} onChange={(e)=> setGlobalFilter(e.target.value)} placeholder="filter .." />
      </span>
      <table className="table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span> {column.isSorted ? (column.isSortedDesc ?" ⬇️" : " ⬆️"):""} </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <select className="pageSize" value={pageSize} onChange={(e)=> setPageSize(Number(e.target.value))}>
          {
            [10,20,30,40,50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize} 
                </option>
              
    ))}
        </select>
        <span>
          Page {pageIndex +1} of  {pageOptions.length}
        </span>
        <button onClick={()=>{previousPage()}} disabled = {!canPreviousPage} >
          Previous Page
        </button>
        <button onClick={()=>{nextPage()}} disabled={!canNextPage} >
          Next page
        </button>
      </div>
    </div>
  );
};

export default Table;
