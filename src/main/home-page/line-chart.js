import Chart from 'chart.js/auto'
import {GetHistorical, GetQuote} from "../API/FinnhubData"
import {useEffect, useState} from "react";

const LineChart = ({

                       userInfo = {
                           _id : 123,
                           userName: "cmorgan",
                           firstName: "Chris",
                           lastName: "Morgan",
                           owned: {"APTO": 250, "QQQ": 12, "MSFT": 27}
                       },
                       res = "D",
                       from = (new Date()),
                       to = (new Date())
                   },
                   ) => {

    console.log("Chart")
    const ctx = document.getElementById('myChart').getContext("2d");

    // https://www.chartjs.org/docs/latest/samples/plugins/chart-area-border.html
    const chartAreaBorder = {
        id: 'chartAreaBorder',
        beforeDraw(chart, args, options) {
            const {ctx, chartArea: {left, top, width, height}} = chart;
            ctx.save();
            ctx.strokeStyle = options.borderColor;
            ctx.lineWidth = options.borderWidth;
            ctx.setLineDash(options.borderDash || []);
            ctx.lineDashOffset = options.borderDashOffset;
            ctx.strokeRect(left, top, width, height);
            ctx.restore();
        }
    };

    // let ticker = "AAPL";
    // const [hist, setHist] = useState({})

    // To get JSON manually
    // https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
    // const userAction = async () => {
    //     console.log("Resolution");
    //     console.log(res);
    //     from.setDate(to.getDate() - 1);
    //     to.setHours(23,59,59,0);
    //     from.setHours(0,0,0,0)
    //     to = new Date(to).getTime();
    //     from = new Date(from).getTime();
    //     console.log("To");
    //     console.log(to);
    //     console.log(new Date(to))
    //     console.log("From");
    //     console.log(from);
    //     console.log(new Date(from))
    //     console.log(ticker)
    //     const url = `https://finnhub.io/api/v1/stock/candle?token=cj4io81r01qq6hgdl21gcj4io81r01qq6hgdl220&symbol=${ticker}&resolution=${res}&from=${from}&to=${to}`
    //     console.log("URL");
    //     console.log(url)
    //     const response = await fetch(url);
    //     const myJson = await response.json(); //extract JSON from the http response
    //     console.log("Historical Response");
    //     console.log(myJson)
    //     // setHist(myJson);
    //     return(myJson);
    // }

    const data = {

        labels: Array.from(Array(1).keys()),
        datasets: [{
            label: "",
            backgroundColor: "rgba(50, 205, 50, 0.2)",
            borderColor: "rgba(50, 205, 50, 1)",
            borderWidth: 1,
            pointRadius: 0,
            data: []
        }]
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            chartAreaBorder: {
                borderColor: 'gray',
                borderWidth: 1,
            }
        },
        scales: {
            y : {
                display: false
            },
            x: {
                display: false
            }
        }
    };

    const chart = new Chart(ctx, {
        type: "line",
        data: data,
        options: options,
        plugins: [chartAreaBorder]
    });

    return (
        chart
    );
}

export default LineChart;
