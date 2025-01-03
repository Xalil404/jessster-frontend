import React, { useEffect, useState, useRef } from 'react';
import { fetchVideos, fetchVideoBySlug } from '../../services/api';

const ReverseVideo = ({ videoId }) => {
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
          
          // Reverse the array to show videos from oldest to newest
          setVideos(allVideos.reverse()); // Reverses the order
          setCurrentVideo(allVideos[0]); // Optionally, set the first video
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

    // Restart playback in the modal
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {!isFullScreen ? (
        <div>
          <h2>Watch Latest Videos</h2>
          <div className="video-gallery" style={{ display: 'flex', overflowX: 'auto' }}>
            {videos.map((video, index) => (
              <div
                key={video.id}
                className="video-thumbnail"
                style={{ margin: '0 10px', cursor: 'pointer' }}
                onClick={() => openFullScreen(video, index)}
              >
                {/* <h3>{video.title}</h3> */}
                <video
                  width="200"
                  style={{ pointerEvents: 'none' }} // Disable interaction
                >
                  <source
                    src={`https://res.cloudinary.com/dbm8xbouw/${video.video}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
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
                width: '75px', // Set explicit width
                height: '75px', // Set explicit height
                border: 'none',
                cursor: 'pointer',
                borderRadius: '50%', // Ensures circular shape
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center', // Centers the text inside the button
                fontSize: '16px', // Adjust font size as needed
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
              fontSize: '60px', // Increase font size for larger arrow
              border: 'none',
              cursor: 'pointer',
              borderRadius: '50%',
              width: '100px', 
            }}
          >
            &#8249; {/* Left Arrow */}
          </button>
          <video
            ref={videoRef}
            style={{ maxWidth: '80%', maxHeight: '80%' }}
            controls
            autoPlay
          >
            <source
              src={`https://res.cloudinary.com/dbm8xbouw/${currentVideo.video}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
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
              fontSize: '60px', // Increase font size for larger arrow
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

export default ReverseVideo;
