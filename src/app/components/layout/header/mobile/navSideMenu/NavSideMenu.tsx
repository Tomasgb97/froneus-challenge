import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import React, { useState } from 'react';
import { navItemsProps } from '../../Header';
import { Ripple } from 'primereact/ripple';

interface NavSideMenuProps{
    items: navItemsProps[]
}

const NavSideMenu: React.FC<NavSideMenuProps> = ({items}) => {
    const [visible, setVisible] = useState(false)

    const handleRedirect =(redirect: ()=>void)=>{
        redirect();
        setVisible(false)

    }
    return (
    <>
    <Sidebar position='right' visible={visible} onHide={() => setVisible(false)} >
    <h2 className='font-bold'>NAVIGATE</h2>
    <ul className="list-none py-3 m-0 overflow-hidden">
        {items.map((item, i)=>{return(
            <li key={i}>
            <a onClick={()=>handleRedirect(item.command)} className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
               { <i className={`pi ${item.icon} mr-2`}></i>}
                <span className="font-medium">{item.label}</span>
                <Ripple />
            </a>
        </li>
        )})}
    </ul>
    
</Sidebar>
<Button className='p-2 bg-white' icon="pi pi-bars" onClick={() => setVisible(true)} /></>
        
        
    );
};

export default NavSideMenu;