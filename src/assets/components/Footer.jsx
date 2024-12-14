const Footer = () => {
  return (
    <footer
      className=' rounded-3xl mb-10 w-full max-w-screen-2xl m-auto font-SF_PRO_Light'
      style={{
        // backgroundImage: 'linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)'
        // backgroundImage: 'linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)',
        // backgroundImage: 'linear-gradient(60deg, #29323c 0%, #485563 100%)',
        backgroundImage: 'linear-gradient(45deg, #93a5cf 0%, #e4efe9 30%)',
      }}
    >
      <div className='container mx-auto p-6 md:p-8 xl:px-0'>
        <div className='mx-auto max-w-screen-2xl px-6 pb-10 pt-16'>
          <div className='xl:grid xl:grid-cols-4 xl:gap-8'>
            {/* Logo and Description */}
            <div className='space-y-4 xl:col-span-1'>
              <a
                href='/'
                className='flex items-center space-x-2 text-2xl font-medium'
              >
                <img
                  src='src/assets/Images/04.png'
                  alt='Ascentis Bank Logo'
                  className='w-12'
                />
                <span className='text-[#163172] font-SF_PRO_Semibold'>
                  Ascentis Bank
                </span>
              </a>
              <p className='max-w-md text-md font-SF_PRO_Light text-gray-900'>
                Empowering your financial future with comprehensive and
                innovative banking solutions for all your financial needs.
              </p>
              <div className='flex space-x-4'>
                <a href='#' className='text-gray-800 hover:text-gray-800'>
                  <span className='sr-only'>LinkedIn</span>
                  <svg
                    fill='currentColor'
                    viewBox='0 0 24 24'
                    className='h-6 w-6'
                  >
                    <path
                      d='M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z'
                      clipRule='evenodd'
                    />
                  </svg>
                </a>
                <a href='#' className='text-gray-800 hover:text-gray-800'>
                  <span className='sr-only'>Twitter</span>
                  <svg
                    fill='currentColor'
                    viewBox='0 0 24 24'
                    className='h-6 w-6'
                  >
                    <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
                  </svg>
                </a>
              </div>
            </div>
            {/* Solutions and Use Cases */}
            <div className='grid grid-cols-2 gap-8 xl:col-span-2'>
              <div>
                <h3 className='text-md  leading-6 text-[20px] text-black'>
                  Our Solutions
                </h3>
                <ul className='mt-6 space-y-4'>
                  <li>
                    <a
                      href='/services'
                      className='text-md text-gray-600 hover:text-gray-800'
                    >
                      Personal Banking
                    </a>
                  </li>
                  <li>
                    <a
                      href='/services'
                      className='text-md text-gray-600 hover:text-gray-800'
                    >
                      Business Banking
                    </a>
                  </li>
                  <li>
                    <a
                      href='/services'
                      className='text-md text-gray-600 hover:text-gray-800'
                    >
                      Investment Services
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className='text-md  leading-6 text-[20px] text-black'>
                  Use Cases
                </h3>
                <ul className='mt-6 space-y-4'>
                  <li>
                    <a
                      href='/services'
                      className='text-md text-gray-600 hover:text-gray-800'
                    >
                      Loans
                    </a>
                  </li>
                  <li>
                    <a
                      href='/services'
                      className='text-md text-gray-600 hover:text-gray-800'
                    >
                      Credit Cards
                    </a>
                  </li>
                  <li>
                    <a
                      href='/services'
                      className='text-md text-gray-600 hover:text-gray-800'
                    >
                      Online & Mobile Banking
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* Contact Us */}
            <div>
              <h3 className='text-md  leading-6 text-[20px] text-black'>
                Contact Us
              </h3>
              <p className='mt-6 text-md text-gray-600'>
                Phone: +91 7223814415
              </p>
              <p className='mt-4 text-md text-gray-600'>
                Email: ascentisbank@gmail.com
              </p>
              <p className='mt-4 text-md text-gray-600'>
                Address: Sudama Nagar{' '}
              </p>
            </div>
          </div>
          {/* Footer Bottom */}
          <div className='mt-16 border-t border-gray-400 pt-8 text-center'>
            <p className='text-md text-gray-600'>
              © 2024 Ascentis Bank. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
