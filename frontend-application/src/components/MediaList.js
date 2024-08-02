// frontend/src/components/MediaList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'
import { useNavigate } from 'react-router-dom';

const MediaList = () => {
    const navigation = useNavigate()
    const [mediaList, setMediaList] = useState([]);
    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const response = await axios.get('https://videoupload-mern-app-1.onrender.com/media');
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
            <h1 className='heading' style={{color:'white',fontSize:35,fontWeight:'bold'}}>Media list</h1>
            <button
                onClick={() => navigation('/upload')}
                style={{
                    backgroundColor: 'green',
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
            { mediaList.length !== 0  ?

                mediaList.map(media => (
                    
                    <div className='container3' key={media.id} >

                            <div 
                                onClick={() => getDetails(media.id)}
                            >
                                <img src={media.thumbnailUrl} alt={media.title} height='130' />
                                <h2 style={{color:'white',fontSize:25,fontWeight:'bold'}}>{media.title}</h2>
                            </div>
                           

                    </div>

                ))
                :
                <div className='container3' style={{backgroundColor:'lightgrey',alignSelf:'center',width:'100%'}} >

                <h2 color='red'>Upload Data </h2>
                </div>
            }
            </div>
        </div>
    );
};

export default MediaList;
