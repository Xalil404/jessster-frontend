import React, { useEffect, useState } from 'react';
import { fetchVideos, fetchVideoBySlug } from '../../services/api';

const Video = ({ videoId }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false); // Track whether video is in full-screen mode
  const [currentIndex, setCurrentIndex] = useState(0); // Track index of current video in list

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        if (videoId) {
          const singleVideo = await fetchVideoBySlug(videoId);
          setCurrentVideo(singleVideo);
          setCurrentIndex(videos.findIndex((video) => video.id === singleVideo.id));
        } else {
          const allVideos = await fetchVideos();
          setVideos(allVideos);
          setCurrentVideo(allVideos[0]);
          setCurrentIndex(0); // Set first video as default
        }
        setLoading(false);
      } catch (err) {
        setError('Error fetching videos');
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId, videos]);

  const goToNextVideo = () => {
    const nextIndex = (currentIndex + 1) % videos.length;
    setCurrentIndex(nextIndex);
    setCurrentVideo(videos[nextIndex]);
  };

  const goToPreviousVideo = () => {
    const prevIndex = (currentIndex - 1 + videos.length) % videos.length;
    setCurrentIndex(prevIndex);
    setCurrentVideo(videos[prevIndex]);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {!isFullScreen ? (
        <div>
          <h2>All Videos</h2>
          <div className="video-gallery" style={{ display: 'flex', overflowX: 'auto' }}>
            {videos.map((video, index) => (
              <div
                key={video.id}
                className="video-thumbnail"
                style={{ margin: '0 10px', cursor: 'pointer' }}
                onClick={() => {
                  setCurrentVideo(video);
                  setCurrentIndex(index);
                  setIsFullScreen(true); // Open video in full-screen mode
                }}
              >
                <h3>{video.title}</h3>
                <video width="200" controls>
                  <source
                    src={`https://res.cloudinary.com/dbm8xbouw/${video.video}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
            <button
              onClick={() => goToPreviousVideo()}
              style={{
                position: 'absolute',
                top: '50%',
                left: '10px',
                background: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                padding: '10px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              &#8592;
            </button>
            <button
              onClick={() => goToNextVideo()}
              style={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                background: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                padding: '10px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              &#8594;
            </button>
          </div>
        </div>
      ) : (
        <div className="full-screen-video">
          <button
            onClick={closeFullScreen}
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              background: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              padding: '10px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
          <button
            onClick={goToPreviousVideo}
            style={{
              position: 'absolute',
              top: '50%',
              left: '10px',
              background: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              padding: '10px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            &#8592;
          </button>
          <button
            onClick={goToNextVideo}
            style={{
              position: 'absolute',
              top: '50%',
              right: '10px',
              background: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              padding: '10px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            &#8594;
          </button>
          <h2>{currentVideo.title}</h2>
          <video width="100%" controls>
            <source
              src={`https://res.cloudinary.com/dbm8xbouw/${currentVideo.video}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <p>{currentVideo.description}</p>
        </div>
      )}
    </div>
  );
};

export default Video;
