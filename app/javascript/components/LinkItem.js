import React from "react";
import { Link } from "react-router";

const LinkItem = props => {
  return (
    <div className="col-sm-12">
      <div className="link gray">
        <div className="link-body">
          <a href={props.content} target="_blank">
            {props.title}
          </a>

        <i className="fas fa-trash-alt" onClick={props.handleDelete} />
        <i className="fas fa-pencil-alt" />
        </div>
      </div>
    </div>
  );
};

export default LinkItem;