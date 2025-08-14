import { createStore } from "redux";
import { storeReducer } from "../redux.reducer/store.reducer";

let store = createStore(storeReducer);

/*
let store = createStore({
    reducer: storeReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV === "development" ? true : false
})
    */

export default store;
