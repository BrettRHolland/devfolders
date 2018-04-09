import React, { Component } from "react";
import FolderTile from "./FolderTile";
import FolderListItem from "./FolderListItem";
import { Link } from "react-router";
import { browserHistory } from "react-router";

class FoldersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      languageCount: 0,
      frameworkCount: 0,
      databaseCount: 0,
      otherCount: 0,
      arrange: "grid",
      view: ""
    };
    this.handleArrangeChange = this.handleArrangeChange.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
    this.handleFolderDelete = this.handleFolderDelete.bind(this);
  }

  componentDidMount() {
    fetch("/api/v1/folders", { credentials: "same-origin" })
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
          folders: body.folders,
          languageCount: body.language_count,
          frameworkCount: body.framework_count,
          databaseCount: body.database_count,
          otherCount: body.other_count
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleArrangeChange(event) {
    if (this.state.arrange == "grid") {
      this.setState({ arrange: "list" });
    } else {
      this.setState({ arrange: "grid" });
    }
  }

  handleViewChange(e) {
    this.setState({ view: e.target.id });
  }

  handleFolderDelete(folder_id) {
    fetch(`/api/v1/folders/${folder_id}`, {
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
        this.setState({
          folders: body.folders,
          languageCount: body.language_count,
          frameworkCount: body.framework_count,
          databaseCount: body.database_count,
          otherCount: body.other_count
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let viewClass = "nav-link";
    let allClass = viewClass;
    let otherClass = viewClass;
    let languageClass = viewClass;
    let frameworkClass = viewClass;
    let databaseClass = viewClass;
    let folders = this.state.folders;
    let arrange = this.state.arrange;
    let arrangeIcon = "grid";
    let view = this.state.view;
    let languageCount = this.state.languageCount;
    let frameworkCount = this.state.frameworkCount;
    let databaseCount = this.state.databaseCount;
    let otherCount = this.state.otherCount;
    let totalCount =
      this.state.languageCount +
      this.state.frameworkCount +
      this.state.databaseCount +
      this.state.otherCount;

    if (arrange == "grid") {
      arrangeIcon = "fas fa-list";
    } else {
      arrangeIcon = "fas fa-th";
    }

    if (view == "language") {
      languageClass = `${viewClass} active`;
    } else if (view == "framework") {
      frameworkClass = `${viewClass} active`;
    } else if (view == "database") {
      databaseClass = `${viewClass} active`;
    } else if (view == "other") {
      otherClass = `${viewClass} active`;
    } else if (view == "all" || view == "") {
      allClass = `${viewClass} active`;
    }

    let renderFolders = folders.map(folder => {
      let handleDelete = () => {
        this.handleFolderDelete(folder.id);
      };
      if (arrange == "grid" && view == "all" || view == "") {
        return (
          <FolderTile
            key={folder.id}
            id={folder.id}
            topic={folder.topic}
            category={folder.category}
            handleDelete={handleDelete}
          />
        );
      } else if (arrange == "grid" && view == "language" && folder.category == "language") {
        return (
          <FolderTile
            key={folder.id}
            id={folder.id}
            topic={folder.topic}
            category={folder.category}
            handleDelete={handleDelete}
          />
        );
      } else if (arrange == "grid" && view == "framework" && folder.category == "framework") {
        return (
          <FolderTile
            key={folder.id}
            id={folder.id}
            topic={folder.topic}
            category={folder.category}
            handleDelete={handleDelete}
          />
        );
      } else if (arrange == "grid" && view == "database" && folder.category == "database") {
        return (
          <FolderTile
            key={folder.id}
            id={folder.id}
            topic={folder.topic}
            category={folder.category}
            handleDelete={handleDelete}
          />
        );
      } else if (arrange == "grid" && view == "other" && folder.category == "other") {
        return (
          <FolderTile
            key={folder.id}
            id={folder.id}
            topic={folder.topic}
            category={folder.category}
            handleDelete={handleDelete}
          />
        );
      }

      if (arrange == "list") {
        return (
          <FolderListItem
            key={folder.id}
            id={folder.id}
            topic={folder.topic}
            category={folder.category}
            updated={folder.updated_at}
            handleDelete={handleDelete}
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
                      All
                      <span className="badge badge-pill badge-primary">{totalCount}</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className={languageClass} id="language" onClick={this.handleViewChange}>
                      Language
                      <span className="badge badge-pill badge-primary">{languageCount}</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className={frameworkClass} id="framework" onClick={this.handleViewChange}>
                      Framework
                      <span className="badge badge-pill badge-primary">{frameworkCount}</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className={databaseClass} id="database" onClick={this.handleViewChange}>
                      Database
                      <span className="badge badge-pill badge-primary">{databaseCount}</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className={otherClass} id="other" onClick={this.handleViewChange}>
                      Other
                      <span className="badge badge-pill badge-primary">{otherCount}</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col" />
              <div className="col-md-auto">
                <i className={arrangeIcon} onClick={this.handleArrangeChange} />
              </div>
              <div className="col-md-auto">
                <Link to={`/folders/new`}>
                  <i className="fas fa-plus-circle new" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Folders */}
        <div className="container">
          <div className="row">{renderFolders}</div>
        </div>
      </div>
    );
  }
}

export default FoldersContainer;