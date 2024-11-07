import { createSlice } from "@reduxjs/toolkit";

export const quotesSlice = createSlice({
    name: 'quotes',
    initialState: {quotes: []},
    reducers: {
        setQuotes: (state,action) => {return action.payload}
    }
});

export const {setQuotes} = quotesSlice.actions;

export default quotesSlice.reducer;