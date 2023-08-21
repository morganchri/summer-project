
import './App.css';
import React from "react";
import Main from "./main";
import {HashRouter, Navigate} from "react-router-dom";
import {Routes, Route} from "react-router";
import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./main/reducers/auth-reducer";
import {Provider} from "react-redux";
import ownedReducer from "./main/services/owned-reducer";
import ownersReducer from "./main/services/owners-reducer";
import likesReducer from "./main/services/likes-reducer";
import allLikesReducer from "./main/services/allLikes-reducer"
const store = configureStore(
    {
        reducer: {
            user:  authReducer, ownedStocks: ownedReducer, stockOwners: ownersReducer, likes: likesReducer, allLikes: allLikesReducer}});

function App() {

  return (
      <Provider store={store}>
          <HashRouter>
            <div className={"container"}>
              <Routes>
                  <Route path="/" element={<Navigate to={"/home"} />}></Route>
                  <Route path="/*" element={<Main/>}></Route>
              </Routes>
            </div>
          </HashRouter>
      </Provider>

  );
}

export default App;
