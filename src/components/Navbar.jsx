import React from 'react'
import "../styles/Navbar.css"
const Navbar = () => {
  return (
    <div className='nav'>
        <div className="logo">
            MultiModal Emotion Recognition system.
        </div>
        <div className="links">
            <a href="#" className="link">Home</a>
            <a href="#" className="link">About</a>
            <a href="#" className="link">Contact</a>
        </div>
    </div>
  )
}

export default Navbar