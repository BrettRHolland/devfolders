import React from 'react';
import { Link } from 'react-router'

const FolderTile = (props) => {
  let cardClass = `folder ${props.color}`
  return(

    <div className="col-sm-12 col-md-4 col-lg-3 mb-5">
    <Link className="folder-link" to={`/folders/${props.id}`}>
    <div className={cardClass}>
    <span className="folder-name">{props.topic}</span>
    </div>
    </Link>
    </div>
  )
}

export default FolderTile;
