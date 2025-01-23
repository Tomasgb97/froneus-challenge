import React from 'react';

const Header: React.FC = () => {
    return (
        <header className='w-full bg-gray-400/40 shadow-md shadow-white/20 fixed flex justify-center'>
            <h1 className='font-bold text-white'>Welcome to Froneus Challenge</h1>
        </header>
    );
};

export default Header;