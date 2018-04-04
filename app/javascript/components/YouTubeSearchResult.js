import React from "react";
import { browserHistory } from "react-router";

const YouTubeSearchResult = props => {
  let video = props.video;
  let title = video.snippet.title;
  let description = video.snippet.description;
  let image = video.snippet.thumbnails.medium.url;
  let videoId = video.id.videoId;
  let videoLink = `https://www.youtube.com/embed/${videoId}?rel=0&amp;showinfo=0`;
  let folder_id = props.folder_id;
  
  const handleSearchedVideoClick = e => {
    let formPayload = {
      folder_id: folder_id,
      youtube: videoId,
      title: title
    };
    props.saveYouTubeVideo(formPayload);
  };

  return (
    <div className="material gray">
      <div className="material-header">{title}</div>
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
        <i className="fas fa-plus" onClick={handleSearchedVideoClick} />
      </div>
    </div>
  );
};

export default YouTubeSearchResult;