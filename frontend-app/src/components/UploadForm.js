// frontend/src/components/UploadForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './index.css'
import { useNavigate } from 'react-router-dom';
const UploadForm = () => {
    const navigation = useNavigate()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [video, setVideo] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('thumbnail', thumbnail);
        formData.append('video', video);
        console.log(formData)
        try {
            await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Upload successful!',);
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
                    <button className='buttonstyle' type="submit">Upload</button>
                </div>
            </form>
        </div>
    );
};

export default UploadForm;
