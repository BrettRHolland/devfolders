import React from 'react';

const FolderTile = (props) => {
  let cardClass = `folder ${props.color}`
  return(    

    <div className="col-sm-12 col-md-4 col-lg-3 mb-5">
      <a href="#" className="folder-link">
        <div className={cardClass}>
        <span className="folder-name">{props.topic}</span>
        </div>
      </a> 
    </div>
    )
}

export default FolderTile;