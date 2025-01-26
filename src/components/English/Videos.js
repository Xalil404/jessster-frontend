import React, { useEffect, useState, useRef } from 'react';
import { fetchVideos, fetchVideoBySlug } from '../../services/api';

const Video = ({ videoId }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const videoRef = useRef(null); // Ref for the modal video 

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        if (videoId) {
          const singleVideo = await fetchVideoBySlug(videoId, 'en');
          setCurrentVideo(singleVideo);
          setVideos([singleVideo]);
        } else {
          const allVideos = await fetchVideos('en');
          setVideos(allVideos);
          setCurrentVideo(allVideos[0]);
        }
        setLoading(false);
      } catch (err) {
        setError('Error fetching videos');
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  const openFullScreen = (video, index) => {
    setCurrentVideo(video);
    setCurrentIndex(index);
    setIsFullScreen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);

    // Stop the modal video playback
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const navigateVideo = (direction) => {
    let newIndex = currentIndex + direction;

    if (newIndex < 0) {
      newIndex = videos.length - 1; // Loop to the last video
    } else if (newIndex >= videos.length) {
      newIndex = 0; // Loop back to the first video
    }

    setCurrentVideo(videos[newIndex]);
    setCurrentIndex(newIndex);
  };

  // Helper function to render video content (embedded link)
  const renderVideoContent = (content) => {
    return { __html: content }; // This will safely inject HTML (e.g., iframe tags)
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {!isFullScreen ? (
        <div>
          <div className="video-gallery" style={{ display: 'flex', overflowX: 'auto' }}>
            {/* "Click to open player" card */}
            <div
              className="video-thumbnail"
              style={{
                margin: '0 10px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'gray',
                color: 'white',
                fontSize: '25px',
                fontWeight: 'bold',
                borderRadius: '10px',
                height: '450px', // Adjust to match your video thumbnail size
                textAlign: 'center',
              }}
              onClick={() => setIsFullScreen(true)} // Opens the modal when clicked
            >
              Click here to open player
            </div>

            {/* Video thumbnails */}
            {videos.map((video, index) => (
              <div
                key={video.id}
                className="video-thumbnail"
                style={{ margin: '0 10px', cursor: 'pointer' }}
                onClick={() => openFullScreen(video, index)}
              >
                
               {/* <h3>{video.title}</h3> */}
                <div dangerouslySetInnerHTML={renderVideoContent(video.description)} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="full-screen-video"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <button
            onClick={closeFullScreen}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255, 255, 255, 0.5)',
              color: 'black',
              width: '75px',
              height: '75px',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
            }}
          >
            Close
          </button>

          <button
            onClick={() => navigateVideo(-1)}
            style={{
              position: 'absolute',
              left: '250px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.5)',
              color: 'black',
              padding: '5px',
              fontSize: '60px',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '50%',
              width: '100px',
            }}
          >
            &#8249; {/* Left Arrow */}
          </button>

          {/* Display full-screen video content (embed) */}
          <div dangerouslySetInnerHTML={renderVideoContent(currentVideo.description)} />

          <button
            onClick={() => navigateVideo(1)}
            style={{
              position: 'absolute',
              right: '250px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.5)',
              color: 'black',
              padding: '5px',
              fontSize: '60px',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '50%',
              width: '100px',
            }}
          >
            &#8250; {/* Right Arrow */}
          </button>
        </div>
      )}
    </div>
  );
};

export default Video;
