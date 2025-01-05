import React from 'react';
import { Link } from 'react-router-dom';

const Donate = () => {
    return (
        <div className="container mt-5">
            {/* Two-Column Layout */}
            <div className="row align-items-center mb-5">
                {/* Content Column */}
                <div className="col-lg-6">
                    <h2 className='text-center mb-3'>Support Us</h2>
                    <p>
                    At Jessster, we’re on a mission to bring a little humor and a lot of joy into your daily routine. From hilarious headlines to comedic takes on the news, our goal is to make you smile, chuckle, and maybe even laugh out loud.
                    </p>
                    <p>
                    But keeping the laughs rolling isn’t free—we rely on the support of our amazing readers (that’s you!) to keep the jokes flowing and the website running smoothly. Your donations help us:
                    </p>
                    <p>
                    Brew endless coffee for our pun-loving writers ☕
                    </p>
                    <p>
                    Cover the cost of hosting all our comedic masterpieces 💻
                    </p>
                    <p>
                    Dream up bigger, bolder, and funnier ideas to share with the world 💡
                    </p>
                    <p>
                    If Jessster has ever brightened your day, consider giving back! Every contribution, big or small, helps us keep doing what we love: spreading laughter one article at a time.
                    </p>
                    <p>
                    Thank you for being part of the Jessster family. Together, we can make the world a funnier place! 😄
                    </p>
                    {/*
                    <Link to="/" className="btn btn-primary btn-lg">
                        Learn More
                    </Link>
                    */}
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
                            src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1736066921/Frame_427318908_knlxqs.png"
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
                            src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1736066914/Frame_427318907_kdbzpr.png"
                            alt="Buy Me a Coffee"
                            className="img-fluid mb-3"
                        />
                        <h5>Buy Me a Coffee</h5>
                        <Link to="https://buymeacoffee.com/jessster" className="btn btn-primary btn-sm">
                            Support Us
                        </Link>
                    </div>
                </div>

                {/* Option 3 */}
                <div className="col-md-4 mb-4">
                    <div className="card p-3">
                        <img
                            src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1736066914/Frame_427318909_vrnfe3.png"
                            alt="Ko-fi"
                            className="img-fluid mb-3"
                        />
                        <h5>Ko-fi</h5>
                        <Link to="https://ko-fi.com/jessster" className="btn btn-primary btn-sm">
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
                            src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1736069093/Frame_427318910_inaak1.png"
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
