import React from "react";
import { Link } from "react-router";

const StackOverflowSearchResult = props => {
  let questionLink = `https://stackoverflow.com/q/${props.id}`;
  let formattedAnswer;
  if(props.answer) {
    formattedAnswer = 
    <div className="stack-tile material red margin-top-small">
      <div className="material-header">
        Accepted Answer
      </div>
      <div className="material-body">
        <div dangerouslySetInnerHTML={{ __html: props.answer }} />
      </div>
    </div>
  }

  return (
    <div>
    <div className="stack-tile material gray margin-top-small">
      <div className="material-header">
        <a href={questionLink} target="_blank">
          {props.title} {props.accepted_answer_id}
        </a>
      </div>
      <div className="material-body">
        <div dangerouslySetInnerHTML={{ __html: props.body }} />
      </div>
      <div className="material-footer text-right">
        <i className="fas fa-angle-double-down" onClick={props.handleClick} />
        <i className="fas fa-plus" />
      </div>
    </div>
      {formattedAnswer}
    </div>
  );
};

export default StackOverflowSearchResult;