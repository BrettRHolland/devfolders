import React, { Component } from 'react';
import YTSearch from 'youtube-api-search';
import VideoList from './VideoList';

const API_KEY = 'AIzaSyA3nqnakgJ0IfxU9WzGPF1CdH3WoHCNN7s'

export default class YouTUbe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      term: '',
      videos: []
    }
    this.onChangeSearch = this.onChangeSearch.bind(this);
  }

  onChangeSearch(event) {
    this.setState({ term: event.target.value })
    console.log(this.state.term)
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
  }

  render() {
    const { loading, videos } = this.state;

    return (
      <div className = "container" >
      <div className = "row">
        <div className = "col">
        <ul className="nav nav-pills tertiarybar margin-bottom">
        <li className="nav-item">
        <a className="nav-link active" href="#">YouTube</a>
        </li>
        <li className="nav-item">
        <a className="nav-link disabled" href="#">Stack Overflow</a>
        </li>
        <li className="nav-item">
        <a className="nav-link disabled" href="#">Reddit</a>
        </li>
        </ul>
      </div>
      </div>
      <div className = "row" >
      <div className = "col" >
      <input type = "text" name = "term" onChange = { this.onChangeSearch } placeholder = "Search YouTube..." className = "material-search" / >
      </div>
      </div>

      <VideoList videos = { videos } folder_id = {this.props.folder_id} addVideo = {this.props.addVideo} />
      </div>
    );
  }
}