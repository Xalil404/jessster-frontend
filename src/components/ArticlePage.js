import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostBySlug } from '../services/api';

const ArticlePage = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPost = async () => {
            try {
                const fetchedPost = await fetchPostBySlug(slug);
                setPost(fetchedPost);
                setLoading(false);
            } catch (err) {
                setError('Error fetching the article.');
                setLoading(false);
            }
        };

        getPost();
    }, [slug]);

    if (loading) {
        return <div className="text-center my-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-center my-5 text-danger">{error}</div>;
    }

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10">
                    {/* Title */}
                    <h1 className="text-center mb-4">{post.title}</h1>

                    {/* Excerpt */}
                    <p className="text-muted text-center mb-4">
                        <em>{post.excerpt}</em>
                    </p>

                    {/* Featured Image */}
                    {post.featured_image && (
                        <div className="text-center mb-4">
                            <img
                                src={`https://res.cloudinary.com/dbm8xbouw/${post.featured_image}`}
                                alt={post.title}
                                className="img-fluid rounded"
                                style={{ maxHeight: '400px', objectFit: 'cover' }}
                            />
                        </div>
                    )}

                    <div className="d-flex justify-content-center gap-3 mb-4">

                        {/* Author */}
                        <p>
                            <strong>Author:</strong>{' '}
                            {post.author ? post.author : 'Unknown'}
                        </p>

                        {/* Category */}
                        <p>
                            <strong>Category:</strong>{' '}
                            {post.category ? post.category.name : 'No Category'}
                        </p>

                        {/* Date */}
                        <p>
                            <strong>Published on:</strong>{' '}
                            {new Date(post.created_on).toLocaleDateString()}
                        </p>

                    </div>


                    {/* Content */}
                    <div
                        className="mb-4"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default ArticlePage;
