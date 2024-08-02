// frontend/src/App.js
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import UploadForm from './components/UploadForm';
import MediaList from './components/MediaList';
import MediaPlayer from './components/MediaPlayer';

function App() {
    return (
      
        <Router>
            <Routes>
            <Route path="/" element={<MediaList/>} />
                <Route path="/upload" element={<UploadForm/>} />
                <Route path="/media/:id" element={<MediaPlayer/>} />
            </Routes>
        </Router>
    );
}

export default App;
