import React from 'react';
import { Link } from 'react-router-dom';

const Donate = () => {
    return (
        <div className="container mt-5">
            <div className="text-center">
                {/* Image */}
                <img 
                    src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1736005518/task_management___balance_balancing_unicycle_shapes_woman_people_tasks_gw2fm2.png" 
                    alt="About Us" 
                    className="img-fluid mb-4" 
                    style={{ width: '50%', maxWidth: '300px', height: 'auto', borderRadius: '10px' }}
                />

                {/* Text Content */}
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-10">
                            <h2>Donate to Us</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Nullam vehicula, tortor vitae pharetra pellentesque, risus orci suscipit lorem,
                                nec facilisis orci magna non neque. Ut porttitor eget orci id ultricies.
                                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
                                Integer non tincidunt risus. Donec ut nulla accumsan, tincidunt nulla a, pharetra justo.
                            </p>
                        </div>
                    </div>
                </div>


                {/* Call-to-Action Button */}
                <Link to="/" className="btn btn-primary btn-lg">
                    Donate
                </Link>
            </div>
        </div>
    );
};

export default Donate;