import React, { Component } from "react";
import { browserHistory } from "react-router";

class FolderFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: "",
      category: "",
      errors: {}
    };
    this.handleTopicChange = this.handleTopicChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.validateTopic = this.validateTopic.bind(this);
    this.validateCategory = this.validateCategory.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addNewFolder = this.addNewFolder.bind(this);
  }

  handleTopicChange(event) {
    this.setState({ topic: event.target.value });
  }

  handleCategoryChange(event) {
    this.setState({ category: event.target.value });
  }

  validateTopic(topic) {
    if (topic === "" || topic === " ") {
      let newError = { topic: "Topic may not be blank." };
      this.setState({ errors: Object.assign(this.state.errors, newError) });
      return false;
    } else {
      let errorState = this.state.errors;
      delete errorState.topic;
      this.setState({ errors: errorState });
      return true;
    }
  }

  validateCategory(category) {
    if (category === "" || category === " ") {
      let newError = { category: "Category may not be blank." };
      this.setState({ errors: Object.assign(this.state.errors, newError) });
      return false;
    } else {
      let errorState = this.state.errors;
      delete errorState.category;
      this.setState({ errors: errorState });
      return true;
    }
  }

  handleClear(event) {
    event.preventDefault();
    this.setState({ topic: "", category: "" });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (
      this.validateTopic(this.state.topic) &&
      this.validateCategory(this.state.category)
    ) {
      let formPayload = {
        topic: this.state.topic,
        category: this.state.category
      };
      this.addNewFolder(formPayload);
      this.handleClear(event);
    }
  }

  addNewFolder(submission) {
    fetch(`/api/v1/folders/`, {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(submission),
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
      .then(body => browserHistory.push(`/`))
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let errorDiv;
    let errorItems;
    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return <span key={error}>{error} </span>;
      });
      errorDiv = <div className="alert red">{errorItems}</div>;
    }
    return (
      <div className="container margin-top">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 col-sm-12">
            <h3>Add a folder</h3>
            <form onSubmit={this.handleSubmit}>
              {errorDiv}

              <div className="form-item">
                <label>Topic</label>
                <input
                  type="text"
                  name="topic"
                  onChange={this.handleTopicChange}
                  value={this.state.topic}
                />
              </div>

              <div className="form-item">
                <label>Category</label>
                <select
                  value={this.state.category}
                  onChange={this.handleCategoryChange}>
                  <option value="">Select a category...</option>
                  <option value="language">Language</option>
                  <option value="framework" className="blue">
                    Framework
                  </option>
                  <option value="database">Database</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="button-group">
                <button
                  className="button button-gray"
                  onClick={this.handleClear}>
                  Clear
                </button>
                <button
                  className="button button-blue"
                  type="submit"
                  value="Submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default FolderFormContainer;