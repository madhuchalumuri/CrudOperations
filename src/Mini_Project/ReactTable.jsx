import { AgGridReact } from "ag-grid-react";
import "@ag-grid-community/styles/ag-grid.css"; // this id the core CSS needed for the grid without this CSS  the grid will  not work
import "@ag-grid-community/styles/ag-theme-quartz.css";
import axios from "axios";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./ReactTable.css"
import { FaEdit, FaMoon, FaSearch, FaSun } from "react-icons/fa";
import { MdDelete, MdPreview } from "react-icons/md";
import { CiExport } from "react-icons/ci";
import { VscOpenPreview } from "react-icons/vsc";
import { IoCloseSharp, IoPersonAdd } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, setItem, updateItem,addItem } from "../cartSlice";
const ReactTable = () => {
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();
  const gridRef = useRef();
  const [pop,setPop] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [deleteParams, setDeleteParams] = useState(null);
  const [editParams, setEditParams] = useState(null);
  const [newRowData,setNewRowData] = useState({
    first_name : "",
    last_name : "",
    email : ""
  });
  const [gridHeight, setGridHeight] = useState(400);
  const rowData = useSelector((state)=>state.cart.items)
  const [colData, setColData] = useState([
    { field: "id", headerName: "SNO" },
    { field: "first_name", headerName: "First Name" },
    { field: "last_name", headerName: "Last Name" },
    { field: "email", headerName: "Email" },
    // { field: "gender", headerName: "Gender" },
    // { field: "age", headerName: "Age" },
    {
      headerName: "Actions", field:"id",
      cellRenderer: (params) => (
        <div className=" text-3xl flex gap-10" >
          <FaEdit className="cursor-pointer" onClick={()=>{showEditBtn(params)}}/>
          <MdDelete className="cursor-pointer" onClick={()=>{showDeleteBtn(params)}}/>
          
        </div>
      ),
    },
  ]);


  useEffect(() => {
    let fetchData = async () => {
      await axios
        .get("http://localhost:3000/dataTable")
        .then((res) => {
          dispatch(setItem(res.data));
        //   console.log(res.data);
        })
        .catch((err) => {
          console.log("data not found");
        });
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    // Adjust height every time the rowData changes
    adjustGridHeight(rowData.length);
    console.log("changed height")
  }, [rowData]);

  const adjustGridHeight = (rowCount) => {
    
    let newHeight;

      const rowHeight = 40; // Adjust row height based on your grid's row height
      newHeight = rowCount * rowHeight + 120; // Custom height for more than 10 rows
    // Set the calculated height
    setGridHeight(newHeight);
    console.log(rowCount)

  };

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
    };
  });
  const onFilterTextChange = useCallback((e) => {
    gridRef.current.api.setGridOption(
      "quickFilterText",
      document.getElementById("filter-text-box").value
    );
  }, []);
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);           
    adjustGridHeight(params.api.getDisplayedRowCount());
  };
  const onPaginationChanged = (params) => {
    if (params.api) {
      const pageSize = params.api.paginationGetPageSize();
      const totalRowCount = rowData.length;
      const currentPageRowCount = params.api.paginationGetRowCount();
      adjustGridHeight(Math.min(pageSize, totalRowCount, currentPageRowCount));
    }
  };

  
 
  const handleAdd = ()=>{

    if(!pop){
        setPop(true)
    }
    else{
        setPop(false)
    }
  }
  const closeForm = ()=>{
    setPop(false)
  }
  const addFormData =async (e)=>{
    e.preventDefault();
    let newlist = 
      {
        id : (rowData.length + 1),
        first_name : e.target.first_name.value,
        last_name : e.target.last_name.value,
        email : e.target.email.value
      }
    
      try{
        await axios.post("http://localhost:3000/dataTable", newlist);
        // setRowData([...rowData, newlist]);--------------
        dispatch(addItem(newlist));//----------------
        setPop(false);
        toast("Data is Added!");
      }catch(err){
        console.log("Error in adding data",err);
      }
  }

  const confirmDelete = async ()=>{
    if(deleteParams){
      try{  
        console.log("112",deleteParams.data.id)
        await axios.delete(`http://localhost:3000/dataTable/${deleteParams.data.id}`);
        // const filterData = rowData.filter((row)=> row.id  !==deleteParams.data.id);
        // setRowData(filterData)-------------
        dispatch(removeItem(deleteParams.data.id))
        setDeleteParams(null);
        toast("Row is Successfully deleted..")
      }
      catch{
        console.log("115")
      }
    }
  }

  const cancelDelete = (()=>{
      setDeleteParams(null);
    
  })
  const showEditBtn = (params)=>{
    console.log("edit clicked",params);
    setEditParams(params);
    setNewRowData({
      first_name : params.data.first_name,
      last_name : params.data.last_name,
      email : params.data.email
    });
    setPop(true)
   
    
  }
  const showDeleteBtn = (params)=>{
    console.log("delete clicked",params);
    setDeleteParams(params);
   
  }
  const updateForm = async (e)=>{
    e.preventDefault();
    console.log("145",editParams.data)
    const updatedRow = {
      ...editParams.data,first_name : newRowData.first_name,
      last_name : newRowData.last_name,
      email : newRowData.email
    }
    try{
      await axios.put(`http://localhost:3000/dataTable/${editParams.data.id}`, updatedRow);
      // const updatedEditRow = (rowData.map((row)=> (row.id === editParams.data.id ? updatedRow : row) ))
      // setRowData(updatedEditRow)
      dispatch(updateItem({id:editParams.data.id,updates :updatedRow}))
      setPop(false);
      setEditParams(null) 
      toast("Data is updated successfully")
      
    }
    catch(err){
      console.log("Error in updating data",err);
    }
  }
  const onInputChange = (e)=>{

    setNewRowData({...newRowData,[e.target.name]: e.target.value})
  }
  const onBtnExport = useCallback(()=>{
    gridRef.current.api.exportDataAsCsv()
  },[])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
   <div className="container-fluid w-screen h-screen relative flex justify-center  bg-slate-100 dark:bg-gray-800">
      <div className="h-screen w-screen flex flex-col justify-center items-center">
          <div className="w-[80vw] flex justify-between items-center px-10  ">
          <span className="flex justify-end items-center text-3xl gap-6  ">

           <span className="border-2 flex justify-center items-center  bg-slate-50 border-b-fuchsia-400">
              <input className=" border-b-2  rounded-none text-[16px] w-56  shadow-2xl"
                type="text"
                placeholder="Quick Filter"
                name=""
                id="filter-text-box"
                onChange={onFilterTextChange}
              />
              <FaSearch  className="text-xl bg-slate-50 dark:text-black sm:text-red-700 "/>

           </span>
            <span><CiExport className="text-3xl cursor-pointer  dark:text-white " id="exportCsv" onClick={onBtnExport} /></span>
          </span>
            <div className="flex justify-center items-center text-3xl">
            <span onClick={toggleDarkMode} className="mr-3 cursor-pointer">
                {darkMode ?<FaSun  className="text-white"/> : <FaMoon /> }
                </span>
               <span className=""><IoPersonAdd className="text-3xl cursor-pointer dark:text-white" onClick={handleAdd}/></span>
               {
                pop?<form className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col gap-8 bg-white w-96 h-96 drop-shadow-2xl " onSubmit={!editParams ?(e)=>{ addFormData(e)}:(e)=>{ updateForm(e)}}>
                <IoCloseSharp className="absolute top-4 right-5 cursor-pointer " onClick={closeForm} />
                <input className="border-2 border-b-2 border-b-fuchsia-400 rounded-none text-[16px] w-56 bg-slate-50 shadow-2xl  " type="text" name="first_name" onChange={onInputChange} id="" value={newRowData.first_name} placeholder="First Name" />
                <input className="border-2 border-b-2 border-b-fuchsia-400 rounded-none text-[16px] w-56 bg-slate-50  shadow-2xl " type="text" name="last_name" onChange={onInputChange} id="" value={newRowData.last_name} placeholder="Last Name" />
                <input className="border-2 border-b-2 border-b-fuchsia-400 rounded-none text-[16px] w-56 bg-slate-50 shadow-2xl  " type="email" name="email" onChange={onInputChange} id="" value={newRowData.email} placeholder="Email" />
                <input className="bg-blue-600 text-white text-xl w-52 h-10 hover:drop-shadow-2xl cursor-pointer " type="submit" value={!editParams?"Add":"Update"} />
           </form> : ""
               }
      
            </div>
        
          </div>
        {rowData.length > 0 ? (
         <div className="ag-theme-quartz" style={{width:"100%", height:
          `${gridHeight}px`}} >
              <AgGridReact className=""
                ref={gridRef}
                onGridReady={onGridReady}
                rowData={rowData}
                columnDefs={colData}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={10}
                paginationPageSizeSelector={[5,10,15,20]}
                onPaginationChanged={onPaginationChanged}
              />
         </div>
        ) : (
          <p>Empty</p>
        )}
        {
          deleteParams && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-4  bg-white w-80 h-80 drop-shadow-2xl ">
                <IoCloseSharp className="absolute top-4 right-5 cursor-pointer text-2xl " onClick={cancelDelete} />
               <p className="text-xl "> Are you sure you want to delete</p>
              <div className="flex gap-4" >
                <button className="bg-purple-600 w-32 h-10 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50" onClick={confirmDelete}>Confirm</button>
                <button className="w-28 h-10 hover:bg-slate-200" onClick={cancelDelete}>Cancel</button>
              </div>
            </div>
          )
        }
      </div>
      <ToastContainer />
   </div>
   </div>
  );
};

export default ReactTable;
