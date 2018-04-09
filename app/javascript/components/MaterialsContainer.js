import React, { Component } from "react";
import Note from "./Note";
import Video from "./Video";
import Snippet from "./Snippet";
import YouTubeSearch from "./YouTubeSearch";
import SearchTab from "./SearchTab";
import LinkItem from "./LinkItem";
import { Link } from "react-router";
import { browserHistory } from "react-router";

class MaterialsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      notesCount: 0,
      videos: [],
      videosCount: 0,
      snippets: [],
      snippetsCount: 0,
      links: [],
      linksCount: 0,
      view: "all"
    };
    this.handleViewChange = this.handleViewChange.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.deleteVideo = this.deleteVideo.bind(this);
    this.deleteSnippet = this.deleteSnippet.bind(this);
    this.deleteLink = this.deleteLink.bind(this);
    this.saveYouTubeVideo = this.saveYouTubeVideo.bind(this);
  }

  componentDidMount() {
    let id = this.props.params.id;
    fetch(`/api/v1/folders/${id}`, { credentials: "same-origin" })
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
          notes: body.notes,
          notesCount: body.notes_count,
          snippets: body.snippets,
          snippetsCount: body.snippets_count,
          videos: body.videos,
          videosCount: body.videos_count,
          links: body.links,
          linksCount: body.links_count
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleViewChange(e) {
    this.setState({ view: e.target.id });
  }

  saveYouTubeVideo(submission) {
    fetch(`/api/v1/folders/${submission.folder_id}/videos`, {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(submission),
      headers: { "Content-Type": "application/json" }
    })
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
        let newVideos = this.state.videos;
        newVideos.push(body.video);
        this.setState({ videos: newVideos, view: 'videos', videosCount: body.videos_count });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  deleteNote(id) {
    let folder_id = this.props.params.id;
    fetch(`/api/v1/folders/${folder_id}/notes/${id}`, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
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
        this.setState({ notes: body.notes, notesCount: body.notes_count });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  deleteLink(id) {
    let folder_id = this.props.params.id;
    fetch(`/api/v1/folders/${folder_id}/links/${id}`, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
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
        this.setState({ notes: body.links });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  deleteVideo(id) {
    let folder_id = this.props.params.id;
    fetch(`/api/v1/folders/${folder_id}/videos/${id}`, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
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
        this.setState({ videos: body.videos, videosCount: body.videos_count });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  deleteSnippet(id) {
    let folder_id = this.props.params.id;
    fetch(`/api/v1/folders/${folder_id}/snippets/${id}`, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
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
        this.setState({ snippets: body.snippets });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let links = this.state.links;
    let linksCount = this.state.linksCount;
    let notes = this.state.notes;
    let stackResults = this.state.stackResults;
    let snippets = this.state.snippets;
    let videos = this.state.videos;
    let view = this.state.view;
    let viewClass = "nav-link";
    let allClass = viewClass;
    let linksClass = viewClass;
    let notesClass = viewClass;
    let videosClass = viewClass;
    let searchClass = viewClass;
    let snippetsClass = viewClass;
    let stackClass = viewClass;
    let youtubeClass = viewClass;
    let searchTab;
    let notesCount = this.state.notesCount;
    let snippetsCount = this.state.snippetsCount;
    let videosCount = this.state.videosCount;
    let folder_id = this.props.params.id;
    let totalCount =
      this.state.notesCount +
      this.state.snippetsCount +
      this.state.videosCount +
      this.state.linksCount;

    if (view == "notes") {
      notesClass = `${viewClass} active`;
    } else if (view == "videos") {
      videosClass = `${viewClass} active`;
    } else if (view == "snippets") {
      snippetsClass = `${viewClass} active`;
    } else if (view == "links") {
      linksClass = `${viewClass} active`;
    } else if (view == "search") {
      searchClass = `${viewClass} active`;
      searchTab = (
        <SearchTab saveYouTubeVideo={this.saveYouTubeVideo} folder_id={this.props.params.id} />
      );
    } else if (view == "search") {
      searchClass = `${viewClass} active`;
    } else if (view == "all" || view == "") {
      allClass = `${viewClass} active`;
    }

    let showLinks = links.map(link => {
      if (view == "" || view == "all" || view == "links") {
        let handleLinkDelete = () => {
          this.deleteLink(linkitem.id);
        };
        return (
          <LinkItem
            key={link.id}
            id={link.id}
            title={link.title}
            content={link.content}
            handleDelete={handleLinkDelete}
          />
        );
      }
    });

    let showNotes = notes.map(note => {
      if (view == "" || view == "all" || view == "notes") {
        let handleNoteDelete = () => {
          this.deleteNote(note.id);
        };
        return (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            handleDelete={handleNoteDelete}
          />
        );
      }
    });

    let showSnippets = snippets.map(snippet => {
      if (view == "" || view == "all" || view == "snippets") {
        let handleSnippetDelete = () => {
          this.deleteSnippet(snippet.id);
        };
        return (
          <Snippet
            key={snippet.id}
            id={snippet.id}
            title={snippet.title}
            content={snippet.content}
            handleDelete={handleSnippetDelete}
          />
        );
      }
    });

    videos.sort(function(a, b) {
      return new Date(b.created_at) - new Date(a.created_at);
    });
    let showVideos = videos.map(video => {
      if (view == "" || view == "all" || view == "videos") {
        let handleVideoDelete = () => {
          this.deleteVideo(video.id);
        };
        return (
          <Video
            key={video.id}
            id={video.id}
            title={video.title}
            youtube={video.youtube}
            handleDelete={handleVideoDelete}
          />
        );
      }
    });

    return (
      <div>
        {/* Secondary Bar */}
        <div className="secondarybar">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-auto">
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <a className={allClass} id="all" onClick={this.handleViewChange}>
                      All <span className="badge badge-pill badge-primary">{totalCount}</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className={notesClass} id="notes" onClick={this.handleViewChange}>
                      Note <span className="badge badge-pill badge-primary">{notesCount}</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className={videosClass} id="videos" onClick={this.handleViewChange}>
                      Video <span className="badge badge-pill badge-primary">{videosCount}</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className={snippetsClass} id="snippets" onClick={this.handleViewChange}>
                      Snippet <span className="badge badge-pill badge-primary">{snippetsCount}</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className={linksClass} id="links" onClick={this.handleViewChange}>
                      Link <span className="badge badge-pill badge-primary">{linksCount}</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className={searchClass} id="search" onClick={this.handleViewChange}>
                      Search
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col" />
              <div className="col-md-auto" />
              <div className="col-md-auto">
                <Link to={`/folders/${folder_id}/notes/new`}>
                  <i className="fas fa-plus-circle new" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Notes */}
        <div className="container">
          <div className="material-columns">{showNotes}</div>
        </div>
        {/* Videos */}
        <div className="container">
          <div className="video-columns">{showVideos}</div>
        </div>
        {/* Snippets */}
        <div className="container">
          <div className="video-columns">{showSnippets}</div>
        </div>
        {/* Links */}
        <div className="container">
          <div className="row">{showLinks}</div>
        </div>
        {/* Search */}
        <div>{searchTab}</div>
      </div>
    );
  }
}

export default MaterialsContainer;
