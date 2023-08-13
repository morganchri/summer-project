import React from "react";
import NavigationSidebar from "./navigation-sidebar";
import {Routes, Route, Link} from "react-router-dom";
import Home from "./home-page";
import OwnedStocks from "./owned-sidebar";
import {useSelector} from "react-redux";
import RegisterScreen from "./user/register";
import LoginScreen from "./user/login";

function Main() {
    const { currentUser } = useSelector((state) => state.user);
    return (

            <div>
                <div className={"row page-margins"}>
                    <div className={"col-2"}>
                        <NavigationSidebar/>
                    </div>
                    <div className={"col-8"}>
                        <Routes>
                            <Route path="/home" element={<Home/>} />
                            <Route path="/portfolio" element={<h1>Portfolio</h1>} />
                            <Route path="/notifications" element={<h1>Notifications</h1>}/>
                            <Route path="/likes" element={<h1>Likes</h1>}/>
                            <Route path="/lists" element={<h1>Lists</h1>}/>
                            {/*<Route path="/profile" element={<h1>Profile</h1>}/>*/}
                            <Route path="/more" element={<h1>More</h1>}/>
                            <Route path="/register" element={<RegisterScreen/>}/>
                            <Route path="/login" element={<LoginScreen/>}/>
                        </Routes>
                    </div>
                    <div className={"col-2"}>
                        {/*<h1>Owned Stocks</h1>*/}
                        {!currentUser && <Link className="text-capitalize login-button-format" to="/login">   Login   </Link>}
                        {!currentUser && <Link className="text-capitalize login-button-format" to="/register">Register</Link>}
                        {currentUser && (currentUser.role !== "research") && <OwnedStocks/>}
                        {currentUser && (currentUser.role === "research") && <OwnedStocks/>}
                    </div>
                </div>
            </div>

    );
}

export default Main;