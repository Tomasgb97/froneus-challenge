import React, { useMemo } from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import NavSideMenuMobile from '@components/mobile/layout/header/navSideMenu/NavSideMenuMobile';

export interface navItemsProps {
  label: string;
  command: () => void;
  icon?: string;
  styleClass?: string;
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const items: navItemsProps[] = useMemo(() => {
    return [
      {
        label: 'Home',
        command: () => {
          navigate('/');
        },
        icon: 'pi pi-home',
      },
      {
        label: 'Campaigns',
        command: () => {
          navigate('/campaigns');
        },
        icon: 'pi pi-clipboard',
      },
    ];
  }, []);
  return (
    <header className="w-full fixed flex justify-between items-center pr-4">
      <a className="cursor-pointer select-none h-full px-5">
        <h1 className="font-bold text-white">Froneus</h1>
      </a>

      <nav>
        <div className="pt-menubar bg-transparent hidden lg:inline">
          <Menubar
            pt={{
              label: {
                className: 'text-white',
              },
              icon: {
                className: 'text-white',
              },

              content: {
                className:
                  ' bg-transparent hover:bg-gray-500 active:bg-gray-500',
              },
            }}
            className="bg-transparent"
            model={items}
          />
        </div>

        <div className="lg:hidden">
          <NavSideMenuMobile items={items} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
