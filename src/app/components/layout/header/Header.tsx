import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import NavSideMenu from './mobile/navSideMenu/NavSideMenu';

export interface navItemsProps {
    label: string;
    command: () => void;
    icon?: string;
}

const Header: React.FC = () => {
    const navigate = useNavigate();
    const items: navItemsProps[] = [
        {
            label: 'Home',
            command: () => {
                navigate('/');
            },
            icon: 'pi pi-home'
        },
        {
            label: 'Campaigns',
            command: () => {
                navigate('/campaigns');
            },
            icon: 'pi pi-clipboard'
        }
     
    ];
    return (
        <header className='w-full fixed flex justify-between items-center pr-4'>
            <a className='cursor-pointer select-none h-full bg-gray-400/40 shadow-md shadow-white/20 px-5'>
            <h1 className='font-bold text-white'>Froneus</h1>
            </a>

            <nav>
                <div className='hidden lg:inline'>
                <Menubar   model={items} />
                </div>
            
            <div className='lg:hidden'>
            <NavSideMenu  items={items}/>
            </div>
            
            </nav>
        </header>
    );
};

export default Header;