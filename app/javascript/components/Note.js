import React from "react";
import { Link } from "react-router";

const Note = props => {
  return (
    <div className="material yellow">
      <div className="material-header">{props.title}</div>
      <div className="material-body">
        <p className="material-text">{props.content}</p>
      </div>
      <div className="material-footer text-right">
        <i className="fas fa-pencil-alt" />
        <i className="fas fa-trash-alt" onClick={props.handleDelete} />
      </div>
    </div>
  );
};

export default Note;