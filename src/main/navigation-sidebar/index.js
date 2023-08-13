import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from "react-router-dom";
import {Provider, useSelector} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../reducers/auth-reducer";

const NavigationSidebar = () => {
    const { currentUser } = useSelector((state) => state.user);

    const { pathname } = useLocation();
    const [ignore ,active] = pathname.split("/");
    const links = ["home","portfolio","notifications", "likes", "lists", "profile","more"];
    const icons = [<i className="fa fa-home"></i>,
                   <i className="fas fa-coins"></i>,
                   <i className="fa fa-bell"></i>,
                   <i className="far fa-heart"></i>,
                   <i className="fa fa-list"></i>,
                   <i className="fa fa-user"></i>,
                   <i className="fas fa-circle"></i>]

    // https://stackoverflow.com/questions/32937181/javascript-es6-map-multiple-arrays
    const linkIcons = links.map((x, i) => [x, icons[i]]);

    return (
        // <Provider store={store}>
            <div className="list-group">
                {linkIcons.map((link) =>
                                   <Link to={`${link[0]}`} className={`list-group-item text-capitalize ${active === link[0] ? "active" : ""}`}>
                                       <div>
                                           {link[1]}

                                           {" " + link[0]}
                                       </div>
                                   </Link>
                )}

                { currentUser && <Link className={`list-group-item text-capitalize wd-icon-buffer ${active === "fas fa-user" ? "active" : ""}`} to="/profile"> Profile </Link>}

            </div>
        // </Provider>
    );
};
export default NavigationSidebar;