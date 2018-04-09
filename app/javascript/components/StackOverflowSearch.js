import React from "react";
import StackOverflowSearchResult from "./StackOverflowSearchResult";

export default class StackOverflowSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stackSearchTerms: "",
			stackSearchResults: [],
			answer: "",
			answer_id: ""
		};
		this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this);
		this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
		this.handleFetch = this.handleFetch.bind(this);
		this.getAnswer = this.getAnswer.bind(this);
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
			`https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=activity&q=${searchTerms}&accepted=True&site=stackoverflow&filter=withbody`
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

	getAnswer(accepted_answer_id) {
		this.setState({ answer_id: accepted_answer_id })
		fetch(
			`https://api.stackexchange.com/2.2/answers/${accepted_answer_id}?order=desc&sort=activity&site=stackoverflow&filter=withbody`
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
					answer: body.items[0].body
				});
			})
			.catch(error => console.error(`Error in fetch: ${error.message}`));
	}

	render() {
		let stackSearchResults = this.state.stackSearchResults;
		let showAnswer = this.state.answer;
		let answer_id = this.state.answer_id;
		let displayAnswer;

		let searchResults = stackSearchResults.map(result => {
			let handleAnswerClick = () => {
				this.getAnswer(result.accepted_answer_id);
			};
			if(result.accepted_answer_id == answer_id) {
				displayAnswer = showAnswer
			}
			return (
				<StackOverflowSearchResult
					key={result.question_id}
					question_id={result.question_id}
					accepted_answer_id={result.accepted_answer_id}
					title={result.title}
					body={result.body}
					handleClick={handleAnswerClick}
					answer={displayAnswer}
				/>

			);
			let displayAnswer;
		});
		return (
			<div>
				<form onSubmit={this.handleSearchSubmit} className="margin-top-small">
					<div className="row">
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
