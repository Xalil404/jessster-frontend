// src/services/api.js
import axios from 'axios';

const AUTH_URL = 'https://jessster-476efeac7498.herokuapp.com/auth'; // Authentication base URL
const API_URL = 'https://jessster-476efeac7498.herokuapp.com/api'; // API base URL for actions


// Set up Axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',  // Optional for GET, but good practice
    },
});

// Add a request interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken'); // Retrieve the token from local storage
    if (token) {
        config.headers.Authorization = `Token ${token}`; // Assuming your backend uses 'Token' scheme
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Function to register a new user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${AUTH_URL}/registration/`, userData);
        return response.data; // Returns the user data from the response
    } catch (error) {
        throw error.response.data; // Customize this based on your needs
    }
};

// Function to log in a user
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${AUTH_URL}/login/`, credentials);
        console.log('Login Response:', response.data); // Log the response data
        // Store user ID in local storage
        localStorage.setItem('user', response.data.user); // Use 'userId' for consistency
        console.log('User ID saved:', response.data.user);
        return { token: response.data.key }; // Return the token
    } catch (error) {
        throw error.response.data;
    }
};

// Function to fetch user profile in side navigation menu
export const fetchUserProfile = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/profile/`, {
            headers: { Authorization: `Token ${token}` }
        });
        return response.data; // Returns the user profile data
    } catch (error) {
        throw error.response.data; // Handle the error response
    }
};


// Function to fetch the user's profile
export const fetchProfile = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/profile/`, {
            headers: { Authorization: `Token ${token}` }
        });
        return response.data; // Returns the profile data
    } catch (error) {
        throw error.response.data; // Handle the error response
    }
};


// Function to update the user's profile
export const updateProfile = async (profileData, token) => {
    try {
        const response = await axios.patch(`${API_URL}/profile/`, profileData, {
            headers: { Authorization: `Token ${token}` },
        });
        return response.data; // Returns the updated profile data
    } catch (error) {
        throw error.response?.data || error.message; // Handle the error response
    }
};


// Function to delete the user's profile
export const deleteProfile = async (token) => {
    try {
        const response = await axios.delete(`${API_URL}/profile/`, {
            headers: { Authorization: `Token ${token}` }
        });
        return response.data; // Optionally return a success message or confirmation
    } catch (error) {
        throw error.response.data; // Handle the error response
    }
};


// Function to fetch all blog posts
export const fetchPosts = async () => {
    try {
        const response = await api.get('/posts/');  // Adjusted to use axios
        return response.data;  // Assuming the data is an array of posts
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];  // Return an empty array in case of an error
    }
};

// Function to fetch a single post by slug
export const fetchPostBySlug = async (slug) => {
    try {
        const response = await api.get(`/posts/${slug}/`);  // Adjust the endpoint as per your Django API
        return response.data;  // Return the post data
    } catch (error) {
        console.error('Error fetching post by slug:', error);
        throw error.response ? error.response.data : error;
    }
};

// Function to fetch all categories by language
export const fetchCategories = async (language = 'en') => {
    try {
        const response = await api.get(`/categories/`, {
            params: { language }, // Add the language as a query parameter
        });
        return response.data;  // Return the list of categories
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error.response ? error.response.data : error;
    }
};


// Function to fetch all videos by language
export const fetchVideos = async (language = 'en') => {
    try {
        const response = await api.get('/videos/', {
            params: { lang: language },  // Pass the 'lang' as a query parameter instead of 'language'
        });
        return response.data;  // Returning the videos array
    } catch (error) {
        // Log the error response to help with debugging
        if (error.response) {
            console.error('Error fetching videos:', error.response.status);
            console.error('Error response data:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
        return [];  // Return an empty array in case of an error
    }
};


// Function to fetch a single video by id/slug and language
export const fetchVideoBySlug = async (id, language = 'en') => {
    try {
        const response = await api.get(`/videos/${id}/`, {
            params: { lang: language },  // Pass the 'lang' as a query parameter instead of 'language'
        });
        return response.data;  // Return the video data
    } catch (error) {
        console.error('Error fetching video by slug:', error);
        throw error.response ? error.response.data : error;  // Propagate error if needed
    }
};


// Function to toggle like status for a post
export const toggleLike = async (slug, token) => {
    try {
        const response = await api.post(`/posts/${slug}/like/`, {}, {
            headers: {
                Authorization: `Token ${token}`,  // Token for authentication
            },
        });
        return response.data; // Ensure the API returns necessary data
    } catch (error) {
        console.error('Error toggling like:', error);
        throw error.response ? error.response.data : error;
    }
};

// --------------- Comments API ------------------

// Function to fetch comments for a specific post
export const fetchComments = async (postSlug) => {
    try {
        const response = await api.get(`/posts/${postSlug}/comments/`);
        return response.data; // Returns an array of comments for the post
    } catch (error) {
        throw error.response.data; // Handle the error response
    }
};

// Function to add a new comment to a specific post
export const addComment = async (postSlug, commentData, token) => {
    try {
        const response = await api.post(`/posts/${postSlug}/comments/`, commentData, {
            headers: {
                Authorization: `Token ${token}`,  // Token for authentication
            },
        });
        return response.data; // Returns the created comment
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error.response ? error.response.data : error;
    }
};


// Function to fetch blog posts sorted by most liked
export const fetchMostLikedPosts = async () => {
    try {
        const response = await api.get('/posts/', {
            params: {
                sort_by: 'likes',  // Sort by likes
                order: 'desc'      // Descending order (most liked first)
            }
        });
        return response.data;  // Assuming the data is an array of posts
    } catch (error) {
        console.error('Error fetching most liked posts:', error);
        return [];  // Return an empty array in case of an error
    }
};


// Function to fetch blog posts sorted by most comments
export const fetchMostCommentedPosts = async () => {
    try {
        const response = await api.get('/posts/', {
            params: {
                sort_by: 'comments',  // Sort by comments
                order: 'desc'         // Descending order (most commented first)
            }
        });
        return response.data;  // Assuming the data is an array of posts
    } catch (error) {
        console.error('Error fetching most commented posts:', error);
        return [];  // Return an empty array in case of an error
    }
};


// Function to search for posts based on a query
export const fetchSearchResults = async (query) => {
    try {
        const response = await api.get('/search/', {
            params: { q: query }  // Passing the query as a parameter with the correct key
        });
        return response.data;  // Returning the results from the API
    } catch (error) {
        console.error('Error fetching search results:', error);
        return { results: [] };  // Returning an empty result array in case of error
    }
};


// Function to fetch liked articles
export const fetchLikedArticles = async () => {
    try {
        const response = await api.get('/user/liked-articles/');
        return response.data; // Returns the liked articles data
    } catch (error) {
        console.error('Error fetching liked articles:', error);
        throw error.response?.data || error; // Handle the error response
    }
};


// Function to subscribe a user (send email to backend)
export const subscribeEmail = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/subscribe/`, { email });
        return response.data; // Returns the success message from the response
    } catch (error) {
        throw error.response.data; // Handle the error response
    }
};


// Function to fetch the latest 13 posts on home pages, with optional language filter
export const fetchLatestPosts = async (language) => {
    try {
        const response = await api.get('/articles/limited/', {
            params: {
                language: language, // Pass the language as a query parameter
            },
        });
        return response.data; // Assuming the data is an array of posts
    } catch (error) {
        console.error('Error fetching latest posts:', error);
        return []; // Return an empty array in case of an error
    }
};


// Function to fetch the 4 most viewed posts on home pages
export const fetchMostViewedPosts = async (language) => {
    try {
        const response = await api.get('/articles/most-viewed/', {  // Updated URL
            params: {
                language: language,  // Pass language as a parameter (e.g., 'en', 'ar', 'ru')
                limit: 4             // Limit to 4 posts
            }
        });
        return response.data;  // Assuming the response data is an array of posts
    } catch (error) {
        console.error('Error fetching most viewed posts:', error);
        return [];  // Return an empty array in case of an error
    }
};



