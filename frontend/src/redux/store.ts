import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  applyMiddleware,
  legacy_createStore as createStore,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import authReducer from "./features/slices/auth-slice";
import gradeReducer from "./features/slices/grade-slice";
import logoutReducer from "./features/slices/logout-slice";
import studentValidationReducer from "./features/slices/student-validation-slice";
import thunk from "redux-thunk";

const middleware = [...getDefaultMiddleware(), thunk];

export const store = configureStore({
  reducer: {
    authReducer,
    gradeReducer,
    logoutReducer,
    studentValidationReducer,
  },
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
