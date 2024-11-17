import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const navigate = useNavigate();

  return (
      // fixed z-20 top-0
  <header className='flex items-center justify-between w-full max-w-screen-2xl mx-auto bg-white border-b border-gray-200 px-4 py-4'>
      {/* Logo */}
      <div className='w-40'>
        <img
          src='/src/assets/Images/03_cropped.png'
          alt='Ascentis Logo'
          className='object-cover w-full'
        />
      </div>

      {/* Desktop Navigation */}
      <nav className='hidden md:flex space-x-8 text-center font-SF_PRO_Light'>
        <a className='text-gray-700 text-base hover:text-gray-900 cursor-pointer'
        onClick={() => {navigate('/')}}>
          Home
        </a>
        <a  className='text-gray-700 text-base hover:text-gray-900 cursor-pointer'
            onClick={() => {navigate('/services')}}>
          Services
        </a>
        <a href='#' className='text-gray-700 text-base hover:text-gray-900'>
          Business
        </a>
        <a href='#' className='text-gray-700 text-base hover:text-gray-900'>
          Personal
        </a>
        <a className='text-gray-700 text-base hover:text-gray-900 cursor-pointer'
        onClick={() => {navigate('/about')}}>
          About
        </a>
      </nav>

      {/* Login/Register Buttons */}
      <div className='hidden sm:flex sm:items-center sm:space-x-4'>
        <a
          className='bg-[#0D427C] text-white py-2 px-6 rounded-full font-SF_PRO_Light cursor-pointer'
          onClick={() => navigate('/login')}
        >
          Login
        </a>
        {/* <a
          href='#'
          className='bg-white text-[#0D427C] py-1 px-4 border border-[#0D427C] rounded-full hover:bg-gray-100'
        >
          Register
        </a> */}
      </div>

      {/* Mobile Menu Toggle Button */}
      <i
        className='fa fa-bars md:hidden cursor-pointer'
        aria-hidden='true'
        onClick={handleToggleMenu}
      ></i>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-40 z-10 md:hidden'
          onClick={handleToggleMenu}
        ></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 bg-[#0D427C] text-center transform z-20 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <button
          onClick={handleToggleMenu}
          className='absolute top-4 left-4 text-white text-2xl'
        >
          ✕
        </button>
        <ul className='space-y-6 pt-16 text-white font-SF_PRO_Light'>
          <li>
            <a className='text-lg hover:text-yellow-300'
               onClick={() => {navigate('/')}}>
              Home
            </a>
          </li>
          <li>
            <a href='#' className='text-lg hover:text-yellow-300'
               onClick={() => {navigate('/services')}}>
              Services
            </a>
          </li>
          <li>
            <a href='#' className='text-lg hover:text-yellow-300'>
              Business
            </a>
          </li>
          <li>
            <a href='#' className='text-lg hover:text-yellow-300'>
              Personal
            </a>
          </li>
          <li>
            <a href='#' className='text-lg hover:text-yellow-300'
               onClick={() => {navigate('/about')}}>
              About
            </a>
          </li>
          {/* Mobile Login/Register CTA */}
          <li className='pt-4'>
            <a
              onClick={() => navigate('/login')}
              className='block bg-white text-[#163172] font-semibold py-1 px-2 rounded-full mb-4 mx-24'
            >
              Login
            </a>
            <a
              onClick={() => navigate('/register')}
              className='block bg-[#163172] text-white font-semibold py-1 px-4 rounded-full mb-4 mx-24'
            >
              Register
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
