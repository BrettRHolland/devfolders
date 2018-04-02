import React, {Component} from 'react';
import Note from './Note';
import Video from './Video';
import Snippet from './Snippet';
import YouTube from './YouTube';
import { Link } from 'react-router'

class MaterialsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      videos: [],
      snippets: [],
      view: 'all'
    }
    this.handleViewChange = this.handleViewChange.bind(this);
    this.addVideo = this.addVideo.bind(this);
  }

  componentDidMount() {
    let id = this.props.params.id
    fetch(`/api/v1/folders/${id}`, {credentials: 'same-origin'}).then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json()).then(body => {
      this.setState({notes: body.notes, snippets: body.snippets, videos: body.videos});
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleViewChange(e) {
    this.setState({view: e.target.id})
  }

  addVideo(submission) {
    fetch(`/api/v1/folders/${submission.folder_id}/videos`, {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(submission),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let allVideos = this.state.videos
      allVideos.push(body.video)
      this.setState({
        videos: allVideos,
        view: 'videos'
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  

  render() {
    let notes = this.state.notes
    let snippets = this.state.snippets
    let videos = this.state.videos
    let view = this.state.view
    let viewClass = 'nav-link'
    let allClass = viewClass
    let notesClass = viewClass
    let videosClass = viewClass
    let snippetsClass = viewClass
    let searchClass = viewClass
    let search


    if (view=='notes') {
      notesClass = `${viewClass} active`
    } else if (view=='videos') {
      videosClass = `${viewClass} active`
    } else if (view=='snippets') {
      snippetsClass = `${viewClass} active`
    } else if (view=='search') {
      searchClass = `${viewClass} active`
      search = <YouTube folder_id={this.props.params.id} addVideo={this.addVideo} />
    } else {
      allClass = `${viewClass} active`
    }


    let showNotes = notes.map(note => {
      if (view=='all' || view=='notes') {
      return (
        <Note
        key={note.id}
        id={note.id}
        title={note.title}
        content={note.content}
        />
      )
    }
    })

    let showSnippets = snippets.map(snippet => {
      if (view=='all' || view=='snippets') {
      return (
        <Snippet
        key={snippet.id}
        id={snippet.id}
        title={snippet.title}
        content={snippet.content}
        />
      )
    }
    })


    videos.sort ( function (a, b){
       return new Date(b.created_at) - new Date(a.created_at);
    });
    let showVideos = videos.map(video => {
      if (view=='all' || view=='videos') {
      return (
        <Video
        key={video.id}
        id={video.id}
        title={video.title}
        youtube={video.youtube}
        />
      )
        }
    })

    return (
      <div>
        {/* Secondary Bar */}
        <div className="secondarybar">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-auto">
                <ul className="nav nav-tabs nav-justified">
                  <li className="nav-item">
                    <a className={allClass} id="all" onClick={this.handleViewChange}>All</a>
                  </li>
                  <li className="nav-item">
                    <a className={notesClass} id="notes" onClick={this.handleViewChange}>Notes</a>
                  </li>
                  <li className="nav-item">
                    <a className={videosClass} id="videos" onClick={this.handleViewChange}>Videos</a>
                  </li>
                  <li className="nav-item">
                    <a className={snippetsClass} id="snippets" onClick={this.handleViewChange}>Snippets</a>
                  </li>
                  <li className="nav-item">
                    <a className={snippetsClass} id="snippets" onClick={this.handleViewChange}>Links</a>
                  </li>
                  <li className="nav-item">
                    <a className={searchClass} id="search" onClick={this.handleViewChange}>Search</a>
                  </li>
                </ul>
              </div>
              <div className="col"></div>
              <div className="col-md-auto"></div>
              <div className="col-md-auto">
                <Link to={`/folders/new`}><i className="fas fa-plus-circle new"></i></Link>
              </div>
            </div>
          </div>
        </div>
        {/* Notes */}
        <div className="container">
          <div className="material-columns">
            {showNotes}
          </div>
        </div>
        {/* Videos */}
        <div className="container">
          <div className="video-columns">
            {showVideos}
          </div>
        </div>
        {/* Snippets */}
        <div className="container">
          <div className="video-columns">
            {showSnippets}
          </div>
        </div>
       {/* Search */}
        <div>
            {search}
        </div>
      </div>
    )
  }
}

export default MaterialsContainer;
