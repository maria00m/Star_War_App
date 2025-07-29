// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// // 1. First define your async thunk separately
// export const getAllCharacters = createAsyncThunk(
//   'charactersSlice/getAllCharacters',
//   async () => {
//     const response = await fetch('https://swapi.dev/api/people/');
//     console.log("before fetching==============>", response);
    
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return await response.json();
//   }
// );

// // 2. Then define your initial state
// const initialState = {
//   allCharacters: [],
//   isLoading: false,
//   isError: null
// };

// // 3. Create your slice
// const charactersSlice = createSlice({
//   name: 'charactersSlice',
//   initialState,
//   reducers: {
//     // your synchronous reducers here
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getAllCharacters.pending, (state) => {
//         console.log("Characters fetch pending...");
//         state.isLoading = true;
//         state.isError = null;
//       })
//       .addCase(getAllCharacters.fulfilled, (state, action) => {
//         console.log("Characters fetch successful!");
//         state.isLoading = false;
//         state.allCharacters = action.payload.results;
//       })
//       .addCase(getAllCharacters.rejected, (state: any, action) => {
//         console.log("Characters fetch failed:", action.payload);
//         state.isLoading = false;
//         state.error = action.payload as string;
//       });
//     //   .addCase(getAllCharacters.rejected, (state, action) => {
//     //     state.isLoading = false;
//     //    state.isError= state.error.message
//     //   });
//   }
// });

// // 4. Export the reducer (note the correct variable name)
// export const charactersReducer = charactersSlice.reducer;