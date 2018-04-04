import React from "react";
import { Link } from "react-router";

const StackOverflowSearchResult = props => {
  let questionLink = `https://stackoverflow.com/q/${props.id}`;
  return (
    <div className="material gray margin-top-small">
      <div className="material-header">
        <a href={questionLink} target="_blank">
          {props.title}
        </a>
      </div>
      <div className="material-body">
        <p className="material-text">{props.body}</p>
      </div>
      <div className="material-footer text-right">
        <i className="fas fa-plus" onClick="" />
      </div>
    </div>
  );
};

export default StackOverflowSearchResult;