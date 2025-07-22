
import React, { useState } from 'react'

const MoodSong = () => {

    const [songs, setSongs] = useState([{
        name: 'Song 1',
        artist: 'Artist 1',
        audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
        name: 'Song 2',
        artist: 'Artist 2',
        audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    }])


  return (
    <div>

        <div>

            <h1>Reccomended Songs</h1>

            <div>
                {songs.map((song, index) => (
                    <div key={index}>
                      
                        <h2>{song.name}</h2>
                        <p>{song.artist}</p>
                        <button> Play</button>
                    </div>

                ))}
            </div>
        </div>

          
    
    
    </div>
  )
}

export default MoodSong