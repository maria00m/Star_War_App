import { createSlice } from "@reduxjs/toolkit";

let counterSlice= createSlice({
    name:'counterSlice',
    initialState:{counter:0},
    reducers:{
        increase:()=>{
            console.log('increase');
            
        }
    }
})
export let counterReducer= counterSlice.reducer
export let {increase}= counterSlice.actions