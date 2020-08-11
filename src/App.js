import React from 'react';
import './App.css';
import Post from './Post';

function App() {
  return (
    <div className="app">

    {/* using bem convention */}
    <div className="app__header">
      <img className="app__headerImage" 
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt="insta logo"/>   
    </div>
      {/* Header */}
      {/* Posts */}
      <Post imageUrl={'https://wallpaperaccess.com/full/119615.jpg'} />
      <Post />
      <Post />
      <Post />
      {/* Posts */}

    </div>
  );
}

export default App;
