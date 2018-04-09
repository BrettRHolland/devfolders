import React, { Component } from "react";
import YTSearch from "youtube-api-search";
import YouTubeSearchResults from "./YouTubeSearchResults";

const API_KEY = process.env.YOUTUBE_API_KEY;

export default class YouTubeSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      videos: []
    };
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeSearch(event) {
    this.setState({ term: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.searchYT(this.state.term);
  }

  searchYT = term => {
    this.setState({ loading: true });
    YTSearch({ key: API_KEY, term }, videos => {
      this.setState({
        loading: false,
        videos
      });
    });
  };

  render() {
    const { loading, videos } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit} className="margin-top-small">
          <div className="row">
            <div className="col">
              <input
                type="text"
                name="term"
                onChange={this.onChangeSearch}
                placeholder="Search YouTube..."
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

        <YouTubeSearchResults
          videos={videos}
          folder_id={this.props.folder_id}
          saveYouTubeVideo={this.props.saveYouTubeVideo}
        />
      </div>
    );
  }
}
