import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items:[]
    },
    reducers : {
        addItem : (state,action)=>{
            state.items.push(action.payload);
            
        },
        removeItem : (state, action)=>{
            state.items = state.items.filter((item)=> item.id !== action.payload);
             
        },
        updateItem : (state, action)=>{
            const {id,updates} = action.payload;
            const index = state.items.findIndex(item=> item.id === id);
            if (index !== -1) {
                state.items[index] = {...state.items[index],...updates};
            }
        },
        setItem : (state, action)=>{
            state.items = action.payload
        }
    
    }
});

export const {addItem,removeItem,updateItem,setItem} = cartSlice.actions;

export default cartSlice.reducer;