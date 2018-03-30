import React from 'react';
import { Link } from 'react-router'

const Video = (props) => {
  let videoLink = `https://www.youtube.com/embed/${props.youtube}?rel=0&amp;showinfo=0`
  return(
    <div className="col-sm-6 mb-3">
    <div className="card material-video">
    <div className="card-body">
    <h5 className="card-title">{props.title}</h5>
    <div className="video-container"><iframe width="560" height="315" src={videoLink} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe></div>
    </div>
    </div>
    </div>

  )
}

export default Video;
