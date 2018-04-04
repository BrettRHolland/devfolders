import React from "react";
import StackOverflowSearchResult from "./StackOverflowSearchResult";

export default class StackOverflowSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stackSearchTerms: "",
			stackSearchResults: []
		};
		this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this);
		this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
		this.handleFetch = this.handleFetch.bind(this);
	}

	handleSearchFieldChange(event) {
		this.setState({ stackSearchTerms: event.target.value });
	}

	handleSearchSubmit(event) {
		event.preventDefault();
		this.handleFetch(this.state.stackSearchTerms);
	}

	handleFetch(searchTerms) {
		fetch(
			`https://api.stackexchange.com/2.2/search/excerpts?order=desc&sort=activity&q=${searchTerms}&site=stackoverflow`
		)
			.then(response => {
				if (response.ok) {
					return response;
				} else {
					let errorMessage = `${response.status} (${response.statusText})`,
						error = new Error(errorMessage);
					throw error;
				}
			})
			.then(response => response.json())
			.then(body => {
				this.setState({
					stackSearchResults: body.items
				});
			})
			.catch(error => console.error(`Error in fetch: ${error.message}`));
	}

	render() {
		let stackSearchResults = this.state.stackSearchResults;

		let searchResults = stackSearchResults.map(result => {
			return (
				<StackOverflowSearchResult
					key={result.question_id}
					id={result.question_id}
					title={result.title}
					body={result.body}
				/>
			);
		});
		return (
			<div>
				<form onSubmit={this.handleSearchSubmit}>
					<div className="row no-gutters">
						<div className="col">
							<input
								type="text"
								name="searchTerms"
								onChange={this.handleSearchFieldChange}
								placeholder="Search Stack Overflow..."
							/>
						</div>
						<div className="col-md-auto">
							<div className="button-group">
								<button className="app-search-button" type="submit" value="Submit">
									Search
								</button>
							</div>
						</div>
					</div>
				</form>
				<div className="row">
					<div className="col">{searchResults}</div>
				</div>
			</div>
		);
	}
}