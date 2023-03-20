import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  clientDetails: "",
  selecteduserdetails: "",
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
    getChatUserDetails: (state, action) => {
      let { selecteduserdetails } = state;
      selecteduserdetails = action.payload;
      return { ...state, selecteduserdetails };
    },
  },
});

export const { ClientLoginInfo, getChatUserDetails, clearClientLoginDetails } =
  singupSlice.actions;
//reducer export to a store
export default singupSlice.reducer;
