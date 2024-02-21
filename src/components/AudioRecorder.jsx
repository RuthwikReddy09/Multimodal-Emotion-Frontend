import { useState, useRef } from "react";
import axios from "axios";
import "../styles/AudioRecorder.css"
import { useEffect } from "react";
const AudioRecorder = () => {
    const [audiopermission, setAudioPermission] = useState(false);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);
    const [emotion,setEmotion] = useState("neutral");
    const mimeType = "audio/wav";


    useEffect(()=>{
      const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
          try {
            const streamData = await navigator.mediaDevices.getUserMedia({
              audio: true,
              video: false,
            });
            setAudioPermission(true);
            setStream(streamData);
          } catch (err) {
            alert(err.message);
          }
        } else {
          alert("The MediaRecorder API is not supported in your browser.");
        }
      };
      getMicrophonePermission();
    },[])

  const startRecording = async () => {
    setRecordingStatus("recording");
    const media = new MediaRecorder(stream, { type: mimeType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");
    setEmotion("...");
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const audioUrl = URL.createObjectURL(audioBlob);
      
      setAudio(audioUrl);
      console.log(audioUrl)
      setAudioChunks([]);
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recorded_audio.wav');
  
      axios.post('http://127.0.0.1:8000/upload-audio', formData)
        .then(response => {
          console.log('Audio uploaded successfully:', response.data);
          setEmotion(response.data)
        })
        .catch(error => {
          console.error('Error uploading audio:', error);
        });
    };
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (recordingStatus === "recording") {
        stopRecording();
        console.log("audio sent after 5s")
        startRecording();
      }
    }, 5000); // Send audio every 5 seconds

    return () => clearInterval(interval);
  }, [recordingStatus]);
  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setAudioPermission(true);
        setStream(streamData);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };
  return (
    <div className="audio-result">
    <p>Emotion: {emotion}</p>
    <div className="audioContainer">
      <h2>Audio Recorder</h2>
      <main>
        <div className="audio-controls">
          {!audiopermission ? (
            <button onClick={getMicrophonePermission} type="button">
              Get Microphone
            </button>
          ) : null}
          {audiopermission && recordingStatus === "inactive" ? (
            <button onClick={startRecording} type="button">
              Start Recording
            </button>
          ) : null}
          {recordingStatus === "recording" ? (
            <button onClick={stopRecording} type="button">
              Stop Recording
            </button>
          ) : null}
        </div>
        <br />
        {audio ? (
          <div className="audio-container">
     <audio src={audio} controls></audio> <br />
     <a  download="audio" href={audio}>
        Download Recording
     </a>
   </div>
) : null}
      </main>
    </div>
</div>
  );
};
export default AudioRecorder;
