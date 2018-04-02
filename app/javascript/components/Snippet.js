import React from 'react';
import { Link } from 'react-router'

const Snippet = (props) => {
  return(
    <div className="material blue">
      <div className="material-header">{props.title}</div>
      <div className="material-body">
        <p className="material-text">{props.content}</p>
      </div>
      <div className="material-footer text-right">
        <i className="fas fa-pencil-alt"></i><i className="fas fa-trash-alt"></i>
      </div>
    </div>
  )
}

export default Snippet;



