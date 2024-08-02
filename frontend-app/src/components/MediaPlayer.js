// frontend/src/components/MediaPlayer.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './index.css'
const MediaPlayer = ( props ) => {
    const [media, setMedia] = useState(null);
const {id} = useParams();
console.log(id,'<-----')

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/media/${id}`);
                setMedia(response.data);
            } catch (error) {
                console.error('Error fetching media:', error);
            }
        };

        fetchMedia();
    }, [id]);

    if (!media) return <p>Loading...</p>;

    return (
        <div className='container' style={{flex:1,display:'flex',flexDirection:"column",justifyContent:'center',alignItems:'center',}}>
                    <h1 className='mainheading'>Video Player</h1>

            <video width="600" controls autoPlay>
                <source src={media.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default MediaPlayer;
