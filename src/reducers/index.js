import { combineReducers } from "redux";
import { modalReducer } from "./modalReducer";
import { userReducer } from "./userReducer";

export default combineReducers({
  user: userReducer,
  modal: modalReducer,
});
