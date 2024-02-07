import React from "react";
import Webcam from "react-webcam";
import "../styles/VideoRecorder.css";
const VideoRecorder = () => {

  return (
    <div className="VideoRecorder">
        <div className="video">
        <img src="http://127.0.0.1:5000/video_feed" alt="Video"/>
        </div>
    </div>
  );
};


export default VideoRecorder;
