import React, { useState } from 'react'
import "../react_table/table.css"
const Crud = () => {

  
    const [state,setState] = useState({
        username:"",
        age:"",
    });
    const {username,age} = state;

    const [list,setList] =useState([]);
    const [editIndex,setEditIndex] = useState(-1)

    
    const changleHandler = ((e)=>{
        setState({...state,[e.target.name]:e.target.value})
       
    })
    const onAdd = ()=>{
            
            // let newList = 
            //     {
            //         id: "",
            //         name: "",
            //         active : false,
            //     }
            
             const updateList = list.map((item, index) => {
                if (index === editIndex) {
                    return {
                        ...item,
                        name: username,
                        age: age,
                    };
                }
                return item;
            });

             setList(updateList);
            setEditIndex(-1);
        
        setState({username:"",age:""})      
    }

    const deleteData = (index)=>{
        const updateList = list.filter((data,listIndex)=>{
            return  index !== listIndex
        })
        setList(updateList);
    }
    const editData = (index)=>{
        setEditIndex(index);
        setState({
            username:list[index].name,
            age:list[index].age,
        })
        console.log(list[index])

    }
    const sendData = ()=>{
        console.log(list)
    }

  return (
    <div className='crud'>
        <form onSubmit={onAdd}>
            <input type='text' name='username' placeholder='Enter username' value={username} onChange={changleHandler} />
            <input type='text' name='age' placeholder='Enter age' value={age} onChange={changleHandler}/>
            <input type='submit'className='btn' value='Add' />
        </form>
       { list.length > 0 ?  <table className='table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    
                    <th>Active</th>
                </tr>
            </thead>
            <tbody>
               {
                 list.map((data,index)=>{
                    return (
                        <tr key={index}>
                            <td>{data.id}</td>
                            <td>{data.name}</td>
                            <td>{data.active}</td>
                            <td> 
                                {/* <button onClick={(e)=>editData(index)} >Edit</button> */}
                                <button onClick={(e)=>deleteData(index)} >Delete</button>
                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table> : null
        }
        <button onClick={sendData}>Submit</button>
    </div>
  )
}

export default Crud