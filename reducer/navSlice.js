import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  musicData: [],
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setMusicData: (state, action) => {
      state.musicData = action.payload;
    },
    
  },
});

///// destructuring the action
export const { setMusicData } =
  navSlice.actions;

/// selectors
export const selectMusicData = (state) => state.nav.musicData;


export default navSlice.reducer;
