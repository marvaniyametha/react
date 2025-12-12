import { combineReducers } from "redux";
import { blogReducer } from "./reduser";
import { authReducer } from "./authencatioReduser";

export const rootReducer = combineReducers({

  authReducer,
  blogReducer,
});
