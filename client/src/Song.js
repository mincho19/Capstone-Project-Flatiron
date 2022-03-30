import React from 'react'
import {Container } from 'react-bootstrap'


export default function Song({songName, songPreview, songDuration, albumName, albumImage, albumURL, artistName, artistURL, createdAt, displayDetails}) {
  

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
}

  function handleClick(songObject){
    displayDetails(songObject)
  }

// WANT TO PLAY BY HOVER
  
  return (
    <Container className = "songCard" onClick = {() => handleClick({songName, songPreview, songDuration, albumName, albumImage, albumURL, artistName, artistURL, createdAt})}>
      <img  className = "recommendationsImage" src= {albumImage} alt = "No Album Cover Available"></img> 
      <h1 className = "songName">{songName} - {artistName}</h1>
      <h1 className = "songData">Added On: {createdAt} - Duration: {millisToMinutesAndSeconds(songDuration)}</h1>
    </Container>
  )
}
