import { useState } from 'react'
import './App.css'
import AudioRecorder from './components/AudioRecorder'
import VideoRecorder from './components/VideoRecorder'
import Navbar from './components/Navbar'

function App() {

  return (
    <div className='Home'>
      <Navbar/>
      <VideoRecorder/>
      <AudioRecorder/>
    </div>
  ) 
}

export default App
