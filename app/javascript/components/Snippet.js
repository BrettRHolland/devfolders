import React from 'react';
import { Link } from 'react-router'

const Snippet = (props) => {
  return(
    <div className="col-sm-3">
      <div className="card material-video">
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.content}</p>
        </div>
      </div>
    </div>

  )
}

export default Snippet;
