import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
