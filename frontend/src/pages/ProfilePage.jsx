/**
 * src/pages/ProfilePage.jsx - User profile view and edit
 * TODO: Fetch user profile from /api/auth/me
 * TODO: Allow updating name, phone, profilePicture
 * TODO: For students: show/edit RoommateProfile
 * TODO: For owners: show/edit businessName, gstNumber
 */

import { useState, useEffect } from 'react';
import { authService } from '../services/authService';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        // TODO: authService.getMe().then(res => setProfile(res.data))
    }, []);

    return (
        <div className="profile-page">
            <h1>My Profile</h1>
            {!profile ? (
                <p>Loading profile...</p>
            ) : (
                <div className="profile-card">
                    {/* TODO: Profile picture upload */}
                    <h2>{profile.name}</h2>
                    <p>{profile.email}</p>
                    <p>Role: {profile.role}</p>
                    {/* TODO: Edit form */}
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
