import React from "react";
import { Link } from "react-router";

const Video = props => {
  let videoLink = `https://www.youtube.com/embed/${props.youtube}?rel=0&amp;showinfo=0`;
  return (
    <div className="material red">
      <div className="material-header">{props.title}</div>
      <div className="material-body">
        <div className="embed-responsive embed-responsive-16by9">
          <iframe
            className="embed-responsive-item"
            src={videoLink}
            allowFullScreen
          />
        </div>
      </div>
      <div className="material-footer text-right">
        <i className="fas fa-pencil-alt" />
        <i className="fas fa-trash-alt" onClick={props.handleDelete} />
      </div>
    </div>
  );
};

export default Video;