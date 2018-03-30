import React, {Component} from 'react';
import Note from './Note';
import Video from './Video';
import Snippet from './Snippet';
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

  render() {
    let notes = this.state.notes
    let snippets = this.state.snippets
    let videos = this.state.videos
    let view = this.state.view
    let viewClass = 'flex-sm-fill text-sm-center nav-link'
    let allClass = viewClass
    let notesClass = viewClass
    let videosClass = viewClass
    let snippetsClass = viewClass

    if (view=='notes') {
      notesClass = `${viewClass} active`
    } else if (view=='videos') {
      videosClass = `${viewClass} active`
    } else if (view=='snippets') {
      snippetsClass = `${viewClass} active`
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
      <div className="secondarybar mb-5">
      <div className="container-fluid">
      <div className="row align-items-center">
      <div className="col-md-auto">
      <nav className="nav nav-pills flex-column flex-sm-row">
        <a className={allClass} id="all" onClick={this.handleViewChange}>All</a>
        <a className={notesClass} id="notes" onClick={this.handleViewChange}>Notes</a>
        <a className={videosClass} id="videos" onClick={this.handleViewChange}>Videos</a>
        <a className={snippetsClass} id="snippets" onClick={this.handleViewChange}>Snippets</a>
      </nav>
      </div>
      <div className="col"></div>
      <div className="col-md-auto"></div>
      <div className="col-md-auto"><Link to={`/folders/new`}><i className="fas fa-plus-circle new"></i></Link></div>
      </div>
      </div>
      </div>

      {/* Notes */}
      <div className="container-fluid">
      <div className="row">
      {showNotes}
      </div>
      </div>

      {/* Videos */}
      <div className="container mt-3">
      <div className="row">
      {showVideos}
      </div>
      </div>

      {/* Snippets */}
      <div className="container mt-3">
      <div className="row">
      {showSnippets}
      </div>
      </div>

      </div>
    )
  }
}

export default MaterialsContainer;
