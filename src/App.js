
import './App.css';
import React from "react";
import Main from "./main";
import {HashRouter, Navigate} from "react-router-dom";
import {Routes, Route} from "react-router";
import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./main/reducers/auth-reducer";
import {Provider} from "react-redux";
const store = configureStore(
    {
        reducer: {
            user:  authReducer}});

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
