import React from 'react';
import VideoListItem from './VideoListItem';

const VideoList = (props) => {
  let videos = props.videos
  const videoItems = videos.map(video => (
    <VideoListItem
      key={video.etag}
      video={video}
      folder_id={props.folder_id}
      addVideo={props.addVideo}
    />
  ));

  return (
    
      <div className="video-columns">
        {videoItems}
      </div>
    
  );
};

export default VideoList;