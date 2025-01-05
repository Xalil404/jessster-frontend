import React from 'react';
import { Link } from 'react-router-dom';

const Donate = () => {
    return (
        <div className="container mt-5">
            {/* Two-Column Layout */}
            <div className="row align-items-center mb-5">
                {/* Content Column */}
                <div className="col-lg-6">
                    <h2>Donate to Us</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam vehicula, tortor vitae pharetra pellentesque, risus orci suscipit lorem,
                        nec facilisis orci magna non neque. Ut porttitor eget orci id ultricies.
                        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
                        Integer non tincidunt risus. Donec ut nulla accumsan, tincidunt nulla a, pharetra justo.
                    </p>
                    <Link to="/" className="btn btn-primary btn-lg">
                        Learn More
                    </Link>
                </div>

                {/* Image Column */}
                <div className="col-lg-6 text-center">
                    <img
                        src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1736005518/task_management___balance_balancing_unicycle_shapes_woman_people_tasks_gw2fm2.png"
                        alt="Donate to Us"
                        className="img-fluid"
                        style={{ width: '80%', maxWidth: '400px', height: 'auto', borderRadius: '10px' }}
                    />
                </div>
            </div>

            {/* Donation Options Grid */}
            <div className="row text-center">
                {/* Option 1 */}
                <div className="col-md-4 mb-4">
                    <div className="card p-3">
                        <img
                            src="https://via.placeholder.com/100"
                            alt="PayPal"
                            className="img-fluid mb-3"
                        />
                        <h5>PayPal</h5>
                        <Link to="/donate/paypal" className="btn btn-primary btn-sm">
                            Donate via PayPal
                        </Link>
                    </div>
                </div>

                {/* Option 2 */}
                <div className="col-md-4 mb-4">
                    <div className="card p-3">
                        <img
                            src="https://via.placeholder.com/100"
                            alt="Buy Me a Coffee"
                            className="img-fluid mb-3"
                        />
                        <h5>Buy Me a Coffee</h5>
                        <Link to="/donate/coffee" className="btn btn-primary btn-sm">
                            Support Us
                        </Link>
                    </div>
                </div>

                {/* Option 3 */}
                <div className="col-md-4 mb-4">
                    <div className="card p-3">
                        <img
                            src="https://via.placeholder.com/100"
                            alt="Ko-fi"
                            className="img-fluid mb-3"
                        />
                        <h5>Ko-fi</h5>
                        <Link to="/donate/kofi" className="btn btn-primary btn-sm">
                            Donate on Ko-fi
                        </Link>
                    </div>
                </div>

                {/* Option 4 */}
                <div className="col-md-4 mb-4">
                    <div className="card p-3">
                        <img
                            src="https://via.placeholder.com/100"
                            alt="Stripe"
                            className="img-fluid mb-3"
                        />
                        <h5>Stripe</h5>
                        <Link to="/donate/stripe" className="btn btn-primary btn-sm">
                            Donate via Stripe
                        </Link>
                    </div>
                </div>

                {/* Option 5 */}
                <div className="col-md-4 mb-4">
                    <div className="card p-3">
                        <img
                            src="https://via.placeholder.com/100"
                            alt="Crypto"
                            className="img-fluid mb-3"
                        />
                        <h5>Crypto</h5>
                        <Link to="/donate/crypto" className="btn btn-primary btn-sm">
                            Donate Crypto
                        </Link>
                    </div>
                </div>

                {/* Option 6 */}
                <div className="col-md-4 mb-4">
                    <div className="card p-3">
                        <img
                            src="https://via.placeholder.com/100"
                            alt="Other"
                            className="img-fluid mb-3"
                        />
                        <h5>Other</h5>
                        <Link to="/donate/other" className="btn btn-primary btn-sm">
                            Explore More Options
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Donate;
