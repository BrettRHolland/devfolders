import React from 'react';

const FolderListItem = (props) => {
  let cardClass = `col-12 mb-1 py-3 ${props.color}`
  return(
    <div className={cardClass}>
      {props.topic} (Last updated at {props.updated})
    </div>
  )
}

export default FolderListItem;
