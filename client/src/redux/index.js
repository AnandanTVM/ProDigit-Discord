import { combineReducers } from "@reduxjs/toolkit";

import adminReducer from "./adminReducer";

export default combineReducers({
  admin: adminReducer,
});
