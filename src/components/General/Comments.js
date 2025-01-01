import React, { useState, useEffect } from 'react';
import { fetchComments, addComment } from '../../services/api'; // Adjust the import based on your structure

const Comments = ({ postSlug, isAuthenticated, token }) => {
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState('');

    useEffect(() => {
        // Fetch comments when the component mounts
        const getComments = async () => {
            try {
                const commentsData = await fetchComments(postSlug);
                const sortedComments = commentsData.sort(
                    (a, b) => new Date(b.created_on) - new Date(a.created_on)
                );
                setComments(sortedComments);
            } catch (error) {
                console.error('Failed to fetch comments:', error);
            }
        };

        getComments();
    }, [postSlug]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentContent.trim()) return;

        try {
            const commentData = { content: commentContent };
            const newComment = await addComment(postSlug, commentData, token); // Add token for authenticated user
            setComments([newComment, ...comments]); // Add the new comment to the top of the state
            setCommentContent(''); // Clear the input field
        } catch (error) {
            console.error('Failed to add comment:', error);
        }
    };

    return (
        <div>
            <h3>Comments</h3>

            {/* Display comment input or sign in button based on authentication status */}
            {!isAuthenticated ? (
                <div className="alert alert-info" role="alert">
                    Please <a href="/login" className="alert-link">sign in</a> to leave a comment.
                </div>
            ) : (
                <form onSubmit={handleCommentSubmit}>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            rows="3"
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            placeholder="Add a comment"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mb-5">Submit Comment</button>
                </form>
            )}

            <div>
                {comments.map((comment) => (
                    <div key={comment.id} className="mb-4 d-flex align-items-start">
                        <img
                            src={comment.profile_image || 'https://res.cloudinary.com/dnbbm9vzi/image/upload/v1726685042/Group_949_oufsqq.png'} // Fallback to default image
                            alt={`${comment.username || 'User'}'s profile`}
                            className="rounded-circle me-3"
                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                        />

                        <div>
                            <p>
                                <strong>{comment.username || 'Anonymous'}:</strong> {comment.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;

