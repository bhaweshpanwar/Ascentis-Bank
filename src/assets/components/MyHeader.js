/*const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className='flex flex-col items-center w-full max-w-screen-2xl mx-auto bg-white'>

      <section className='flex items-center justify-end w-full bg-blue-900 px-4 py-2 space-x-6'>
        <a href='#' className='text-gray-300 text-sm hover:text-white'>
          Contact Us
        </a>
        <span className='text-gray-300'>|</span>
        <a href='#' className='text-gray-300 text-sm hover:text-white'>
          Apply Now
        </a>
        <span className='text-gray-300'>|</span>
        <a href='#' className='text-gray-300 text-sm hover:text-white'>
          Login or Register
        </a>
        <div className='relative flex items-center ml-4'>
          <span className='material-symbols-outlined absolute left-2 text-gray-500'>
            search
          </span>
          <input
            type='text'
            placeholder='Search'
            className='pl-10 pr-4 py-2 w-48 text-sm bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
      </section>


      <section className='flex items-center justify-between w-full px-4 py-4 bg-gradient-to-r from-white/60 to-gray-400/60'>
        <div className='w-40'>
          <img src='Assets/03.png' alt='img' className='object-cover w-full' />
        </div>
        <nav className='hidden md:flex space-x-8'>
          <a href='#' className='text-gray-700 text-base hover:text-gray-900'>
            Home
          </a>
          <a href='#' className='text-gray-700 text-base hover:text-gray-900'>
            Products
          </a>
          <a href='#' className='text-gray-700 text-base hover:text-gray-900'>
            Business Banking
          </a>
          <a href='#' className='text-gray-700 text-base hover:text-gray-900'>
            Personal Banking
          </a>
          <a href='#' className='text-gray-700 text-base hover:text-gray-900'>
            Custom Banking
          </a>
          <a href='#' className='text-gray-700 text-base hover:text-gray-900'>
            About us
          </a>
        </nav>

        <button
          onClick={handleToggleMenu}
          className='text-gray-700 text-2xl md:hidden focus:outline-none'
        >
          <span className='material-symbols-outlined'>menu</span>
        </button>
      </section>


      {isMobileMenuOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-40 z-10 md:hidden'
          onClick={handleToggleMenu}
        ></div>
      )}


      <div
        className={`fixed top-0 right-0 h-full w-3/4 bg-blue-900 text-center transform z-20 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <button
          onClick={handleToggleMenu}
          className='absolute top-4 left-4 text-white text-2xl'
        >
          ✕
        </button>
        <ul className='space-y-6 pt-16'>
          <li>
            <a href='#' className='text-white text-lg hover:text-yellow-300'>
              Home
            </a>
          </li>
          <li>
            <a href='#' className='text-white text-lg hover:text-yellow-300'>
              Products
            </a>
          </li>
          <li>
            <a href='#' className='text-white text-lg hover:text-yellow-300'>
              Business Banking
            </a>
          </li>
          <li>
            <a href='#' className='text-white text-lg hover:text-yellow-300'>
              Personal Banking
            </a>
          </li>
          <li>
            <a href='#' className='text-white text-lg hover:text-yellow-300'>
              Custom Banking
            </a>
          </li>
          <li>
            <a href='#' className='text-white text-lg hover:text-yellow-300'>
              About us
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;*/
