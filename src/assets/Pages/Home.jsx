import { useNavigate } from 'react-router-dom';
import UserReview from '../components/UserReview.jsx';
import FAQ from '../components/FAQ.jsx';
import heroImage from '../Images/hero_image.png';
import card01 from '../Images/card01.png';
import card02 from '../Images/card02.png';
import card03 from '../Images/card03.png';
import card04 from '../Images/card04.png';
import cards from '../Images/cards.png';
import fdMockup from '../Images/fd_mockup.png';
import autopayMockup from '../Images/autopay_mockup.png';
import payment from '../Images/payment.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Section-01 */}
      <div className='h-[800px] w-full max-w-screen-2xl mx-auto  flex justify-center items-start  pt-24'>
        <div className='w-[95%] max-w-screen-lg mx-auto md:w-3/5 h-[300px] flex flex-col justify-center items-center'>
          <div className='h-[143px] md:h-[150px] flex justify-center items-center'>
            <h1 className='h-full text-center font-geologica text-[40px] md:text-[70px] font-light leading-none bg-gradient-to-r from-[#8CB9BD] to-[#163172] bg-clip-text text-transparent'>
              Banking Redefined with Trust and Technology
            </h1>
          </div>

          <div className='h-28 md:h-20 w-full flex flex-col md:flex-row px-6 md:px-24'>
            <div className='flex-1 flex justify-center items-center'>
              <p className='text-center text-[14px] md:text-[16px] font-SF_PRO_Light text-gray-600'>
                Join millions of satisfied customers and take control of your
                finances today with Ascentis Bank
              </p>
            </div>
            <div className='flex justify-center items-center md:mt-0 md:w-48 h-full'>
              <button
                className='h-[50px] px-8 bg-[#0D427C] text-white rounded-full font-SF_PRO_Thin text-[16px] flex items-center justify-center cursor-pointer'
                onClick={() => {
                  navigate('/register');
                }}
              >
                Get Started
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='30' // Increase the width
                  height='30' // Increase the height
                  fill='currentColor'
                  className='bi bi-arrow-right-short cursor-pointer' // Add cursor-pointer to the SVG
                  viewBox='0 0 16 16'
                >
                  <path
                    fillRule='evenodd'
                    d='M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*Hero Image*/}
      <div className='h-[360px] w-auto max-w-screen-2xl mx-auto  flex items-start justify-start'>
        <div className=' h-full w-full relative'>
          <img
            src={heroImage}
            className='absolute top-[-450px] scale-90'
            // style={{
            //   boxShadow: '2px 2px 152.3px -27px rgba(22, 49, 114, 0.49)',
            //   // border: '2px solid ',
            //   // borderColor: '#323232',
            // }}
          />
        </div>
      </div>

      {/* Section-02 */}
      <div className='h-auto w-full max-w-screen-2xl mx-auto  flex flex-col justify-center items-center relative overflow-hidden py-16 px-4 md:px-8'>
        {/* Heading */}
        <div className='text-center mb-4 mt-8'>
          <h1 className='text-[32px] md:text-[48px] pr-4 md:pr-64 text-left font-SF_PRO_Light text-black leading-tight pl-4'>
            Helping You Find the Right Financial Solutions Customized for Your
            Goals.
          </h1>
        </div>

        {/* Cards Section */}
        <div className='h-[480px] w-full mt-6 md:grid md:grid-cols-4 flex overflow-x-scroll scrollbar-hide'>
          {/* Card 01 */}
          <div className='min-w-[240px] md:w-full flex flex-col p-1'>
            <img
              src={card01}
              alt='card01'
              className='object-cover rounded-[36px]'
            />
            <p className='pl-6 mt-2 font-SF_PRO_Light text-[20px] text-[#323232]'>
              Bank Anytime, Anywhere
            </p>
          </div>
          {/* Card 02 */}
          <div className='min-w-[240px] md:w-full flex flex-col p-1'>
            <img
              src={card02}
              alt='card02'
              className='object-cover rounded-[36px]'
            />
            <p className='pl-6 mt-2 font-SF_PRO_Light text-[20px] text-[#323232]'>
              Low Interest Rates
            </p>
          </div>
          {/* Card 03 */}
          <div className='min-w-[240px] md:w-full flex flex-col p-1'>
            <img
              src={card03}
              alt='card03'
              className='h-[55%] md:h-[72%] object-cover rounded-[36px]'
            />
            <p className='pl-6 mt-2 font-SF_PRO_Light text-[20px] text-[#323232]'>
              Safe & Secure Transactions
            </p>
          </div>
          {/* Card 04 */}
          <div className='min-w-[240px] md:w-full flex flex-col p-1'>
            <img
              src={card04}
              alt='card04'
              className='object-cover rounded-[36px]'
            />
            <p className='pl-6 mt-2 font-SF_PRO_Light text-[20px] text-[#323232]'>
              Fast Account Setup
            </p>
          </div>
        </div>
      </div>

      {/* Section-03 */}
      <div className='h-auto w-full max-w-screen-2xl mx-auto  '>
        {/* Heading Section */}
        <div>
          <h1 className='text-center text-black text-[48px]'>Why Choose Us</h1>
          <p className='text-center text-[26px] mt-4 px-60 font-SF_PRO_Thin text-black text-opacity-55'>
            We are dedicated to providing unparalleled banking solutions,
            fostering trust, and driving innovation to enhance your experience.
          </p>
        </div>

        {/* Cards Section */}
        <div className='flex justify-center items-center gap-8 px-8 mt-20'>
          {/* Card 01 */}
          <div className='flex flex-col items-start bg-black bg-opacity-5 rounded-[50px] p-6 h-[360px] w-[260px]'>
            <div className='h-20 w-full flex justify-start items-start '>
              <div
                className='rounded-full w-auto pr-3 h-8 flex items-center'
                style={{
                  bordeRadius: '30px',
                  background:
                    'var(--color-azure-4330, rgba(0, 151, 220, 0.30))',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className='bg-[#0097DC] rounded-full w-8 h-full'></div>
                <h2 className='text-[#0097DC] font-SF_PRO_Regular ml-2'>
                  Trust
                </h2>
              </div>
            </div>

            <div className='h-32 w-full'>
              <p
                className='text-left font-SF_PRO_Light text-gray-600 mt-2'
                style={{
                  color: 'rgba(0, 0, 0, 0.50)',
                  fontSize: 'var(--line-height-24, 18px)',
                }}
              >
                Serving over 20,000 customers across India, our bank is built on
                trust and long-lasting relationships.
              </p>
            </div>

            <div
              className='mt-4 h-20 w-52 flex justify-center items-center self-end '
              style={{
                borderRadius: '50px',
                background: 'rgba(0, 0, 0, 0.05)',
              }}
            >
              <p className='font-SF_Pro_Regular text-[19px]'>
                20K+ Satisfied <br /> Customers
              </p>
            </div>
          </div>

          {/* Card 02 */}
          <div className='flex flex-col items-start bg-black bg-opacity-5 rounded-[50px] p-6 h-[360px] w-[260px]'>
            <div className='h-20 w-full flex justify-start items-start '>
              <div
                className='rounded-full w-auto pr-3 h-8 flex items-center'
                style={{
                  bordeRadius: '30px',
                  background: 'var(--color-red-6130, rgba(243, 108, 66, 0.30))',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className='bg-[#F36C42] rounded-full w-8 h-full'></div>
                <h2 className='text-[#F36C42] font-SF_PRO_Regular ml-2'>
                  Support
                </h2>
              </div>
            </div>

            <div className='h-32 w-full'>
              <p
                className='text-left font-SF_PRO_Light text-gray-600 mt-2'
                style={{
                  color: 'rgba(0, 0, 0, 0.50)',
                  fontSize: 'var(--line-height-24, 18px)',
                }}
              >
                Round-the-clock assistance to address all your banking needs,
                ensuring peace of mind.
              </p>
            </div>

            <div
              className='mt-4 h-20 w-52 flex justify-center items-center self-end '
              style={{
                borderRadius: '50px',
                background: 'rgba(0, 0, 0, 0.05)',
              }}
            >
              <p className='font-SF_Pro_Regular text-[19px]'>
                24/7 Customer <br /> Support
              </p>
            </div>
          </div>

          {/* Card 03 */}
          <div className='flex flex-col items-start bg-black bg-opacity-5 rounded-[50px] p-6 h-[360px] w-[260px]'>
            <div className='h-20 w-full flex justify-start items-start '>
              <div
                className='rounded-full w-auto pr-3 h-8 flex items-center'
                style={{
                  bordeRadius: '30px',
                  background:
                    'var(--color-spring-green-3830, rgba(18, 178, 89, 0.30))',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className='bg-[#12B259] rounded-full w-8 h-full'></div>
                <h2 className='text-[#12B259] font-SF_PRO_Regular ml-2'>
                  Convenience
                </h2>
              </div>
            </div>

            <div className='h-32 w-full'>
              <p
                className='text-left font-SF_PRO_Light text-gray-600 mt-2'
                style={{
                  color: 'rgba(0, 0, 0, 0.50)',
                  fontSize: 'var(--line-height-24, 18px)',
                }}
              >
                Stay connected to your finances anytime, anywhere, with our
                user-friendly mobile app.
              </p>
            </div>

            <div
              className='mt-4 h-20 w-52 flex justify-center items-center self-end '
              style={{
                borderRadius: '50px',
                background: 'rgba(0, 0, 0, 0.05)',
              }}
            >
              <p className='font-SF_Pro_Regular text-[19px]'>
                Seamless Mobile <br /> Banking
              </p>
            </div>
          </div>

          {/* Card 04 */}
          <div className='flex flex-col items-start bg-black bg-opacity-5 rounded-[50px] p-6 h-[360px] w-[260px]'>
            <div className='h-20 w-full flex justify-start items-start '>
              <div
                className='rounded-full w-auto pr-3 h-8 flex items-center'
                style={{
                  bordeRadius: '30px',
                  background:
                    'var(--color-violet-5630, rgba(179, 49, 235, 0.30))',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className='bg-[#B331EB] rounded-full w-8 h-full'></div>
                <h2 className='text-[#B331EB] font-SF_PRO_Regular ml-2'>
                  Control
                </h2>
              </div>
            </div>

            <div className='h-32 w-full'>
              <p
                className='text-left font-SF_PRO_Light text-gray-600 mt-2'
                style={{
                  color: 'rgba(0, 0, 0, 0.50)',
                  fontSize: 'var(--line-height-24, 18px)',
                }}
              >
                Manage all your accounts, transactions, and services
                effortlessly through our secure online platform.
              </p>
            </div>

            <div
              className='mt-4 h-20 w-52 flex justify-center items-center self-end '
              style={{
                borderRadius: '50px',
                background: 'rgba(0, 0, 0, 0.05)',
              }}
            >
              <p className='font-SF_Pro_Regular text-[19px]'>
                Web Dashboard <br /> Access
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section-04 */}
      <div className='h-auto  w-full max-w-screen-2xl mx-auto py-32 flex flex-col justify-center items-center'>
        <h1 className='text-[48px]  text-center font-SF_PRO_Light text-black leading-tight mb-16'>
          Smart Banking Features to Simplify Your Life
        </h1>

        {/* Card-01 */}
        <div
          className='w-[90%] h-[510px] flex justify-center items-center mb-12'
          style={{ borderRadius: '50px', background: 'rgba(0, 0, 0, 0.05)' }}
        >
          <div className='flex-1 h-full w-full  flex flex-col justify-center items-start py-12 px-6'>
            {/* Heading */}
            <h1 className='text-2xl font-SF_Pro_Regular text-black mb-4'>
              Create Your FD in Just 2 Minutes
            </h1>

            {/* Description */}
            <p className='font-SF_PRO_Light text-[#757575] text-[18px] mb-4'>
              Start earning with the best interest rates. Our process is quick,
              secure, and hassle-free.
            </p>

            {/* Points List */}
            <ul className='text-left font-SF_PRO_Light text-[#757575] text-base list-decimal pl-6 mb-6'>
              <li className='mb-2'>Instant Setup</li>
              <li className='mb-2'>Attractive Interest Rates</li>
              <li className='mb-2'>Flexible Tenures</li>
              <li className='mb-2'>24/7 Access</li>
            </ul>

            {/* Button */}
            <button
              className='py-2 px-4 bg-[#0D427C] text-white rounded-full font-SF_PRO_Thin text-[16px] flex items-center justify-center cursor-pointer'
              onClick={() => {
                navigate('/register');
              }}
            >
              Start Your FD Now
            </button>
          </div>

          <div className='flex-1 h-full w-full  flex justify-center items-center p-2'>
            <img src={fdMockup} alt='fd_image' />
          </div>
        </div>

        {/* Card-02 */}
        <div
          className='w-[90%] h-[510px] flex justify-center items-center'
          style={{ borderRadius: '50px', background: 'rgba(0, 0, 0, 0.05)' }}
        >
          <div className='flex-1 h-full w-full  flex flex-col justify-center items-start py-12 px-6'>
            {/* Heading */}
            <h1 className='text-2xl font-SF_Pro_Regular text-black mb-4'>
              Automate Payments with Auto Pay
            </h1>

            {/* Description */}
            <p className='font-SF_PRO_Light text-[#757575] text-[18px] mb-4'>
              Never miss a payment. Set up automatic bill payments and stay
              worry-free.
            </p>

            {/* Points List */}
            <ul className='text-left font-SF_PRO_Light text-[#757575] text-base list-decimal pl-6 mb-6'>
              <li className='mb-2'>
                Enter 5 key details and your account password.
              </li>
              <li className='mb-2'>
                Boom! Your Auto Pay is successfully set up.
              </li>
            </ul>

            {/* Button */}
            <button
              className='py-2 px-4 bg-[#0D427C] text-white rounded-full font-SF_PRO_Thin text-[16px] flex items-center justify-center cursor-pointer'
              onClick={() => {
                navigate('/register');
              }}
            >
              Activate Auto Pay
            </button>
          </div>

          <div className='flex-1 h-full w-full  flex justify-center items-center p-2'>
            <img src={autopayMockup} alt='autopay_image' />
          </div>
        </div>
      </div>

      {/* Section-05 */}
      <div className='h-screen w-full max-w-screen-2xl mx-auto  flex justify-center items-center'>
        <div className='h-[500px] w-[80%] overflow-hidden  rounded-[50px] flex justify-center items-center'>
          {/* Text Section */}
          <div className='flex-1 h-full w-full  flex flex-col justify-center items-start gap-4'>
            <h1 className='font-SF_PRO_Light text-black text-[30px]'>
              Transparent Banking. No Hidden Fees.
            </h1>
            <h1
              className='font-SF_PRO_Light text-[30px]'
              style={{
                background: 'linear-gradient(270deg, #8CB9BD 0%, #163172 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
              }}
            >
              100% Clarity
            </h1>
            <p className='text-[#2B3031] font-SF_PRO_Light'>
              Open an Ascentis Account in Minutes.
              <br /> Start Banking Smarter Today.
            </p>
            <button
              className='bg-[#0D427C] rounded-full px-8 py-2 text-white font-SF_PRO_Light cursor-pointer'
              onClick={() => navigate('/register')}
            >
              Get Your Ascentis Account Now
            </button>
          </div>

          {/* Image Section */}
          <div className='flex-1 h-full w-full flex justify-center items-center '>
            <img
              src={payment}
              alt='payment'
              className='w-[80%] h-full object-cover'
            />
          </div>
        </div>
      </div>

      {/* Section-06 */}
      <div
        className='w-full max-w-screen-2xl mx-auto flex flex-col items-center px-16 pt-24 pb-9 bg-white max-md:px-5'
        role='region'
        aria-labelledby='discover-cards-title'
      >
        {/* Main Heading */}
        <h1
          id='discover-cards-title'
          className='text-[48px] font-SF_PRO_Regular text-black text-center max-md:text-4xl'
        >
          Discover the Perfect Card for Every Lifestyle
        </h1>

        {/* Subheading */}
        <p className=' text-[24px] font-SF_PRO_Light text-center text-[#6E6E6E] mt-4'>
          From students to business professionals, our cards are tailored to
          meet your unique needs.
        </p>

        {/* Card Section */}
        <div className='self-stretch mt-16'>
          <div className='flex gap-5 max-md:flex-col'>
            {/* Image Section */}
            <div className='w-6/12 max-md:w-full flex justify-center items-center'>
              <img
                loading='lazy'
                src={cards}
                alt='Collection of credit cards showcasing different card types including Platinum, Business, Student, Reward, and Secured cards'
                className='w-full object-contain'
              />
            </div>

            {/* Card Descriptions */}
            <div className='w-6/12 max-md:w-full'>
              <div className='bg-black bg-opacity-5 rounded-[48px] px-10 py-14'>
                <ul
                  role='list'
                  aria-label='Available credit card types'
                  className='space-y-6'
                >
                  <li>
                    <span className='text-[20px] uppercase text-zinc-800 font-SF_PRO_Regular'>
                      Platinum Card:
                    </span>
                    <br />
                    <span className='text-[20px] text-[#6E6E6E] font-SF_PRO_Light'>
                      Luxury redefined for high-net-worth individuals. Exclusive
                      privileges at your fingertips.
                    </span>
                  </li>
                  <li>
                    <span className='text-[20px] uppercase text-zinc-800 font-SF_PRO_Regular'>
                      Business Card:
                    </span>
                    <br />
                    <span className='text-[20px] text-[#6E6E6E] font-SF_PRO_Light'>
                      Streamline your business expenses with tailored solutions
                      for professionals.
                    </span>
                  </li>
                  <li>
                    <span className='text-[20px] uppercase text-zinc-800 font-SF_PRO_Regular'>
                      Student Card:
                    </span>
                    <br />
                    <span className='text-[20px] text-[#6E6E6E] font-SF_PRO_Light'>
                      Empowering students with credit-building opportunities and
                      practical perks.
                    </span>
                  </li>
                  <li>
                    <span className='text-[20px] uppercase text-zinc-800 font-SF_PRO_Regular'>
                      Reward Card:
                    </span>
                    <br />
                    <span className='text-[20px] text-[#6E6E6E] font-SF_PRO_Light'>
                      Maximize every purchase with unmatched rewards for your
                      everyday spending.
                    </span>
                  </li>
                  <li>
                    <span className='text-[20px] uppercase text-zinc-800 font-SF_PRO_Regular'>
                      Secured Card:
                    </span>
                    <br />
                    <span className='text-[20px] text-[#6E6E6E] font-SF_PRO_Light'>
                      A reliable option to build credit, backed by a secure
                      deposit.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section-07 */}
      <UserReview />

      <FAQ />

      <div className='h-[100px] w-full max-w-screen-2xl m-auto'></div>
    </>
  );
};

export default Home;
