import React from "react";
import ReactDOM from "react-dom/client";
import Todo from "./Todo";
import "./style.css";
import GridData from "./data_grid_table/GridData";
import React_grid from "./data_grid_table/React_grid";
import MultipleOptions from "./components/MultipleOptions";
import Table from "./react_table/Table";
import ReactDataTable from "./react_table/ReactDataTable";
import Crud from "./crudOperation/Crud";
import ReactTable from "./Mini_Project/ReactTable";
import "./index.css";
import { Provider } from "react-redux";
import appStore from "./appStore";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <div>
      {/* <Todo /> */}
      {/* <GridData/> */}
      {/* <React_grid/> */}
      {/* <MultipleOptions /> */}
      {/* <Table /> */}
      {/* <ReactDataTable/> */}
      {/* <Crud/> */}
      <ReactTable/> 
    </div>
  </Provider>
);
