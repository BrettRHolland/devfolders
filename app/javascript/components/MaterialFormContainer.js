import React, { Component } from "react";
import { browserHistory } from "react-router";
import NoteForm from "./NoteForm";
import SnippetForm from "./SnippetForm";
import LinkForm from "./LinkForm";
import VideoForm from "./VideoForm";

class MaterialFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      folder_id: "",
      title: "",
      content: "",
      youtube: "",
      notes: "",
      links: ""
    };

    this.handleCategorySelection = this.handleCategorySelection.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleYouTubeChange = this.handleYouTubeChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addNote = this.addNote.bind(this);
    this.addLink = this.addLink.bind(this);
    this.addSnippet = this.addSnippet.bind(this);
    this.addVideo = this.addVideo.bind(this);
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleContentChange(event) {
    this.setState({ content: event.target.value });
  }

  handleYouTubeChange(event) {
    this.setState({ youtube: event.target.value });
  }

  handleClear(event) {
    event.preventDefault();
    this.setState({ title: "", content: "", youtube: "", notes: "", links: "" });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.category == "note") {
      let formPayload = {
        folder_id: this.props.params.id,
        title: this.state.title,
        content: this.state.content
      };
      this.addNote(formPayload);
      this.handleClear(event);
    } else if (this.state.category == "link") {
      let formPayload = {
        folder_id: this.props.params.id,
        title: this.state.title,
        content: this.state.content
      };
      this.addLink(formPayload);
      this.handleClear(event);
    } else if (this.state.category == "snippet") {
      let formPayload = {
        folder_id: this.props.params.id,
        title: this.state.title,
        content: this.state.content
      };
      this.addSnippet(formPayload);
      this.handleClear(event);
    } else if (this.state.category == "video") {
      let formPayload = {
        folder_id: this.props.params.id,
        title: this.state.title,
        youtube: this.state.youtube
      };
      this.addVideo(formPayload);
      this.handleClear(event);
    }
  }

  handleCategorySelection(event) {
    this.setState({ category: event.target.value });
  }

  addNote(submission) {
    fetch(`/api/v1/folders/${submission.folder_id}/notes`, {
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
      .then(body => browserHistory.push(`/folders/${submission.folder_id}`))
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addLink(submission) {
    fetch(`/api/v1/folders/${submission.folder_id}/links`, {
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
      .then(body => browserHistory.push(`/folders/${submission.folder_id}`))
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addSnippet(submission) {
    fetch(`/api/v1/folders/${submission.folder_id}/snippets`, {
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
      .then(body => browserHistory.push(`/folders/${submission.folder_id}`))
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addVideo(submission) {
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
      .then(body => browserHistory.push(`/folders/${submission.folder_id}`))
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let category = this.state.category;
    let formShow;
    if (category == "note") {
      formShow = (
        <NoteForm
          addNote={this.addNote}
          handleTitleChange={this.handleTitleChange}
          handleContentChange={this.handleContentChange}
        />
      );
    } else if (category == "snippet") {
      formShow = (
        <SnippetForm
          addSnippet={this.addSnippet}
          handleTitleChange={this.handleTitleChange}
          handleContentChange={this.handleContentChange}
        />
      );
    } else if (category == "link") {
      formShow = (
        <LinkForm
          addLink={this.addLink}
          handleTitleChange={this.handleTitleChange}
          handleContentChange={this.handleContentChange}
        />
      );
    } else if (category == "video") {
      formShow = (
        <VideoForm
          addVideo={this.addVideo}
          handleTitleChange={this.handleTitleChange}
          handleYouTubeChange={this.handleYouTubeChange}
        />
      );
    } else {
      formShow = "";
    }
    return (
      <div className="container margin-top">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 col-sm-12">
            <h3>Add a material</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="form-item">
                <select
                  value={category}
                  onChange={this.handleCategorySelection}>
                  <option value="">Select a material...</option>
                  <option value="note">Note</option>
                  <option value="video">Video</option>
                  <option value="link">Link</option>
                  <option value="snippet">Snippet</option>
                </select>
              </div>
              {formShow}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default MaterialFormContainer;