// frontend/src/components/MediaList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'
const MediaList = () => {
    const [mediaList, setMediaList] = useState([]);
    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const response = await axios.get('http://localhost:5000/media');
                setMediaList(response.data);
            } catch (error) {
                console.error('Error fetching media list:', error);
            }
        };

        fetchMedia();
    }, []);



    

    const getDetails = (id) => {
        navigation(`/media/${id}`)
    }
    return (
        <div className='container'>
            <h1 className='heading'>Media list</h1>
            <button 
            style={{
                backgroundColor: "#0062ff",
                color: 'white',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: "center",
                alignSelf: 'flex-end',
                borderWidth: 0,
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                marginTop: 0,
                padding: 10, 
                borderRadius: 10, 
                width: "10%", 
                marginBottom: 5
            }}
            > Upload Image</button>
            <div className='innercontainer2' >
                {mediaList.map(media => (
                    <div className='container3' key={media.id} >

                        <div style={{ backgroundColor: 'pink' }}
                            onClick={() => getDetails(media.id)}
                        >
                            <img src={media.thumbnailUrl} alt={media.title} height='130' />
                            <h2>{media.title}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MediaList;
