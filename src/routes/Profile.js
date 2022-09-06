// routes/Profile.js
import { authService } from 'fbase';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const onLogOutClick = async () => {
    await authService.signOut();
    navigate('/');
  };
  
  return (
    <>
      <button onClick={onLogOutClick}>
        Log Out
      </button>
    </>
  );
};

export default Profile;