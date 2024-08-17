import { Delete } from '@mui/icons-material';
import { TableCell, TableContainer, TableHead,Table, TableBody, TableRow, Paper } from '@mui/material';
import React, { useState } from 'react'
import EditNoteIcon from '@mui/icons-material/EditNote';
import "./style.css"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, updateItem } from './cartSlice';
const Todo = () => {
  const [state,setState] = useState("")
  const [items,setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const dispatch = useDispatch();
  const changeHandler = (e)=>{
    setState(e.target.value);
  }
  const submitHandler = (e)=>{
    e.preventDefault();
    if(editIndex === -1){ 
      // setItems([...items,state])   
      toast("Item is Added..")
      dispatch(addItem(state));

    }
    else{
      const updateItems = [...cartItems];
      console.log("29",updateItems)

      updateItems[editIndex] = state;
      // setItems(updateItems);
      dispatch(updateItem(updateItems));
      setEditIndex(-1);
    toast("Item is Updated..")

    }
    setState("");


  }
  const deleteItem = (index)=>{
    dispatch(removeItem(index));
    toast("Item is deleted..")
  }
  const editItem = (index)=>{
    console.log(index, editIndex)
    setEditIndex(index);
    setState(cartItems[index]);
    

  }
  const cartItems = useSelector((store)=>store.cart.items)
  console.log(cartItems)

  
  return (
    
   <div  style={{backgroundColor:"grey" , height:"100vh" ,paddingTop:"10px"}}>
      <div style={{display:"flex", justifyContent:"center", alignItems:"center",flexDirection: "column", gap:"20px"}}>
          <form onSubmit={submitHandler}>
            <input type='text' placeholder='Enter your Task..' value={state} onChange={changeHandler} style={{padding:"8px", width:"250px", outline:"none"}} />
            <input  type='submit' value="Add" style={{padding:"10px", width:"100px", marginLeft:"30px", borderRadius:"20px", border:"none", background:"blue", fontSize:"20px", color:"white", cursor:"pointer"}}/>
            <span>Cart - {cartItems.length}</span>
            
          </form>
          <TableContainer sx={{border: 2, width:"500px",height:"auto"}}  component={Paper }>
            <Table >
              <TableHead sx={{}}>
                <TableCell>S.no </TableCell>
                <TableCell>Name Of the Task</TableCell>
                <TableCell>Delete</TableCell>
                <TableCell>Edit</TableCell>
              </TableHead>
              <TableBody>
                {
                  cartItems.map((item,index)=>{
                    return (
                      <TableRow className='table' key={index}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{item}</TableCell>
                        <TableCell> <Delete style={{cursor:"pointer"}} onClick={()=>{deleteItem(index)}}/> </TableCell>
                        <TableCell><EditNoteIcon style={{cursor:"pointer"}} onClick={()=>{editItem(index)}}/> </TableCell>
                      </TableRow>
                    )  
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
               
      </div>
      <ToastContainer/>
   </div>


  )
}

export default Todo