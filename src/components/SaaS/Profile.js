import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProfile, updateProfile, deleteProfile } from '../../services/api';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [error, setError] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const token = localStorage.getItem('authToken');
    const navigate = useNavigate();

    // Load user profile when the component mounts
    useEffect(() => {
        const loadProfile = async () => {
            try {
                const profileData = await fetchProfile(token);
                console.log(profileData); 
                setProfile(profileData);
                setProfilePicture(profileData.profile_picture);
            } catch (err) {
                setError(err.detail || 'Error fetching profile');
                console.error('Error fetching profile:', err);
            }
        };

        loadProfile();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        const formData = new FormData();
    
        if (profilePicture) {
            // Validate file extension before appending
            const fileExtension = profilePicture.name.split('.').pop().toLowerCase();
            const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp']; // Allowed file types
    
            if (allowedExtensions.includes(fileExtension)) {
                formData.append('profile_picture', profilePicture);
            } else {
                setError('Invalid file type. Allowed types are: jpg, jpeg, png, webp.');
                return; // Prevent form submission
            }
        } else {
            // Send an empty file or explicit request to reset the profile picture
            const emptyFile = new File([], ''); // Creating an empty file
            formData.append('profile_picture', emptyFile);
        }
    
        try {
            const updatedProfile = await updateProfile(formData, token);
            setProfile((prevProfile) => ({
                ...prevProfile,
                ...updatedProfile, 
            }));
        } catch (error) {
            setError('Error updating profile');
            console.error('Error updating profile:', error);
        }
    };

    const confirmDeleteProfile = () => {
        setConfirmDelete(true); // Show delete confirmation modal
    };

    const handleDelete = async () => {
        if (confirmDelete) {
            try {
                await deleteProfile(token);

                // Clear user token from localStorage to log them out
                localStorage.removeItem('authToken');

                navigate('/'); // Redirect to homepage after profile deletion
            } catch (error) {
                setError('Error deleting profile');
                console.error('Error deleting profile:', error);
            }
        }
    };

    const handleLogout = () => {
        navigate('/logout');
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(file); // Set the selected image for upload
        }
    };

    const handleResetImage = () => {
        setProfilePicture(null); // Reset the image to null instead of a URL
        setShowImageModal(true); // Open the modal after resetting
    };

    return (
        <div className='dashboard-background-profile'>
            <div className='container-fluid'>
                {/* Show error message if it exists */}
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <div className="row">
                    {/* Sidebar */}
                    <nav className="col-md-2 d-none d-md-block sidebar">
                        <h2 className="sidebar-heading text-center fw-bold mt-3">Menu</h2>
                        <ul className="nav flex-column">
                            <hr className="divider" />
                            <li className="nav-item">
                                <Link className="nav-link text-dark fw-bold" to="/dashboard">Dashboard</Link>
                            </li>
                            <hr className="divider" />
                            <li className="nav-item">
                                <Link className="nav-link text-dark fw-bold" to="/bookmarks">Saved Articles</Link>
                            </li>
                            <hr className="divider" />

                            <li className="nav-item">
                                <Link className="nav-link text-dark fw-bold" to="/profile">Profile</Link>
                            </li>
                            <hr className="divider" />
                            <li className="nav-item">
                                <Link className="nav-link text-dark fw-bold" to="/">Home Page</Link>
                            </li>
                            <hr className="divider" />
                        </ul>

                        {/* User Info and Logout Section */}
                        <div className="sidebar-user-info mt-4 text-center fw-bold">
                            {profile && (
                                <p>Welcome, {profile.username} !</p>
                            )}
                            <button
                                onClick={handleLogout}
                                className="btn btn-sm btn-danger fw-bold"
                            >
                                Logout
                            </button>
                        </div>
                    </nav>

                    {/* Main Content */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-4 d-flex flex-column justify-content-center" style={{ minHeight: '80vh' }}>
                        <div className="text-center mb-4 d-flex align-items-center justify-content-center">
                            <img
                                src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1736174973/image-removebg-preview_1_rez4gn.png"
                                alt="Logo"
                                style={{ width: '100px', height: '100px', marginRight: '0px' }}
                            />
                            <h1 className="d-inline mb-0">Jessster Times</h1>
                        </div>

                        {/* Profile Section */}
                        <div className="text-center mb-4 d-flex align-items-center justify-content-center" style={{ flex: 1 }}>
                            <div className="position-relative">
                                <img
                                    src={profilePicture ? profilePicture : "https://res.cloudinary.com/dnbbm9vzi/image/upload/v1736169445/cartoonish_animated_black_and_white_profile_image_of_a_jester_facing_forward_ixolqj.jpg"}
                                    alt="Profile"
                                    style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '10px' }}
                                />
                                <button
                                    className="btn btn-link position-absolute top-0 end-0 p-1"
                                    style={{ fontSize: '1.2rem', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '50%' }}
                                    onClick={() => setShowImageModal(true)}
                                >
                                    <i className="fas fa-pencil-alt text-white"></i>
                                </button>
                            </div>
                            <h1 className="d-inline mb-0">Profile</h1>
                        </div>

                        {/* User Information */}
                        <div className="text-center mb-4">
                            <p><strong>Username:</strong> {profile?.username}</p>
                            <p><strong>Email:</strong> {profile?.email || 'No email available'}</p>
                        </div>

                        {/* Delete Button */}
                        <div className="d-flex justify-content-center">
                            <button onClick={confirmDeleteProfile} className="btn btn-danger mx-2 fw-bold">Delete Profile</button>
                        </div>

                        {/* Profile Image Modal */}
                        {showImageModal && (
                            <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }} aria-hidden="false">
                                <div className="modal-dialog">
                                    <div className="modal-content text-center" style={{ backgroundColor: '#F9FAFC' }}>
                                        <div className="modal-header">
                                            <h5 className="modal-title fw-bold" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                                                Update Profile Picture
                                            </h5>
                                            <button type="button" className="btn-close" onClick={() => setShowImageModal(false)} aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form
                                                onSubmit={(e) => {
                                                    handleSubmit(e);
                                                    setShowImageModal(false); // Close modal after successful submit
                                                }}
                                            >
                                                <div className="mb-2">
                                                    <input
                                                        type="file"
                                                        onChange={handleImageUpload}
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <button type="button" className="btn btn-danger mt-3 fw-bold" onClick={handleResetImage}>
                                                        Reset to Default image
                                                    </button>
                                                </div>
                                                <div className="modal-footer d-flex justify-content-between">
                                                    <button type="button" className="btn btn-secondary fw-bold" onClick={() => setShowImageModal(false)}>
                                                        Cancel
                                                    </button>
                                                    <button type="submit" className="btn btn-primary fw-bold">
                                                        Save
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Delete Profile Confirmation */}
                        {confirmDelete && (
                            <div className="modal fade show" id="deleteConfirmationModal" tabIndex="-1" style={{ display: 'block' }} aria-hidden="false">
                                <div className="modal-dialog">
                                    <div className="modal-content" style={{ backgroundColor: '#F9FAFC' }}>
                                        <div className="modal-header">
                                            <h5 className="modal-title fw-bold" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>Confirm Deletion</h5>
                                            <button type="button" className="btn-close" onClick={() => setConfirmDelete(false)} aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body text-center">
                                            <p>Are you sure you want to delete your profile?</p>
                                            <p>This action is not reversible!</p>
                                        </div>
                                        <div className="modal-footer d-flex justify-content-between">
                                            <button type="button" className="btn btn-secondary" onClick={() => setConfirmDelete(false)}>Cancel</button>
                                            <button type="button" className="btn btn-danger" onClick={handleDelete}>Confirm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Profile;
