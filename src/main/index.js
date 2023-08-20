import React, {useEffect, useState} from "react";
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
import LikedStocks from "./liked-sidebar";
import LikedHomePage from "./home-page/research-home-page";
import LikeHomePage from "./home-page/likeHomePage";
import PublicProfile from "./user/public-profile";

function Main() {

    const { currentUser } = useSelector((state) => state.user);

    return (
            <div className={"page-margins"}>
                <div className={"row"}>
                    <div className={"col-2"}>
                        <NavigationSidebar/>
                    </div>
                    <div className={"col-8"}>
                        <Routes>
                            {!currentUser && <Route path="/home" element={<h1>Please log in or register</h1>}/>}
                            {(currentUser && ((currentUser.role === "casual") || (currentUser.role === "professional"))) && <Route path="/home" element={<Home/>}/>}
                            {currentUser && currentUser.role === "researcher" && <Route path="/home" element={<LikeHomePage/>}/>}
                            <Route path="/portfolio" element={<h1>Portfolio</h1>} />
                            <Route path="/notifications" element={<h1>Notifications</h1>}/>
                            <Route path="/likes" element={<h1>Likes</h1>}/>
                            <Route path="/lists" element={<h1>Lists</h1>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/profile/:uid" element={<PublicProfile/>}/>
                            <Route path="/search" element={<SearchBar/>}/>
                            <Route path="/register" element={<RegisterScreen/>}/>
                            <Route path="/login" element={<LoginScreen/>}/>
                            <Route path="/details/:id" element={<Details />} />
                        </Routes>
                    </div>
                    <div className={"col-2"}>
                        {!currentUser && <Link className="text-capitalize login-button-format" to="/login">   Login   </Link>}
                        {!currentUser && <Link className="text-capitalize login-button-format" to="/register">Register</Link>}
                        {currentUser && (currentUser.role !== "researcher") && <OwnedStocks/>}
                        {currentUser && (currentUser.role === "researcher") && <LikedStocks/>}
                    </div>
                </div>
            </div>
    );
}

export default Main;