import React, { Component } from 'react';
import {browserHistory} from 'react-router';

class FolderFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topic: '',
      color: 'default',
      errors: {}
    }
    this.handleTopicChange = this.handleTopicChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.validateTopic = this.validateTopic.bind(this);
    this.validateColor= this.validateColor.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addNewFolder = this.addNewFolder.bind(this);
  }

  handleTopicChange(event) {
    this.setState({topic: event.target.value})
  }

  handleColorChange(event) {
    this.setState({color: event.target.value})
  }

  validateTopic(topic) {
    if (topic === '' || topic === ' ') {
      let newError = { topic: 'Topic may not be blank.' }
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.topic
      this.setState({ errors: errorState })
      return true
    }
  }

  validateColor(color) {
    if (color === '' || color === ' ') {
      let newError = { color: 'Color may not be blank.' }
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.color
      this.setState({ errors: errorState })
      return true
    }
  }

  handleClear(event) {
    event.preventDefault();
    this.setState({topic: '', color: ''})
  }

  handleSubmit(event) {
    event.preventDefault();
    if (
      this.validateTopic(this.state.topic) &&
      this.validateColor(this.state.color)
    )
    {
      let formPayload = {
        topic: this.state.topic,
        color: this.state.color
      }

      this.addNewFolder(formPayload)
      this.handleClear(event);
    }
  }

  addNewFolder(submission) {
    fetch(`/api/v1/folders/`, {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(submission),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
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
    .then(body => browserHistory.push(`/`))
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let errorDiv;
    let errorItems;
    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      })
      errorDiv = <div className="callout alert">{errorItems}</div>
    }
    return(
      <div className="container mt-5">
      <div className="row justify-content-center">
      <div className="col-lg-6 col-md-8 col-sm-12">
      <h3>Add a folder</h3>
      <form onSubmit={this.handleSubmit}>
        {errorDiv}

        <div className="form-group">
		    <label>Topic</label>
		    <input type="text" name="topic" className="form-control" onChange={this.handleTopicChange} />
		  </div>
        <div className="form-group">
		    <label>Color</label>
		    <select value={this.state.color} className="form-control" onChange={this.handleColorChange}>
		      <option value="default">Gray</option>
		      <option value="blue" className="blue">Blue</option>
		      <option value="red">Red</option>
		      <option value="green">Green</option>
		    </select>
		  </div>

        <div className="button-group">
          <button className="btn btn-light mr-3" onClick={this.handleClear}>Clear</button>
          <button className="btn btn-primary" type="submit" value="Submit">Submit</button>
        </div>
      </form>
    </div>
    </div>
    </div>
    )
  }
}

export default FolderFormContainer;