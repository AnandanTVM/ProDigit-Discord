import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  clientDetails: "",
};

const singupSlice = createSlice({
  name: "admindetails",
  initialState: INITIAL_STATE,
  reducers: {
    ClientLoginInfo: (state, action) => {
      let { clientDetails } = state;

      clientDetails = action.payload;

      return { ...state, clientDetails };
    },
    clearClientLoginDetails: (state, action) => {
      let { clientDetails } = state;

      clientDetails = false;

      return { ...state, clientDetails };
    },
  },
});

export const { ClientLoginInfo, clearClientLoginDetails } = singupSlice.actions;
//reducer export to a store
export default singupSlice.reducer;
