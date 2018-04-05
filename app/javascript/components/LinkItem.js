import React from "react";
import { Link } from "react-router";

const LinkItem = props => {
  return (
    <div className="material gray">
      <div className="material-header">
        <a href={props.content} target="_blank">
          {props.title}
        </a>
      </div>
      <div className="material-footer text-right">
        <i className="fas fa-trash-alt" onClick={props.handleDelete} />
      </div>
    </div>
  );
};

export default LinkItem;