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
                    <h2>About Us</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam vehicula, tortor vitae pharetra pellentesque, risus orci suscipit lorem,
                        nec facilisis orci magna non neque. Ut porttitor eget orci id ultricies.
                        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
                        Integer non tincidunt risus. Donec ut nulla accumsan, tincidunt nulla a, pharetra justo.
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
                <Link to="/donate" className="btn btn-dark btn-lg">
                    Make a Donation
                </Link>
            </div>
        </div>
    );
};

export default About;
