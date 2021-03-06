import React, {useState, useEffect} from 'react'
import NavBar from './NavBar';
import SongList from './SongList';
import WebPlayback from './WebPlayback'


export default function Recommendation() {
  
  const [user, setUser] = useState('')
  const [displaySong, setDisplaySong] = useState('')
  const [currentAudio, setCurrentAudio] = useState('')

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  function resetBackground() {
    document.body.style = "background: black"
  }

  function displayDetails(obj){
    setDisplaySong(obj)

    if(currentAudio != ''){
      currentAudio.pause()
    }
    var audio = new Audio(obj.songPreview)
    setCurrentAudio(audio)
    audio.play();
  }

  function playPause(){
    if(currentAudio != ''){
      currentAudio.paused ? currentAudio.play() : currentAudio.pause()
    }
  }
  
  return (

    <>
      {resetBackground()}
      <NavBar/>
      <div className = "recommendationsContainer">
        <div className = "recommendationsColumn">
        <h1>Recommendations for {user.username}</h1>
        <div className = "recommendationsList">
        {user 
        ? (<>
          <SongList data = {user.songs} displayDetails = {(obj) => displayDetails(obj)}/>
          {/* <WebPlayback token = {user.access_token}/> */}
          </>) 
        : (<h2>Loading...</h2>)}
        </div>
        </div>


        {displaySong 
        ? <div className = "recommendationsCard">
        <img src = {displaySong.albumImage} className = "recommendationsCardImage" onClick = {playPause}></img>
        <div className = "recommendationsCardDetails">
          <a href={displaySong.songURL}>Name: {displaySong.songName}</a>
          <div className = "break"></div>
          <a href={displaySong.albumURL}>Album: {displaySong.albumName}</a>
          <div className = "break"></div>
          <a href={displaySong.artistURL}>Artist: {displaySong.artistName}</a>
          <div className = "break"></div>
        </div>
      </div>
      : <></>}
        
      </div>
    </>
  )
}