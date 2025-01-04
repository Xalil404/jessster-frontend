import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        inquiry_type: 'general_inquiry',
        email: '',
        username: '',
        message: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Handle the form field change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error
        setSuccess(''); // Reset success message

        try {
            const response = await axios.post('https://jessster-476efeac7498.herokuapp.com/api/contact/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setSuccess('Message sent successfully!');
            setFormData({
                inquiry_type: 'general_inquiry',
                email: '',
                username: '',
                message: '',
            });
        } catch (err) {
            setError('There was an issue sending your message. Please try again later.');
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <h1 className="text-center pb-3">Contact Us @ Jessster</h1>
            <p className="text-center pb-3">
                If you have any questions or inquiries, feel free to reach out to us using the form below.
            </p>

            <div className="row">
                {/* Left Column for Image */}
                <div className="col-md-6 d-none d-md-block">
                    <img
                        src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1736004596/web_development___tasks_teamwork_team_working_together_website_webpage_people_ev27gz.png"
                        alt="Contact Us"
                        className="img-fluid"
                        style={{ borderRadius: '10px' }}
                    />
                </div>

                {/* Right Column for Form */}
                <div className="col-md-6">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}

                    <form onSubmit={handleSubmit} method="POST" noValidate>
                        <div className="form-group">
                            <label htmlFor="inquiry_type">Inquiry Type</label>
                            <select
                                id="inquiry_type"
                                name="inquiry_type"
                                className="form-control"
                                value={formData.inquiry_type}
                                onChange={handleChange}
                            >
                                <option value="account_closure">Account closure & deletion</option>
                                <option value="general_inquiry">General inquiry</option>
                                <option value="feature_request">Feature request</option>
                            </select>
                        </div>

                        <div className="form-group mt-3">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="form-control"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                className="form-control"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mt-4 text-center">
                            <button type="submit" className="btn btn-dark w-75 fw-bold">
                                Submit
                            </button>
                        </div>
                    </form>

                    {/* Back to Home Button */}
                    <div className="mt-4 text-center">
                        <Link to="/" className="btn btn-secondary w-30 fw-bold">
                            Back to Home Page
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
