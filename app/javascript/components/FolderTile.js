import React from "react";
import { Link } from "react-router";

const FolderTile = props => {
  let cardClass = `folder ${props.color}`;
  let linkClass = `tile-link text-${props.color}`
  return (
    <div className="col-sm-12 col-md-6 col-lg-4">
      <div className={cardClass}>
        <Link className={linkClass} to={`/folders/${props.id}`}>
          <div className="folder-body">
            <span className="folder-title">{props.topic}</span>
          </div>
        </Link>
        <div className="folder-footer text-right">
          <i className="fas fa-pencil-alt" />
          <i className="fas fa-trash-alt" onClick={props.handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default FolderTile;