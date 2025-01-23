import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full h-full bg-primary-900 min-h-20 p-2 lg:p-4 m-0">
      <div className="flex justify-center gap-6 lg:gap-64 w-full items-center">
        <ul>
          <li>
            <a href="#home" className="text-white">
              Inicio
            </a>
          </li>
          <li>
            <a href="#about" className="text-white">
              Nosotros
            </a>
          </li>
        </ul>

        <div>
          <img src="/favicon.png" alt="" />
        </div>

        <ul>
          <li>
            <a href="#faq" className="text-white">
              FAQ
            </a>
          </li>

          <li>
            <a href="#services" className="text-white">
              Servicios
            </a>
          </li>
          <li>
            <a href="#contact" className="text-white">
              Contacto
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
