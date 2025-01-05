import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="container mt-5">
            {/* Two-Column Layout */}
            <div className="row align-items-center">
                {/* Image Column */}
                <div className="col-lg-6 text-center">
                    <img
                        src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1736005518/task_management___balance_balancing_unicycle_shapes_woman_people_tasks_gw2fm2.png"
                        alt="About Us"
                        className="img-fluid mb-4"
                        style={{ width: '80%', maxWidth: '400px', height: 'auto', borderRadius: '10px' }}
                    />
                </div>

                {/* Content Column */}
                <div className="col-lg-6">
                    <h2 className='text-center mb-3'>About Us</h2>
                    <p>
                        Welcome to Jessster, the internet's favorite destination for funny and comedic news! 🎉 
                    </p>
                    <p>
                        At Jessster, we believe the world is serious enough, so we’ve made it our mission to bring a smile to your face with every article we publish. From satirical takes on trending topics to laugh-out-loud fictional headlines, we’re here to brighten your day with a hearty dose of humor.
                    </p>
                    <p>
                        Your support helps us keep the laughs coming! Whether it's a coffee to fuel our writers’ wittiest ideas or a donation to keep our site running smoothly, every little bit goes a long way in spreading joy and giggles across the web.
                    </p>
                    <p>
                        Thank you for being part of the Jessster community. Let's keep laughing together! 😊
                    </p>
                    {/*
                    <Link to="/" className="btn btn-primary btn-lg">
                        Donate
                    </Link>
                    */}
                </div>
            </div>

            {/* Yellow Banner */}
            <div
                className="mt-5 p-5 text-center mx-auto"
                style={{
                    backgroundColor: '#f9c74f',
                    borderRadius: '10px',
                    color: '#000',
                    maxWidth: '900px',
                }}
            >
                <h3 className="mb-3">Support Our Mission</h3>
                <p className="mb-4">
                    Your contributions help us continue providing valuable content and resources.
                </p>
                <Link to="/donate" className="btn btn-dark btn-lg fw-bold">
                    Make a Donation
                </Link>
            </div>
        </div>
    );
};

export default About;
