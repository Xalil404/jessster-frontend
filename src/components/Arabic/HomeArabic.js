import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchPosts } from '../../services/api'; // Assuming you have this function to fetch posts
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS import
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ArabicBreakingNewsBanner from '../widgets/ArabicBreakingNewsBanner';
import CategoriesBanner from '../widgets/CategoriesBanner';
import CategoryArticles from '../English/CategoryArticles';
import ArVideos from '../Arabic/ArVideos';
import ArMostViewed from './ArMostViewed';
import ArabicMostComment from './ArabicMostComment';
import ArabicMostLiked from './ArabicMostLiked';
import ArabicReverseVideos from '../Arabic/ArabicReverseVideos';
import ArabicRandomVideos from '../Arabic/ArabicRandomVideos';


const HomeArabic = () => {
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
                    post.language === 'ar' &&
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
                    .filter((post) => post.language === 'ar')
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
        return <div className="text-center mt-5 fw-bold">تحميل ...</div>;
    }

    if (error) {
        return <div className="text-center mt-5 text-danger">{error}</div>;
    }

    if (posts.length === 0) {
        return <div className="text-center mt-5">لا يوجد مقالات باللغة العربية</div>;
    }

    return (
        <div className="container mt-1">
            <ArabicBreakingNewsBanner /> {/* Add Breaking News Banner below Navbar */}
            {/*<h1 className="mb-4">Blog Posts (Arabic)</h1>*/}
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
                <a href="/ar/articles" className="btn btn-outline-dark fw-bold btn-lg">
                المزيد من المقالات
                </a>
            </div>

            {/* Videos Section */}
            <div className="videos-section mt-5">
                {/*<h2 className="text-center">Newest to Oldest Videos</h2>*/}
                <ArabicReverseVideos />  {/* Include the Videos component here */}
            </div>

            {/* Most Viewed Posts Section */}
            <ArMostViewed /> {/* Include MostViewed component */}

            {/* Videos Section */}
            <div className="videos-section mt-5">
                {/*<h2 className="text-center">Oldest to Newest Videos</h2>*/}
                <ArVideos />  {/* Include the Videos component here */}
            </div>

            {/* Most Viewed Posts Section */}
            <ArabicMostLiked /> {/* Include MostViewed component */}

            {/* Videos Section */}
            <div className="videos-section mt-5">
                {/*<h2 className="text-center">Random Videos</h2>*/}
                <ArabicRandomVideos />  {/* Include the Videos component here */}
            </div>

            {/* Most Viewed Posts Section */}
            <ArabicMostComment /> {/* Include MostViewed component */}

        </div>
    );
};

export default HomeArabic;