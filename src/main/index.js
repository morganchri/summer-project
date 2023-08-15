import React from "react";
import NavigationSidebar from "./navigation-sidebar";
import {Routes, Route, Link} from "react-router-dom";
import Home from "./home-page";
import OwnedStocks from "./owned-sidebar";
import {useSelector} from "react-redux";
import RegisterScreen from "./user/register";
import LoginScreen from "./user/login";
import Profile from "./user/profile";
import SearchBar from "./search/SearchBar";
import Details from "./search/details"

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
                            {currentUser && <Route path="/home" element={<Home/>}/>}
                            {!currentUser && <Route path="/home" element={<h1>Please log in or register</h1>}/>}
                            <Route path="/portfolio" element={<h1>Portfolio</h1>} />
                            <Route path="/notifications" element={<h1>Notifications</h1>}/>
                            <Route path="/likes" element={<h1>Likes</h1>}/>
                            <Route path="/lists" element={<h1>Lists</h1>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/search" element={<SearchBar/>}/>
                            <Route path="/register" element={<RegisterScreen/>}/>
                            <Route path="/login" element={<LoginScreen/>}/>
                            <Route path="/details/:id" element={<Details />} />
                        </Routes>
                    </div>
                    <div className={"col-2"}>
                        {/*<h1>Owned Stocks</h1>*/}
                        {!currentUser && <Link className="text-capitalize login-button-format" to="/login">   Login   </Link>}
                        {!currentUser && <Link className="text-capitalize login-button-format" to="/register">Register</Link>}
                        {currentUser && (currentUser.role !== "research") && <OwnedStocks/>}
                        {/*{currentUser && (currentUser.role === "research") && <LikedStocks/>}*/}
                    </div>
                </div>
            </div>
    );
}

export default Main;