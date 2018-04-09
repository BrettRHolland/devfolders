import React from "react";
import { Link } from "react-router";

const VideoForm = props => {
  return (
    <div>
      <div className="form-item">
        <label>Title</label>
        <input type="text" name="title" onChange={props.handleTitleChange} />
      </div>

      <div className="form-item">
        <label>Video ID</label>
        <input
          type="text"
          name="youtube"
          onChange={props.handleYouTubeChange}
        />
      </div>
      <div className="button-group">
        <button className="button button-blue" type="submit" value="Submit">
          Submit
        </button>
      </div>
    </div>
  );
};

export default VideoForm;