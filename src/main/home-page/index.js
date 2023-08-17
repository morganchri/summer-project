import React, {useEffect, useState} from "react";
import LineChart from "./line-chart";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {GetQuote} from "../API/FinnhubData"
import Chart from "chart.js/auto";
import {useSelector} from "react-redux";
import SearchBar from "../search/SearchBar";
import {getOwnedStocks} from "../search/finnhubSearch";

function Home({

                  userInfo = {
                      _id : 123,
                      userName: "cmorgan",
                      firstName: "Chris",
                      lastName: "Morgan",
                      owned: {"NVDA": 250, "QQQ": 12, "MSFT": 27}
                  }
              }) {

    const { currentUser } = useSelector((state) => state.user);

    let total = 0;
    let change = 0;

    for (let key in userInfo.owned) {
        total += GetQuote(key).c * userInfo.owned[key];
        change += GetQuote(key).d * userInfo.owned[key];
    }

    const pct = (change/total)*100;

    const [active, setActive] = useState("1d");

    const[chart, setChart] = useState();

    useEffect(()=>{
        setChart(<LineChart/>)
    },[]);

    const ctx = Chart.getChart("myChart");

    if (change >= 0) {
        // const ctx = document.getElementById('myChart').getContext("2d")
        ctx.data.datasets[0].backgroundColor = "rgba(50, 205, 50, 0.2)"
        ctx.data.datasets[0].borderColor = "rgba(50, 205, 50, 1)"
        ctx.update()
    }
    if (change < 0) {
        // const ctx = document.getElementById('myChart').getContext("2d")
        ctx.data.datasets[0].backgroundColor = "rgba(255,99,132,0.2)"
        ctx.data.datasets[0].borderColor = "rgba(255,99,132,1)"
        ctx.update()
    }


    // useEffect(() => {
    //
    // }, []);


    // const ctx = Chart.getChart("myChart");
    let to = new Date();
    console.log(to.getDay())
    if (to.getDay() === 6)  {
        to.setDate(to.getDate() - 1);
        to.setHours(23,59,59,0);
        console.log(to)
    }
    if (to.getDay() === 0) {
        to.setDate(to.getDate() - 1);
    }
    let from = new Date();

    let [owned, setOwned] = useState({});

    const getOwned = async () => {
        console.log("User ID");
        console.log(currentUser._id)
        const owned = await getOwnedStocks(currentUser._id);
        console.log("Owned");
        console.log(owned);
        setOwned(owned);
    }

    useEffect(() => {
        getOwned();
    }, []);
    // let owned = currentUser;

    // from = (to - dateOffset);
    // https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
    const userAction = async () => {
        let lineData = [];
        // console.log("Resolution");
        // console.log(res);
        from.setDate(to.getDate() - 2);
        to.setHours(23,59,59,0);
        from.setHours(0,0,0,0)
        to = new Date(to).getTime();
        from = new Date(from).getTime();
        console.log("To");
        console.log(to);
        console.log(new Date(to))
        console.log("From");
        console.log(from);
        console.log(new Date(from))
        for (let key in owned.owned) {
            console.log(key)
            const url = `https://finnhub.io/api/v1/stock/candle?token=cj4io81r01qq6hgdl21gcj4io81r01qq6hgdl220&symbol=${key}&resolution=D&from=${from}&to=${to}`
            console.log("URL");
            console.log(url)
            const response = await fetch(url);
            const myJson = await response.json(); //extract JSON from the http response
            console.log("Historical Response");
            console.log(myJson)
            console.log(myJson.c)
            if (lineData.length === 0) {
                lineData = myJson.c;
                lineData = lineData.slice(-2)
                console.log("Data")
                console.log(lineData)
            }
            if (lineData.length !== 0) {
                // https://stackoverflow.com/questions/24094466/sum-two-arrays-in-single-iteration
                let extraData = myJson.c
                extraData = extraData.slice(-2)
                console.log("Line Data")
                console.log(extraData)
                lineData.map(function (num, idx) {
                    return num + myJson.c[idx];
                });
            }
        }
        const ctx = Chart.getChart("myChart")
        // lineData
        ctx.data.labels = Array(lineData.length).fill(null).map((_, i) => i);
        ctx.data.datasets[0].data = lineData;
        ctx.update();
    }
    window.addEventListener('load', function () {
        userAction();
    })


    const pillClickHandler = async (elem) => {
        await setActive(elem.target.id);
        const currentActive = elem.target.id;
        chartChangeClicker(currentActive);
    }


    const chartChangeClicker = (currentActive) => {
        let to = (new Date());
        let from = (new Date());
        let users = currentUser;
        if (currentActive === "1d") {
            let dateOffset = 2;
            let res = "D";
            const userAction = async () => {
                let lineData = [];
                console.log("Resolution");
                console.log(res);
                from.setDate(to.getDate() - dateOffset);
                to.setHours(23,59,59,0);
                from.setHours(0,0,0,0);
                to = new Date(to).getTime();
                from = new Date(from).getTime();
                console.log("To");
                console.log(to);
                console.log(new Date(to));
                console.log("From");
                console.log(from);
                console.log(new Date(from));
                for (let key in owned.owned) {
                    console.log(key);
                    const url = `https://finnhub.io/api/v1/stock/candle?token=cj4io81r01qq6hgdl21gcj4io81r01qq6hgdl220&symbol=${key}&resolution=${res}&from=${from}&to=${to}`
                    console.log("URL");
                    console.log(url);
                    const response = await fetch(url);
                    const myJson = await response.json(); //extract JSON from the http response
                    console.log("Historical Response");
                    console.log(myJson);
                    console.log(myJson.c);
                    if (lineData.length === 0) {
                        lineData = myJson.c;
                        lineData = lineData.slice(-dateOffset)
                        console.log("Data");
                        console.log(lineData);
                    }
                    if (lineData.length !== 0) {
                        // https://stackoverflow.com/questions/24094466/sum-two-arrays-in-single-iteration
                        let extraData = myJson.c;
                        extraData = extraData.slice(-dateOffset);
                        console.log("Line Data");
                        console.log(extraData);
                        lineData.map(function (num, idx) {
                            return num + myJson.c[idx];
                        });
                    }
                }
                // lineData =
                ctx.data.labels = Array(lineData.length).fill(null).map((_, i) => i);
                ctx.data.datasets[0].data = lineData;
                ctx.update();
            }
            // https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
            // getData(userInfo, dateOffset, res)
            userAction();
        }
        if (currentActive === "5d") {
            let dateOffset = 5;
            let res = "D"
            const userAction = async () => {
                let lineData = [];
                console.log("Resolution");
                console.log(res);
                from.setDate(to.getDate() - dateOffset);
                to.setHours(23,59,59,0);
                from.setHours(0,0,0,0)
                to = new Date(to).getTime();
                from = new Date(from).getTime();
                console.log("To");
                console.log(to);
                console.log(new Date(to))
                console.log("From");
                console.log(from);
                console.log(new Date(from))
                for (let key in owned.owned) {
                    console.log(key)
                    const url = `https://finnhub.io/api/v1/stock/candle?token=cj4io81r01qq6hgdl21gcj4io81r01qq6hgdl220&symbol=${key}&resolution=${res}&from=${from}&to=${to}`
                    console.log("URL");
                    console.log(url)
                    const response = await fetch(url);
                    const myJson = await response.json(); //extract JSON from the http response
                    console.log("Historical Response");
                    console.log(myJson)
                    console.log(myJson.c)
                    if (lineData.length === 0) {
                        lineData = myJson.c;
                        lineData = lineData.slice(-dateOffset)
                        console.log("Data")
                        console.log(lineData)
                    }
                    if (lineData.length !== 0) {
                        // https://stackoverflow.com/questions/24094466/sum-two-arrays-in-single-iteration
                        let extraData = myJson.c
                        extraData = extraData.slice(-dateOffset)
                        console.log("Line Data")
                        console.log(extraData)
                        lineData.map(function (num, idx) {
                            return num + myJson.c[idx];
                        });
                    }
                }
                ctx.data.labels = Array(lineData.length).fill(null).map((_, i) => i);
                ctx.data.datasets[0].data = lineData;
                ctx.update();
            }
            // https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
            // getData(userInfo, dateOffset, res)
            userAction();
        }
        if (currentActive === "7d") {
            let dateOffset = 7;
            let res = "D"
            const userAction = async () => {
                let lineData = [];
                console.log("Resolution");
                console.log(res);
                from.setDate(to.getDate() - dateOffset);
                to.setHours(23,59,59,0);
                from.setHours(0,0,0,0)
                to = new Date(to).getTime();
                from = new Date(from).getTime();
                console.log("To");
                console.log(to);
                console.log(new Date(to))
                console.log("From");
                console.log(from);
                console.log(new Date(from))
                for (let key in owned.owned) {
                    console.log(key)
                    const url = `https://finnhub.io/api/v1/stock/candle?token=cj4io81r01qq6hgdl21gcj4io81r01qq6hgdl220&symbol=${key}&resolution=${res}&from=${from}&to=${to}`
                    console.log("URL");
                    console.log(url)
                    const response = await fetch(url);
                    const myJson = await response.json(); //extract JSON from the http response
                    console.log("Historical Response");
                    console.log(myJson)
                    console.log(myJson.c)
                    if (lineData.length === 0) {
                        lineData = myJson.c;
                        lineData = lineData.slice(-dateOffset)
                        console.log("Data")
                        console.log(lineData)
                    }
                    if (lineData.length !== 0) {
                        // https://stackoverflow.com/questions/24094466/sum-two-arrays-in-single-iteration
                        let extraData = myJson.c
                        extraData = extraData.slice(-dateOffset)
                        console.log("Line Data")
                        console.log(extraData)
                        lineData.map(function (num, idx) {
                            return num + myJson.c[idx];
                        });
                    }
                }
                ctx.data.labels = Array(lineData.length).fill(null).map((_, i) => i);
                ctx.data.datasets[0].data = lineData;
                ctx.update();
            }
            // https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
            // getData(userInfo, dateOffset, res)
            userAction();
        }
        if (currentActive === "2w") {
            let dateOffset = 14;
            let res = "D"
            const userAction = async () => {
                let lineData = [];
                console.log("Resolution");
                console.log(res);
                from.setDate(to.getDate() - dateOffset);
                to.setHours(23,59,59,0);
                from.setHours(0,0,0,0)
                to = new Date(to).getTime();
                from = new Date(from).getTime();
                console.log("To");
                console.log(to);
                console.log(new Date(to))
                console.log("From");
                console.log(from);
                console.log(new Date(from))
                for (let key in owned.owned) {
                    console.log(key)
                    const url = `https://finnhub.io/api/v1/stock/candle?token=cj4io81r01qq6hgdl21gcj4io81r01qq6hgdl220&symbol=${key}&resolution=${res}&from=${from}&to=${to}`
                    console.log("URL");
                    console.log(url)
                    const response = await fetch(url);
                    const myJson = await response.json(); //extract JSON from the http response
                    console.log("Historical Response");
                    console.log(myJson)
                    console.log(myJson.c)
                    if (lineData.length === 0) {
                        lineData = myJson.c;
                        lineData = lineData.slice(-dateOffset)
                        console.log("Data")
                        console.log(lineData)
                    }
                    if (lineData.length !== 0) {
                        // https://stackoverflow.com/questions/24094466/sum-two-arrays-in-single-iteration
                        let extraData = myJson.c
                        extraData = extraData.slice(-dateOffset)
                        console.log("Line Data")
                        console.log(extraData)
                        lineData.map(function (num, idx) {
                            return num + myJson.c[idx];
                        });
                    }
                }
                ctx.data.labels = Array(lineData.length).fill(null).map((_, i) => i);
                ctx.data.datasets[0].data = lineData;
                ctx.update();
            }
            userAction();
            // https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
            // getData(userInfo, dateOffset, res)
        }
        if (currentActive === "1m") {
            let dateOffset = 30;
            let res = "D"
            const userAction = async () => {
                let lineData = [];
                console.log("Resolution");
                console.log(res);
                from.setDate(to.getDate() - dateOffset);
                to.setHours(23,59,59,0);
                from.setHours(0,0,0,0)
                to = new Date(to).getTime();
                from = new Date(from).getTime();
                console.log("To");
                console.log(to);
                console.log(new Date(to))
                console.log("From");
                console.log(from);
                console.log(new Date(from))
                for (let key in owned.owned) {
                    console.log(key)
                    const url = `https://finnhub.io/api/v1/stock/candle?token=cj4io81r01qq6hgdl21gcj4io81r01qq6hgdl220&symbol=${key}&resolution=${res}&from=${from}&to=${to}`
                    console.log("URL");
                    console.log(url)
                    const response = await fetch(url);
                    const myJson = await response.json(); //extract JSON from the http response
                    console.log("Historical Response");
                    console.log(myJson)
                    console.log(myJson.c)
                    if (lineData.length === 0) {
                        lineData = myJson.c;
                        lineData = lineData.slice(-dateOffset)
                        console.log("Data")
                        console.log(lineData)
                    }
                    if (lineData.length !== 0) {
                        // https://stackoverflow.com/questions/24094466/sum-two-arrays-in-single-iteration
                        let extraData = myJson.c
                        extraData = extraData.slice(-dateOffset)
                        console.log("Line Data")
                        console.log(extraData)
                        lineData.map(function (num, idx) {
                            return num + myJson.c[idx];
                        });
                    }
                }
                ctx.data.labels = Array(lineData.length).fill(null).map((_, i) => i);
                ctx.data.datasets[0].data = lineData;
                ctx.update();
            }
            // https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
            // getData(userInfo, dateOffset, res)
            userAction();
        }
        if (currentActive === "3m") {
            let dateOffset = 90;
            let res = "D"
            const userAction = async () => {
                let lineData = [];
                console.log("Resolution");
                console.log(res);
                from.setDate(to.getDate() - dateOffset);
                to.setHours(23,59,59,0);
                from.setHours(0,0,0,0)
                to = new Date(to).getTime();
                from = new Date(from).getTime();
                console.log("To");
                console.log(to);
                console.log(new Date(to))
                console.log("From");
                console.log(from);
                console.log(new Date(from))
                for (let key in owned.owned) {
                    console.log(key)
                    const url = `https://finnhub.io/api/v1/stock/candle?token=cj4io81r01qq6hgdl21gcj4io81r01qq6hgdl220&symbol=${key}&resolution=${res}&from=${from}&to=${to}`
                    console.log("URL");
                    console.log(url)
                    const response = await fetch(url);
                    const myJson = await response.json(); //extract JSON from the http response
                    console.log("Historical Response");
                    console.log(myJson)
                    console.log(myJson.c)
                    if (lineData.length === 0) {
                        lineData = myJson.c;
                        lineData = lineData.slice(-dateOffset)
                        console.log("Data")
                        console.log(lineData)
                    }
                    if (lineData.length !== 0) {
                        // https://stackoverflow.com/questions/24094466/sum-two-arrays-in-single-iteration
                        let extraData = myJson.c
                        extraData = extraData.slice(-dateOffset)
                        console.log("Line Data")
                        console.log(extraData)
                        lineData.map(function (num, idx) {
                            return num + myJson.c[idx];
                        });
                    }
                }
                ctx.data.labels = Array(lineData.length).fill(null).map((_, i) => i);
                ctx.data.datasets[0].data = lineData;
                ctx.update();
            }
            // https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
            // getData(userInfo, dateOffset, res)
            userAction();
        }
        if (currentActive === "6m") {
            let dateOffset = 180;
            let res = "D"
            const userAction = async () => {
                let lineData = [];
                console.log("Resolution");
                console.log(res);
                from.setDate(to.getDate() - dateOffset);
                to.setHours(23,59,59,0);
                from.setHours(0,0,0,0)
                to = new Date(to).getTime();
                from = new Date(from).getTime();
                console.log("To");
                console.log(to);
                console.log(new Date(to))
                console.log("From");
                console.log(from);
                console.log(new Date(from))
                for (let key in owned.owned) {
                    console.log(key)
                    const url = `https://finnhub.io/api/v1/stock/candle?token=cj4io81r01qq6hgdl21gcj4io81r01qq6hgdl220&symbol=${key}&resolution=${res}&from=${from}&to=${to}`
                    console.log("URL");
                    console.log(url)
                    const response = await fetch(url);
                    const myJson = await response.json(); //extract JSON from the http response
                    console.log("Historical Response");
                    console.log(myJson)
                    console.log(myJson.c)
                    if (lineData.length === 0) {
                        lineData = myJson.c;
                        lineData = lineData.slice(-dateOffset)
                        console.log("Data")
                        console.log(lineData)
                    }
                    if (lineData.length !== 0) {
                        // https://stackoverflow.com/questions/24094466/sum-two-arrays-in-single-iteration
                        let extraData = myJson.c
                        extraData = extraData.slice(-dateOffset)
                        console.log("Line Data")
                        console.log(extraData)
                        lineData.map(function (num, idx) {
                            return num + myJson.c[idx];
                        });
                    }
                }
                ctx.data.labels = Array(lineData.length).fill(null).map((_, i) => i);
                ctx.data.datasets[0].data = lineData;
                ctx.update();
            }
            // https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
            // getData(userInfo, dateOffset, res)
            userAction();
        }
        if (currentActive === "1y") {
            let dateOffset = 365;
            let res = "D"
            const userAction = async () => {
                let lineData = [];
                console.log("Resolution");
                console.log(res);
                from.setDate(to.getDate() - dateOffset);
                to.setHours(23,59,59,0);
                from.setHours(0,0,0,0)
                to = new Date(to).getTime();
                from = new Date(from).getTime();
                console.log("To");
                console.log(to);
                console.log(new Date(to))

                console.log("From");
                console.log(from);
                console.log(new Date(from))
                for (let key in owned.owned) {
                    console.log(key)
                    const url = `https://finnhub.io/api/v1/stock/candle?token=cj4io81r01qq6hgdl21gcj4io81r01qq6hgdl220&symbol=${key}&resolution=${res}&from=${from}&to=${to}`
                    console.log("URL");
                    console.log(url)
                    const response = await fetch(url);
                    const myJson = await response.json(); //extract JSON from the http response
                    console.log("Historical Response");
                    console.log(myJson)
                    console.log(myJson.c)
                    if (lineData.length === 0) {
                        lineData = myJson.c;
                        lineData = lineData.slice(-dateOffset)
                        console.log("Data")
                        console.log(lineData)
                    }
                    if (lineData.length !== 0) {
                        // https://stackoverflow.com/questions/24094466/sum-two-arrays-in-single-iteration
                        let extraData = myJson.c
                        extraData = extraData.slice(-dateOffset)
                        console.log("Line Data")
                        console.log(extraData)
                        lineData.map(function (num, idx) {
                            return num + myJson.c[idx];
                        });
                    }
                }
                ctx.data.labels = Array(lineData.length).fill(null).map((_, i) => i);
                ctx.data.datasets[0].data = lineData;
                ctx.update();
            }
            // https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
            // getData(userInfo, dateOffset, res)
            userAction();
        }
    }

    return (
        <div>
            <h1 className={(change >= 0) ? "header-positive" : "header-negative"}>Hello, {userInfo.firstName}!</h1>
            <h2 className={(change >= 0) ? "header-positive" : "header-negative"}>${total.toFixed(2)} ({change.toFixed(2)}) {pct.toFixed(2)}%</h2>
            <canvas id="myChart"></canvas>
            {chart}
            <ul className={(change >= 0) ? "nav nav-pills nav-justified pill_nav_class_positive" : "nav nav-pills nav-justified pill_nav_class_negative"}>
                <li className={(change >= 0) ? "positive nav-item pos-color" : "negative nav-item neg-color"}>
                    <button id='1d' className={`nav-link ${active === "1d" ? "active" : ""}`} onClick={pillClickHandler}>1 Day</button>
                </li>
                <li className={(change >= 0) ? "positive nav-item pos-color" : "negative nav-item neg-color"}>
                    <button id='5d' className={`nav-link ${active === "5d" ? "active" : ""}`} onClick={pillClickHandler}>5 Days</button>
                </li>
                <li className={(change >= 0) ? "positive nav-item pos-color" : "negative nav-item neg-color"}>
                    <button id='7d' className={`nav-link ${active === "7d" ? "active" : ""}`} onClick={pillClickHandler}>7 Days</button>
                </li>
                <li className={(change >= 0) ? "positive nav-item pos-color" : "negative nav-item neg-color"}>
                    <button id='2w' className={`nav-link ${active === "2w" ? "active" : ""}`} onClick={pillClickHandler}>2 Weeks</button>
                </li>
                <li className={(change >= 0) ? "positive nav-item pos-color" : "negative nav-item neg-color"}>
                    <button id='1m' className={`nav-link ${active === "1m" ? "active" : ""}`} onClick={pillClickHandler}>1 Month</button>
                </li>
                <li className={(change >= 0) ? "positive nav-item pos-color" : "negative nav-item neg-color"}>
                    <button id='3m' className={`nav-link ${active === "3m" ? "active" : ""}`} onClick={pillClickHandler}>3 Months</button>
                </li>
                <li className={(change >= 0) ? "positive nav-item pos-color" : "negative nav-item neg-color"}>
                    <button id='6m' className={`nav-link ${active === "6m" ? "active" : ""}`} onClick={pillClickHandler}>6 Months</button>
                </li>
                <li className={(change >= 0) ? "positive nav-item pos-color" : "negative nav-item neg-color"}>
                    <button id='1y' className={`nav-link ${active === "1y" ? "active" : ""}`} onClick={pillClickHandler}>1 Year</button>
                </li>
            </ul>
        </div>



    );
}

export default Home;