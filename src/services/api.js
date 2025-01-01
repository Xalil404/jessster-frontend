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


// Function to fetch tasks
export const fetchTasks = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/tasks/`, {
            headers: { Authorization: `Token ${token}` } // Adjust based on your authentication method
        });
        return response.data; // Returns the list of birthdays
    } catch (error) {
        throw error.response.data; // Handle the error response
    }
};

// Function to create a new task
export const createTask = async (taskData, token) => {
    try {
        const response = await axios.post(`${API_URL}/tasks/`, taskData, {
            headers: { Authorization: `Token ${token}` } // Adjust based on your authentication method
        });
        return response.data; // Returns the created birthday data
    } catch (error) {
        throw error.response.data; // Handle the error response
    }
};

// Function to update a task
export const updateTask = async (taskId, taskData, token) => {
    try {
        const response = await axios.put(`${API_URL}/tasks/${taskId}/`, taskData, {
            headers: { Authorization: `Token ${token}` } // Adjust based on your authentication method
        });
        return response.data; // Returns the updated birthday data
    } catch (error) {
        throw error.response.data; // Handle the error response
    }
};

// Function to delete a task
export const deleteTask = async (taskId, token) => {
    try {
        const response = await axios.delete(`${API_URL}/tasks/${taskId}/`, {
            headers: { Authorization: `Token ${token}` } // Adjust based on your authentication method
        });
        return response.data; // Optionally return a success message or response
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
        const response = await axios.put(`${API_URL}/profile/`, profileData, {
            headers: { Authorization: `Token ${token}` }
        });
        return response.data; // Returns the updated profile data
    } catch (error) {
        throw error.response.data; // Handle the error response
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


// Function to fetch blog posts sorted by most viewed
export const fetchMostViewedPosts = async () => {
    try {
        const response = await api.get('/posts/', {
            params: {
                sort_by: 'views',  // Sort by views
                order: 'desc'      // Descending order (most viewed first)
            }
        });
        return response.data;  // Assuming the data is an array of posts
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];  // Return an empty array in case of an error
    }
};
