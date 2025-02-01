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
                    - Brew endless coffee for our pun-loving writers ☕
                    </p>
                    <p>
                    - Cover the cost of hosting all our comedic masterpieces 💻
                    </p>
                    <p>
                    - Dream up bigger, bolder, and funnier ideas to share with the world 💡
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

                {/* Option 2 */}
                <div className="col-md-3 mb-4">
                    <div className="card p-3">
                        <img
                            src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1736066914/Frame_427318907_kdbzpr.png"
                            alt="Buy Me a Coffee"
                            className="img-fluid mb-3"
                        />
                        <h5 className='fw-bold'>Buy Me a Coffee</h5>
                        <Link to="https://buymeacoffee.com/jessster" className="btn btn-warning fw-bold p-3">
                            Buy a Coffee
                        </Link>
                    </div>
                </div>

                {/* Option 1 */}
                <div className="col-md-3 mb-4">
                    <div className="card p-3">
                        <img
                            src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1736066921/Frame_427318908_knlxqs.png"
                            alt="PayPal"
                            className="img-fluid mb-3"
                        />
                        <h5 className='fw-bold'>PayPal</h5>
                        <Link to="https://www.paypal.com/donate/?hosted_button_id=3NX5AKJAXEM3U" className="btn btn-primary fw-bold p-3">
                            Donate via PayPal
                        </Link>
                    </div>
                </div>


                {/* Option 3 */}
                <div className="col-md-3 mb-4">
                    <div className="card p-3">
                        <img
                            src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1736066914/Frame_427318909_vrnfe3.png"
                            alt="Ko-fi"
                            className="img-fluid mb-3"
                        />
                        <h5 className='fw-bold'>Ko-fi</h5>
                        <Link to="https://ko-fi.com/jessster" className="btn btn-secondary fw-bold p-3">
                            Donate on Ko-fi
                        </Link>
                    </div>
                </div>

                {/* Option 4 */}
                <div className="col-md-3 mb-4">
                    <div className="card p-3">
                        <img
                            src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1736074494/Frame_427318911_flwyfj.png"
                            alt="Stripe"
                            className="img-fluid mb-3"
                        />
                        <h5 className='fw-bold'>Stripe</h5>
                        <Link to="https://buy.stripe.com/8wM02UaVNaw5e0U288" className="btn fw-bold p-3"
                        style={{
                            backgroundColor: '#685cfc', // Custom background color
                            color: '#ffffff',           // Custom text color
                            border: 'none',             // Optional: Remove border
                            padding: '10px 20px',       // Optional: Adjust padding
                            borderRadius: '5px',        // Optional: Add rounded corners
                            textDecoration: 'none',     // Optional: Ensure link looks like a button
                            display: 'inline-block',    // Optional: Maintain inline-block behavior
                            transition: 'all 0.3s ease' // Optional: Add smooth hover effect
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#5032B5'} // Hover effect
                        onMouseOut={(e) => e.target.style.backgroundColor = '#685cfc'}
                        >
                            Donate via Stripe
                        </Link>
                    </div>
                </div>

                {/* Option 5 
                <div className="col-md-4 mb-4">
                    <div className="card p-3">
                        <img
                            src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1736076187/sssd_ewpmoh.png"
                            alt="Crypto"
                            className="img-fluid mb-3"
                        />
                        <h5 className='fw-bold'>Coinbase</h5>
                        <Link to="https://www.coinbase.com/en-gb" className="btn btn-primary fw-bold p-3">
                            Donate Crypto
                        </Link>
                    </div>
                </div>
                */}

                {/* Option 6 
                <div className="col-md-4 mb-4">
                    <div className="card p-3">
                        <img
                            src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1736075738/Frame_427318912_rj78dj.png"
                            alt="Other"
                            className="img-fluid mb-3"
                        />
                        <h5 className='fw-bold'>Patreon</h5>
                        <Link to="https://www.patreon.com/profile/creators?u=154920752" className="btn fw-bold p-3"
                        style={{
                            backgroundColor: '#ff5733', // Custom background color
                            color: '#ffffff',           // Custom text color
                            border: 'none',             // Optional: Remove border
                            padding: '10px 20px',       // Optional: Adjust padding
                            borderRadius: '5px',        // Optional: Add rounded corners
                            textDecoration: 'none',     // Optional: Ensure link looks like a button
                            display: 'inline-block',    // Optional: Maintain inline-block behavior
                            transition: 'all 0.3s ease' // Optional: Add smooth hover effect
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#e04e2b'} // Hover effect
                        onMouseOut={(e) => e.target.style.backgroundColor = '#ff5733'}
                        >
                            Support on Patreon
                        </Link>
                    </div>
                </div>
                */}
            </div>
        </div>
    );
};

export default Donate;
