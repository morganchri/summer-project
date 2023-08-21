// import {useEffect, useState} from "react";
//
// const CompanyProfile = (ticker) => {
//
// 	const [data, setData] = useState({});
//
// 	const finnhub = require('finnhub');
//
// 	const api_key = finnhub.ApiClient.instance.authentications['api_key'];
// 	api_key.apiKey = "cj4io81r01qq6hgdl21gcj4io81r01qq6hgdl220"
// 	const finnhubClient = new finnhub.DefaultApi()
// 	useEffect(() => {
//
// 		finnhubClient.companyProfile2({"symbol": ticker}, (error, data, response) => {
// 			console.log(data)
// 			setData(data)
// 		});
// 	}, []);
//
// 	return (data);
// }
//
// export default CompanyProfile;