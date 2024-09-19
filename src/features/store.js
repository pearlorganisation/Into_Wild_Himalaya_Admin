import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { encryptTransform } from "redux-persist-transform-encrypt";

import trek from "./slices/trek";
import activity from "./slices/activity";
import product from "./slices/product";
import booking from "./slices/booking";




// Combine your individual reducers here
const rootReducer = combineReducers({
  trek,
  activity,
  product,
  booking
});


  // Custom root reducer handling a clear action
const rootReducerWithClear = (state, action) => {
    if (action.type === "wildHimalayas/clearReduxStoreData") {
      state = undefined;
      localStorage.clear();
      sessionStorage.clear();
    }
    return rootReducer(state, action);
  };  

  
// Redux-persist configuration
const persistConfig = {
    key: "WildHimalayasClientPanle",
    version: 1,
    storage,
    transforms: [
      encryptTransform({
        secretKey: `${import.meta.env.VITE_APP_REDUX_PERSIST_SECRET_KEY}`,
        onError: (err) => {
          // Handle encryption errors if any
        },
      }),
    ],
  }; 

  
// Persisted root reducer
const persistedReducer = persistReducer(persistConfig, rootReducerWithClear);

// Configure and create the Redux store
const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.VITE_APP_WORKING_ENVIRONMENT !== "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;  