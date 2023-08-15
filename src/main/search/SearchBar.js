import React, {useEffect, useState} from "react";
import { AiOutlineSearch } from "react-icons/ai";
// import { GoGear } from "react-icons/go";
import "./index.css";
import {useNavigate, useParams} from "react-router";
import * as finnhubSearch from "../search/finnhubSearch"
import {Link} from "react-router-dom";

const SearchBar = () => {

	const { searchTerm } = useParams();

	// const navigate = useNavigate();

	const [query, setQuery] = useState("aapl");
	const [results, setResults] = useState([]);

	const search = async (searchTerm, query) => {
		const searchString = searchTerm || query;
		const response = await finnhubSearch.fullSearch(searchString);
		const results = response.result;
		setResults(results);
	};

	useEffect(() => {
		if (searchTerm) {
			setQuery(searchTerm);
			search(searchTerm);
		} else {
			search(query);
		}
	}, [searchTerm]);

	return (
		<div>
			<div className="row">
				<h2 className="margin-top: 5px">Search</h2>
				<div className="col-10 position-relative">
					<input placeholder="Search Tuiter"
						   className="form-control rounded-pill ps-5"
						   value={query}
						   onChange={(e) => setQuery(e.target.value)}/>
					<AiOutlineSearch className="fs-3 position-absolute
						   wd-nudge-up"/>
				</div>
				<div className="col-2 position-relative">
					<button
						onClick={() => {
							// navigate(`/project/search/${query}`);
							search(searchTerm, query);
						}}
						className="btn btn-primary float-end">
						Search
					</button>
				</div>
			</div>
			<h3>Stocks</h3>
			<div className="table-responsive">
				<table className="table">
					<tbody>
					<tr>
						{results.map((stock) => {
							return (
								<tr>
									<Link to={`/details/${stock.symbol}`}>
										<h4>{stock.description} {stock.symbol}</h4>
									</Link>
								</tr>
							);
						})}
					</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default SearchBar;