import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchPosts } from '../../services/api'; // Assuming you have this function to fetch posts
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS import
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import BreakingNewsBanner from '../widgets/BreakingNewsBanner';
import CategoriesBanner from '../widgets/CategoriesBanner';
import CategoryArticles from '../English/CategoryArticles';
import Videos from '../English/Videos';
import MostViewed from './MostViewed';
import MostLiked from './MostLiked';
import MostComment from './MostComment';
import ReverseVideos from '../English/ReverseVideos';
import RandomVideos from '../English/RandomVideos';
import SubscribeSection from './subscribe';


const HomeEnglish = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedCategory, setSelectedCategory] = useState(null);

    const navigate = useNavigate(); // Initialize navigate function

    const getPosts = async (categoryId = null) => {
        setLoading(true);
        try {
            const fetchedPosts = await fetchPosts();
            const englishPosts = fetchedPosts.filter(
                (post) =>
                    post.language === 'en' &&
                    (!categoryId || post.category === categoryId)
            );
            setPosts(englishPosts.slice(0, 13)); // Get only the latest 13 posts
        } catch (err) {
            setError('Failed to fetch posts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getPosts = async () => {
            try {
                const fetchedPosts = await fetchPosts();
                const englishPosts = fetchedPosts
                    .filter((post) => post.language === 'en')
                    .slice(0, 13); // Get only the latest 13 English posts
                setPosts(englishPosts);
            } catch (err) {
                setError('Failed to fetch posts');
            } finally {
                setLoading(false);
            }
        };

        getPosts();
    }, []);

    const handleCategorySelect = (categoryId, categoryName) => {
        setSelectedCategory(categoryId);
        getPosts(categoryId);
        navigate(`/category/${categoryId}`); // Navigate to the selected category's URL
    };

    if (loading) {
        return <div className="text-center mt-5 fw-bold">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-5 text-danger">{error}</div>;
    }

    if (posts.length === 0) {
        return <div className="text-center mt-5">No English posts available</div>;
    }

    return (
        <div className="container mt-1">
            <BreakingNewsBanner /> {/* Add Breaking News Banner below Navbar */}
            {/*<h1 className="mb-4">Blog Posts (English)</h1>*/}
            <div className="row d-flex" style={{ minHeight: '100vh' }}>
                {/* Left Column */}
                <div className="col-md-6 d-flex flex-column">
                    {posts.slice(0, 5).map((post, index) => (
                        <a
                            key={post.id}
                            href={`/posts/${post.slug}`}
                            className="text-decoration-none text-dark mb-4"
                        >
                            <div
                                className={`d-flex align-items-center shadow-sm p-3 ${
                                    index === 0 ? 'large-post' : 'small-post'
                                }`}
                                style={{
                                    backgroundColor: '#E5E7EB',
                                    borderRadius: '5px',
                                    height: index === 0 ? '220px' : '100px',
                                }}
                            >
                                <div
                                    style={{
                                        width: index === 0 ? '40%' : '20%',
                                        height: '100%',
                                        overflow: 'hidden',
                                        flexShrink: 0,
                                        borderRadius: '5px',
                                    }}
                                >
                                    <img
                                        src={`https://res.cloudinary.com/dbm8xbouw/${post.featured_image}`}
                                        alt={post.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                                <div className="ms-3" style={{ flex: 1 }}>
                                    <h5
                                        className="mb-0"
                                        style={{
                                            whiteSpace: 'normal', // Allow wrapping
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: index === 0 ? 3 : 2, // Control lines for large vs. small posts
                                            WebkitBoxOrient: 'vertical',
                                            maxHeight: index === 0 ? '4.5em' : '3em', // Constrain height
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {post.title}
                                    </h5>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Right Column */}
                <div className="col-md-6 d-flex flex-column">
                    {posts.slice(5, 11).map((post) => (
                        <a
                            key={post.id}
                            href={`/posts/${post.slug}`}
                            className="text-decoration-none text-dark mb-4"
                        >
                            <div
                                className="d-flex align-items-center shadow-sm p-3 small-post"
                                style={{
                                    backgroundColor: '#E5E7EB',
                                    borderRadius: '5px',
                                    height: '100px',
                                }}
                            >
                                <div
                                    style={{
                                        width: '20%',
                                        height: '100%',
                                        overflow: 'hidden',
                                        flexShrink: 0,
                                        borderRadius: '5px',
                                    }}
                                >
                                    <img
                                        src={`https://res.cloudinary.com/dbm8xbouw/${post.featured_image}`}
                                        alt={post.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                                <div className="ms-3" style={{ flex: 1 }}>
                                    <h5
                                        className="mb-0"
                                        style={{
                                            whiteSpace: 'normal', // Allow wrapping
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2, // Limit to 2 lines
                                            WebkitBoxOrient: 'vertical',
                                            maxHeight: '3em', // Constrain height
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {post.title}
                                    </h5>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* View More Button */}
            <div className="text-center mt-4">
                <a href="/en/articles" className="btn btn-outline-dark fw-bold btn-lg">
                    View More Articles
                </a>
            </div>

            {/* Videos Section */}
            <h2 className="fw-bold mt-5">| Watch Latest Funny Videos</h2>
            <div className="videos-section mt-3"
            style={{
                border: '4px solid #ccc', // Adds a 2px solid border with a light gray color
                padding: '20px', // Adds padding inside the border
                borderRadius: '8px', // Optional: Adds rounded corners
            }}
            >
              {/*  <h2 className="text-center">Latest Videos</h2>*/}
                <Videos />  {/* Include the Videos component here */}
            </div>

            {/* Most Viewed Posts Section */}
            <MostViewed /> {/* Include MostViewed component */}

            {/* Videos Section */}
            <h2 className="fw-bold mt-5">| Get A Dose of Funny Videos</h2>
            <div className="videos-section mt-3"
            style={{
                border: '4px solid #ccc', // Adds a 2px solid border with a light gray color
                padding: '20px', // Adds padding inside the border
                borderRadius: '8px', // Optional: Adds rounded corners
            }}
            >
                {/*<h2 className="text-center">Reverse Videos</h2>*/}
                <ReverseVideos />  {/* Include the Videos component here */}
            </div>

            {/* Most Viewed Posts Section */}
            <MostLiked /> {/* Include MostViewed component */}

            {/* Section 5 - Get mobile app */}
            <div className="container-fluid p-0 text-center">
                <h1 className="display-5 fw-bold mb-5">Get Jessster on the go</h1>
                {/* Full-Width Image */}
                <div className="row">
                    <div className="col-12">
                        <img src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1736013616/Grey_minimalist_business_project_presentation_xxfaba.png" className="img-fluid" alt="Full Width" 
                        style={{ width: '80%', maxWidth: '800px', height: 'auto' }}
                        />
                    </div>
                </div>

                {/* Mobile apps buttons */}
                <div className="row justify-content-center">
                    <div className="col-12 col-md-3 mt-4">
                        <div className="my-5 d-flex justify-content-center">
                            {/* Button to link to App Store */}
                            <a href="https://www.jessster.com/404" target="_blank" rel="noopener noreferrer">
                                <img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/white/en-us?size=250x83&amp;releaseDate=1314144000&h=91ef6f52d049d3387a50498048775082" alt="Download on the App Store" style={{ width: '200px' }} />
                            </a>
                        </div>
                    </div>
                    {/*}
                    <div className="col-12 col-md-3 mt-4">
                        <div className="my-5 d-flex justify-content-center">
                            
                            <a href="https://play.google.com/store/apps/details?id=com.cnn.mobile.android.phone&hl=en" target="_blank" rel="noopener noreferrer">
                                <img
                                    src="https://developer.android.com/images/brand/en_generic_rgb_wo_45.png"
                                    alt="Get it on Google Play"
                                    style={{ width: '200px' }}
                                />
                            </a>
                        </div>
                    </div>
                    */}
                </div>
            </div>

            {/* Videos Section */}
            <h2 className="mt-5 fw-bold">| Watch A Laugh Bite</h2>
            <div className="videos-section mt-3"
            style={{
                border: '4px solid #ccc', // Adds a 2px solid border with a light gray color
                padding: '20px', // Adds padding inside the border
                borderRadius: '8px', // Optional: Adds rounded corners
            }}
            >
                {/*<h2 className="text-center">Random Videos</h2>*/}
                <RandomVideos />  {/* Include the Videos component here */}
            </div>

            {/* Most Viewed Posts Section */}
            <MostComment /> {/* Include MostViewed component */}

            {/* View More Button */}
            <div className="text-center mt-4 mb-5">
                <a href="/en/articles" className="btn btn-outline-dark fw-bold btn-lg">
                    View More Articles
                </a>
            </div>

            <SubscribeSection /> {/* Include subscribe component */}

        </div>
    );
};

export default HomeEnglish;
