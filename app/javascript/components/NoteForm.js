import React from "react";
import { Link } from "react-router";

const NoteForm = props => {
  return (
    <div>
      <div className="form-item">
        <label>Title</label>
        <input type="text" name="title" onChange={props.handleTitleChange} />
      </div>

      <div className="form-item">
        <label>Note</label>
        <textarea
          type="text"
          name="content"
          onChange={props.handleContentChange}
        />
      </div>
      <div className="button-group">
        <button className="button button-red" type="submit" value="Submit">
          Submit
        </button>
      </div>
    </div>
  );
};

export default NoteForm;