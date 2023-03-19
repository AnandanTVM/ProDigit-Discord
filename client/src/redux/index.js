import { combineReducers } from "@reduxjs/toolkit";

import clientReducers from "./clientReducers";
export default combineReducers({
  client: clientReducers,
});
