import React from 'react';
import useAuth from '../../../Hooks/useAuth';

const UserHome = () => {
    const {user} = useAuth()
    
    return (
        <div className='w-full m-5'>
            <h2 className='text-3xl'>Hi, <span className='text-[#D1A054]'>{user.displayName}</span>!!</h2>
            
        </div>
    );
};

export default UserHome;