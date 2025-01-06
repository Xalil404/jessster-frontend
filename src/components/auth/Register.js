// src/components/Register.js
import React, { useState } from 'react';
import { registerUser } from '../../services/api'; // Import the registerUser function
import { loginUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import GoogleLoginPagePopup from '../auth/GoogleLoginPagePopup'; // Import Google Login
import AppleLoginPage from '../auth/AppleLoginPage'; // Import Apple Login

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const [showEmailFields, setShowEmailFields] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors
        try {
            // Register the user
            const response = await registerUser({ username, email, password1, password2 });
            console.log('Registration Response:', response); // Log the registration response
    
            // Automatically log in the user after registration
            const loginResponse = await loginUser({ username, password: password1 });
            localStorage.setItem('authToken', loginResponse.token); // Save token for authentication
    
            // Redirect to the dashboard
            navigate('/dashboard');
        } catch (error) {
            console.error('Error during registration/login:', error);
            setError('Registration failed. Please check your details.');
        }
    };
    

    return (
        <div className="container mt-5">
            <div className="row">
                {/* Left Column for Image */}
                <div className="col-md-6 d-none d-md-block">
                    <img
                        src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1736002982/product_development___idea_thought_innovation_teamwork_working_together_document_people_2x_1_jn1eoh.png"
                        className="img-fluid"
                        alt="Register"

                    />
                </div>

                <div className="col-md-6">
                    <div className="card" style={{ border: 'none', backgroundColor: '#F9FAFC' }}>
                        <div className="card-header-1 text-center card-header-custom">
                            <h2 className='fw-bold'>Sign Up to Jessster</h2>
                        </div>

                        <div className="card-body">
                            {/* Google and Apple Login Buttons */}
                            <div className="social-login-buttons d-flex mb-3 justify-content-center">
                                <div className="d-flex flex-column align-items-center mx-2">
                                    <GoogleLoginPagePopup />
                                </div>
                                <div className="d-flex flex-column align-items-center mx-2">
                                    <AppleLoginPage />
                                </div>
                            </div>

                            {/* Divider with text */}
                            <div className="text-center my-3">
                                <div className="d-flex align-items-center justify-content-center">
                                    <hr className="flex-grow-1 border-top border-secondary" />
                                    <span className="mx-3 text-dark" style={{ whiteSpace: 'nowrap' }}>
                                        or sign up with email
                                    </span>
                                    <hr className="flex-grow-1 border-top border-secondary" />
                                </div>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    {/* Continue with email button */}
                                    <div className="social-login-buttons text-center mb-3">
                                        <button
                                            type="button"
                                            className="btn btn-lg mx-auto d-block w-100 py-3 rounded-button fw-bold"
                                            id="email-button"
                                            style={{ backgroundColor: '#000', color: 'white' }}
                                            onClick={() => setShowEmailFields(true)}
                                        >
                                            Continue with Email
                                        </button>
                                    </div>

                                    {/* Email registration fields (initially hidden) */}
                                    {showEmailFields && (
                                        <div id="email-fields">
                                            <input
                                                type="text"
                                                className="form-control mb-3"
                                                placeholder="Username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                            />
                                            <input
                                                type="email"
                                                className="form-control mb-3"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                            <input
                                                type="password"
                                                className="form-control mb-3"
                                                placeholder="Password"
                                                value={password1}
                                                onChange={(e) => setPassword1(e.target.value)}
                                                required
                                            />
                                            <input
                                                type="password"
                                                className="form-control mb-3"
                                                placeholder="Confirm Password"
                                                value={password2}
                                                onChange={(e) => setPassword2(e.target.value)}
                                                required
                                            />
                                            <div className="social-login-buttons">
                                                <button
                                                    type="submit"
                                                    className="btn btn-lg mx-auto d-block w-100 py-3 rounded-button fw-bold"
                                                    id="signup-button"
                                                    style={{ backgroundColor: '#000', color: 'white' }}
                                                >
                                                    Sign Up
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {error && <p style={{ color: 'red' }}>{error}</p>}
                                </form>
                                <hr />
                                <p className="text-center">
                                    Already have an account? <a href="/login" className="text-dark">Sign in</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;