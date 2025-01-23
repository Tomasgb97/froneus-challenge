import React from 'react';

const Header: React.FC = () => {
    return (
        <header className='w-full fixed flex justify-start'>
            <a className='cursor-pointer select-none h-full bg-gray-400/40 shadow-md shadow-white/20 px-5'>
          
            <h1 className='font-bold text-white'>Froneus</h1>
           
            </a>
            
           
        </header>
    );
};

export default Header;