// src/components/auth/AppleLoginPage.js Login through pop up method
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const GoogleLoginPage = () => {
    const navigate = useNavigate();  // Initialize navigate function

    const responseGoogle = (response) => {
        console.log("Google Response:", response);

        // Construct user data with token
        const userData = {
            token: response.credential,
        };

        // Send token to your Django backend
        fetch('https://jessster-476efeac7498.herokuapp.com/api/auth/google/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("Backend Response:", data);
            // Handle successful login (e.g., store token, redirect user)
            if (data.token) {
                // Save the token locally
                localStorage.setItem('authToken', data.token);

                // Redirect to /dashboard
                navigate('/dashboard');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <GoogleOAuthProvider clientId="387788518673-vqgk8blm21alfiungj28pji8tte51jd4.apps.googleusercontent.com">
            <div>
                {/*}
                <h1>Google Login</h1>
                */}
                <GoogleLogin
                    onSuccess={responseGoogle}
                    onError={() => console.error('Login Failed')}
                    ux_mode="popup"
                    cookiePolicy="single_host_origin"
                />
            </div>
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginPage;