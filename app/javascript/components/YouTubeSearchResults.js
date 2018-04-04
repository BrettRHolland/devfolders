import React from "react";
import YouTubeSearchResult from "./YouTubeSearchResult";

const YouTubeSearchResults = props => {
  let videos = props.videos;
  const videoResult = videos.map(video => (
    <YouTubeSearchResult
      key={video.etag}
      video={video}
      folder_id={props.folder_id}
      saveYouTubeVideo={props.saveYouTubeVideo}
    />
  ));

  return <div className="video-columns margin-top-small">{videoResult}</div>;
};

export default YouTubeSearchResults;