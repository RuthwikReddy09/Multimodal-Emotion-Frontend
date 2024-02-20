import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import "../styles/VideoRecorder.css";
import { CiUser } from "react-icons/ci";
const VideoRecorder = () => {
  // const handleImageError = (event) => {
  //   event.target.style.display = 'none';
  //   console.error('Error loading image:', event.target.src);
  // };
  return (
    <div className="VideoRecorder">
        <img src="http://127.0.0.1:5000/video_feed" className="video" alt="" />
      <div className="user-logo">
        <CiUser size={100}/>
      </div>
    </div>
  );
};


export default VideoRecorder;

