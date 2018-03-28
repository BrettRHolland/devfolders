import React, {Component} from 'react';
import FolderTile from './FolderTile';

class FoldersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: []
    }
  }

  componentDidMount() {
    fetch('/api/v1/folders', {credentials: 'same-origin'}).then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json()).then(body => {
      this.setState({folders: body.folders});     
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let folders = this.state.folders

    let renderFolders = folders.map(board => {
      return (
        <FolderTile 
        key={board.id} 
        id={board.id} 
        topic={board.topic} 
        color={board.color}
        />
      )
    })

    return (
    <div className="container">
    <div className="row">
      {renderFolders}
      </div>
    </div>
    )
  }
}

export default FoldersContainer;