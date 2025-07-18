import React from 'react'
import { useState } from 'react'
import './MoodSong.css'

const MoodSongs = () => {


    const [ Songs, setSongs ] = useState([
        {
            title: "test_title_01",
            artist: "test_artist_01",
            url: "test_url_01",
        },
        {
            title: "test_title_02",
            artist: "test_artist_02",
            url: "test_url_02",
        },
        {
            title: "test_title_03",
            artist: "test_artist_03",
            url: "test_url_03",
        },
    ])


    return (
        <div className='mood-songs'>
            <h2>Recommended Songs</h2>

            {Songs.map((song, index) => (
                <div className='song' key={index}>
                    <div className="title">
                        <h3>{song.title}</h3>
                        <p>{song.artist}</p>
                    </div>
                    <div className="play-pause-button">
                        <i className="ri-pause-line"></i>
                        <i className="ri-play-circle-fill"></i>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default MoodSongs