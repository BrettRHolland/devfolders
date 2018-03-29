import React, {Component} from 'react';
import FolderTile from './FolderTile';
import FolderListItem from './FolderListItem';
import { Link } from 'react-router'

class FoldersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      arrange: 'grid'
    }
    this.handleArrangeChange = this.handleArrangeChange.bind(this);
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

  handleArrangeChange(event) {
    if (this.state.arrange=='grid') {
      this.setState({arrange: 'list'})
    } else {
      this.setState({arrange: 'grid'})
    }
  }

  render() {
    let folders = this.state.folders
    let arrange = this.state.arrange
    let arrangeIcon = 'grid'
    if (arrange=='grid') {
      arrangeIcon = 'fas fa-th'
    } else {
      arrangeIcon = 'fas fa-list'
    }

    let renderFolders = folders.map(board => {
      if(arrange=='grid') {
        return (

          <FolderTile
          key={board.id}
          id={board.id}
          topic={board.topic}
          color={board.color}
          />
        )
      }
      if(arrange=='list') {
        return (
          <FolderListItem
          key={board.id}
          id={board.id}
          topic={board.topic}
          color={board.color}
          updated={board.updated_at}
          />
        )
      }
    })

    return (
      <div>
      <div className="secondarybar mb-5">
      <div className="container">
      <div className="row align-items-center">
      <div className="col-md-auto"></div>
      <div className="col">

      </div>
      <div className="col-md-auto"><i className={arrangeIcon} onClick={this.handleArrangeChange}></i></div>
      <div className="col-md-auto"><Link to={`/folders/new`}><i className="fas fa-plus-circle new"></i></Link></div>
      </div>
      </div>
      </div>
      <div className="container">
      <div className="row">
      {renderFolders}
      </div>
      </div>
      </div>
    )
  }
}

export default FoldersContainer;
