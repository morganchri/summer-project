import Chart from 'chart.js/auto'

const ResearchLineChart = (ticker) => {

	let stockTicker = ticker.ticker;

	console.log("Research Line Chart Ticker")
	console.log(stockTicker)

	console.log("Chart")
	const ctx = document.getElementById(stockTicker).getContext("2d");

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

export default ResearchLineChart;
