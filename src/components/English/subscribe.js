import React, { useState } from 'react';
import { subscribeEmail } from '../../services/api'; // Import the API function

const SubscribeSection = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');  // Clear any previous message before making the request

        try {
            const response = await subscribeEmail(email);
            console.log('Subscription response:', response); // Check the API response in the console
            setMessage(response.message || 'Subscription successful!'); // Use response message or default success message
            setEmail(''); // Clear the email input after successful subscription
        } catch (error) {
            console.error('Subscription error:', error); // Log any errors for debugging
            setMessage(error.message || 'Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section style={{ backgroundColor: '#f4f4f4', padding: '40px 0', textAlign: 'center' }}>
            <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto', padding: '0 15px' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#333', fontWeight: 'bold' }}>Sign up for Jessster</h2>
                <p style={{ fontSize: '1.5rem', color: '#555', marginBottom: '20px', fontWeight: 'bold' }}>Weekly Newsletter</p>
                <p style={{ fontSize: '1.1rem', color: '#777', marginBottom: '30px' }}>The latest funny news from around the world. Timely. Accurate. Fair.</p>
                <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ width: '100%', maxWidth: '400px', marginRight: '10px' }}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-mail address"
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '1rem',
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                boxSizing: 'border-box',
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            padding: '10px 20px',
                            fontSize: '1rem',
                            backgroundColor: '#009688',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
                        }}
                        disabled={loading}
                    >
                        {loading ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </form>
                <p style={{ fontSize: '0.9rem', color: '#555', marginTop: '20px' }}>
                    By signing up, you agree to our <a href="https://www.termsfeed.com/live/4b1f693e-8843-4921-b9bd-4d5fb43b312b" target="_blank" rel="noopener noreferrer" style={{ color: '#009688' }}>Privacy Policy</a>
                </p>
                {message && (
                    <p
                        style={{
                            marginTop: '20px',
                            fontSize: '1.5rem',       // Increase font size
                            fontWeight: 'bold',       // Make the text bold
                            color: '#009688',         // Green color for success messages
                        }}
                    >
                        {message}
                    </p>
                )}
            </div>
        </section>
    );
};

export default SubscribeSection;
