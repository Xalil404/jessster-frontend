import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // To access the slug from the URL
import { fetchPostBySlug } from '../services/api';  // The function to fetch the post from the API

const ArticlePage = () => {
    const { slug } = useParams();  // Retrieve the slug from the URL params
    const [post, setPost] = useState(null);  // State to store the fetched post
    const [loading, setLoading] = useState(true);  // State to manage the loading state
    const [error, setError] = useState(null);  // State to manage any errors

    useEffect(() => {
        const getPost = async () => {
            try {
                const fetchedPost = await fetchPostBySlug(slug);  // Fetch the post based on the slug
                setPost(fetchedPost);  // Set the fetched post in the state
                setLoading(false);  // Set loading to false once data is fetched
            } catch (err) {
                setError('Error fetching the article.');  // Set error message if something goes wrong
                setLoading(false);  // Set loading to false even in case of an error
            }
        };

        getPost();  // Fetch the post when the component is mounted
    }, [slug]);  // Re-fetch the post when the slug changes

    if (loading) {
        return <div>Loading...</div>;  // Show a loading message while the data is being fetched
    }

    if (error) {
        return <div>{error}</div>;  // Show the error message if something went wrong
    }

    // Render the post details if the post is successfully fetched
    return (
        <div className="article-page">
            {/* Title of the post */}
            <h1>{post.title}</h1>

            {/* Display the featured image (cloudinary image) */}
            {post.featured_image && (
                <img
                    src={`https://res.cloudinary.com/dbm8xbouw/${post.featured_image}`}
                    alt={post.title} 
                    style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} 
                />
            )}

            {/* Excerpt of the post */}
            <p><strong>Excerpt:</strong> {post.excerpt}</p>

            {/* Category */}
            <p><strong>Category:</strong> {post.category ? post.category.name : 'No Category'}</p>

            {/* Author */}
            <p><strong>Author:</strong> {post.author ? post.author.username : 'Unknown'}</p>

            {/* Content of the article */}
            <div dangerouslySetInnerHTML={{ __html: post.content }} />

            {/* For better formatting, this could be displayed as a rich text block */}
            <footer>
                <p><strong>Slug:</strong> {post.slug}</p>
                <p><strong>Published on:</strong> {new Date(post.created_on).toLocaleDateString()}</p>
            </footer>
        </div>
    );
};

export default ArticlePage;
