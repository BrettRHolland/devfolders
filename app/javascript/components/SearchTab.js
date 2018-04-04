import React from "react";
import StackOverflowSearch from "./StackOverflowSearch";
import YouTubeSearch from "./YouTubeSearch";

export default class SearchTab extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchApp: "youtube"
		};
		this.changeSearchApp = this.changeSearchApp.bind(this);
	}

	changeSearchApp(e) {
		this.setState({ searchApp: e.target.id });
	}

	render() {
		let searchApp = this.state.searchApp;
		let youtubeClass = "nav-link";
		let stackOverflowClass = "nav-link";
		let displaySearch;

		// set active class on search selection
		if (searchApp == "youtube") {
			youtubeClass = "nav-link active";
			displaySearch = <YouTubeSearch folder_id={this.props.folder_id} saveYouTubeVideo={this.props.saveYouTubeVideo} />;
		} else if (searchApp == "stackoverflow") {
			stackOverflowClass = "nav-link active";
			displaySearch = <StackOverflowSearch />;
		}

		return (
			<div className="container">
				<div className="row">
					<div className="col">
						<ul className="nav nav-pills tertiarybar margin-bottom-small">
							<li className="nav-item">
								<a
									className={youtubeClass}
									id="youtube"
									onClick={this.changeSearchApp}>
									YouTube
								</a>
							</li>
							<li className="nav-item">
								<a
									className={stackOverflowClass}
									id="stackoverflow"
									onClick={this.changeSearchApp}>
									Stack Overflow
								</a>
							</li>
							<li className="nav-item">
								<a
									className="nav-link disabled"
									id="github"
									onClick={this.changeSearchApp}>
									GitHub
								</a>
							</li>
						</ul>
					</div>
				</div>
				{displaySearch}
			</div>
		);
	}
}