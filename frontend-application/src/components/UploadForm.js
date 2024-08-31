// frontend/src/components/UploadForm.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css'
import { useNavigate } from 'react-router-dom';
const UploadForm = () => {
    const navigation = useNavigate()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [video, setVideo] = useState(null);
    const [showLoader, setShowLoader] = useState(false)
    const [isdisable, setisdisable] = useState(true)

    useEffect(() => {
        if (title !== '' && description !== '' && thumbnail !== '', video !== '') {
            setisdisable(false)
        }
    }, [title, description, thumbnail, video])

    useEffect(() => { 
        setisdisable(true)
        setShowLoader(false) }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowLoader(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('thumbnail', thumbnail);
        formData.append('video', video);
        try {
            await axios.post('https://videoupload-mern-app-1.onrender.com/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Upload successful!');
            navigation('/')
        } catch (error) {
            console.error('Error uploading media:', error);
        }
    };

    return (
        <div className='upload-container'>
            <form className='uploadinner-container' onSubmit={handleSubmit}>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h1 className='mainheading'>Upload Details</h1>

                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <p className="commonparagraph"  >Title</p>

                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength="50"
                            required
                            className="commontextinpustyle"
                        />
                        <p className="commonparagraph"  >Description</p>

                        <textarea
                            className="commontextinpustyle"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength="200"
                            required
                        />
                        <p className="commonparagraph"  >Select Image File</p>

                        <input
                            className="commontextinpustyle"
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={(e) => setThumbnail(e.target.files[0])}
                            required
                            style={{ color: thumbnail !== null ? 'green' : 'red' }}
                        />
                        <p className="commonparagraph"  >Select Video File</p>

                        <input
                            className="commontextinpustyle"
                            type="file"
                            accept="video/mpg,video/avi,video/mp4"
                            onChange={(e) => setVideo(e.target.files[0])}
                            required
                            style={{ color: video !== null ? 'green' : 'red' }}

                        />
                    </div>
                    <button disabled={isdisable} style={{ backgroundColor: isdisable ? 'grey' : '#0062ff' }} className='buttonstyle' type="submit">
                        {showLoader ? 'Loading...' : 'Upload'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UploadForm;
