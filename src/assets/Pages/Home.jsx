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
      <div className='h-auto md:h-[800px] w-full max-w-screen-2xl mx-auto flex justify-center items-start pt-16 md:pt-24'>
        <div className='w-[95%] max-w-screen-lg mx-auto md:w-3/5 h-auto md:h-[300px] flex flex-col justify-center items-center'>
          <div className='h-auto md:h-[150px] flex justify-center items-center'>
            <h1 className='h-full text-center font-geologica text-[40px] md:text-[70px] font-light leading-none bg-gradient-to-r from-[#8CB9BD] to-[#163172] bg-clip-text text-transparent'>
              Banking Redefined with Trust and Technology
            </h1>
          </div>

          <div className='h-auto md:h-20 w-full flex flex-col md:flex-row px-4 mt-4 md:mt-0 md:px-24'>
            <div className='flex-1 flex justify-center items-center'>
              <p className='text-center text-[14px] md:text-[16px] font-SF_PRO_Light text-gray-600'>
                Join millions of satisfied customers and take control of your
                finances today with Ascentis Bank
              </p>
            </div>
            <div className='flex justify-center items-center mt-6 md:mt-0 md:w-48 h-full'>
              <button
                className='h-[50px] px-8 bg-[#0D427C] text-white rounded-full font-SF_PRO_Thin text-[16px] flex items-center justify-center cursor-pointer'
                onClick={() => {
                  navigate('/register');
                }}
              >
                Get Started
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='30'
                  height='30'
                  fill='currentColor'
                  className='bi bi-arrow-right-short cursor-pointer'
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
      <div className='hidden md:flex h-[250px] md:h-[360px] w-full max-w-screen-2xl mx-auto items-start justify-center md:justify-start'>
        <div className='h-full w-full relative'>
          <img
            src={heroImage}
            alt='Ascentis Bank App Mockup'
            className='absolute top-[-180px] md:top-[-450px] scale-[0.8] md:scale-90 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0'
          />
        </div>
      </div>

      {/* Section-02 */}
      <div className='h-auto w-full max-w-screen-2xl mx-auto flex flex-col justify-center items-center relative overflow-hidden py-12 md:py-16 px-4 md:px-8'>
        {/* Heading */}
        <div className='text-center md:text-left mb-4 mt-8 md:w-full'>
          <h1 className='text-[32px] md:text-[48px] pr-0 md:pr-12 lg:pr-64 font-SF_PRO_Light text-black leading-tight pl-0 md:pl-4'>
            Helping You Find the Right Financial Solutions Customized for Your
            Goals.
          </h1>
        </div>

        {/* Cards Section */}
        <div className='h-auto md:h-[480px] w-full mt-6 md:grid md:grid-cols-4 flex overflow-x-auto md:overflow-x-hidden snap-x snap-mandatory scrollbar-hide gap-4 md:gap-0'>
          {/* Card 01 */}
          <div className='min-w-[240px] md:w-full flex flex-col p-1 snap-center'>
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
          <div className='min-w-[240px] md:w-full flex flex-col p-1 snap-center'>
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
          <div className='min-w-[240px] md:w-full flex flex-col p-1 snap-center'>
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
          <div className='min-w-[240px] md:w-full flex flex-col p-1 snap-center'>
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
      <div className='h-auto w-full max-w-screen-2xl mx-auto py-16 md:py-24'>
        {/* Heading Section */}
        <div>
          <h1 className='text-center text-black text-4xl md:text-[48px]'>
            Why Choose Us
          </h1>
          <p className='text-center text-lg md:text-[26px] mt-4 px-4 md:px-16 lg:px-60 font-SF_PRO_Thin text-black text-opacity-55'>
            We are dedicated to providing unparalleled banking solutions,
            fostering trust, and driving innovation to enhance your experience.
          </p>
        </div>

        {/* Cards Section */}
        <div className='flex flex-col md:flex-row justify-center items-center gap-8 px-8 mt-12 md:mt-20'>
          {/* Card 01 */}
          <div className='flex flex-col items-start bg-black bg-opacity-5 rounded-[50px] p-6 h-[360px] w-full max-w-sm md:w-[260px]'>
            <div className='h-20 w-full flex justify-start items-start '>
              <div
                className='rounded-full w-auto pr-3 h-8 flex items-center'
                style={{
                  background: 'rgba(0, 151, 220, 0.30)',
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
              <p className='text-left font-SF_PRO_Light text-black/50 mt-2 text-[18px]'>
                Serving over 20,000 customers across India, our bank is built on
                trust and long-lasting relationships.
              </p>
            </div>
            <div className='mt-4 h-20 w-52 flex justify-center items-center self-end rounded-[50px] bg-black/5'>
              <p className='font-SF_Pro_Regular text-[19px]'>
                20K+ Satisfied <br /> Customers
              </p>
            </div>
          </div>

          {/* Card 02 */}
          <div className='flex flex-col items-start bg-black bg-opacity-5 rounded-[50px] p-6 h-[360px] w-full max-w-sm md:w-[260px]'>
            <div className='h-20 w-full flex justify-start items-start '>
              <div
                className='rounded-full w-auto pr-3 h-8 flex items-center'
                style={{
                  background: 'rgba(243, 108, 66, 0.30)',
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
              <p className='text-left font-SF_PRO_Light text-black/50 mt-2 text-[18px]'>
                Round-the-clock assistance to address all your banking needs,
                ensuring peace of mind.
              </p>
            </div>
            <div className='mt-4 h-20 w-52 flex justify-center items-center self-end rounded-[50px] bg-black/5'>
              <p className='font-SF_Pro_Regular text-[19px]'>
                24/7 Customer <br /> Support
              </p>
            </div>
          </div>

          {/* Card 03 */}
          <div className='flex flex-col items-start bg-black bg-opacity-5 rounded-[50px] p-6 h-[360px] w-full max-w-sm md:w-[260px]'>
            <div className='h-20 w-full flex justify-start items-start '>
              <div
                className='rounded-full w-auto pr-3 h-8 flex items-center'
                style={{
                  background: 'rgba(18, 178, 89, 0.30)',
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
              <p className='text-left font-SF_PRO_Light text-black/50 mt-2 text-[18px]'>
                Stay connected to your finances anytime, anywhere, with our
                user-friendly mobile app.
              </p>
            </div>
            <div className='mt-4 h-20 w-52 flex justify-center items-center self-end rounded-[50px] bg-black/5'>
              <p className='font-SF_Pro_Regular text-[19px]'>
                Seamless Mobile <br /> Banking
              </p>
            </div>
          </div>

          {/* Card 04 */}
          <div className='flex flex-col items-start bg-black bg-opacity-5 rounded-[50px] p-6 h-[360px] w-full max-w-sm md:w-[260px]'>
            <div className='h-20 w-full flex justify-start items-start '>
              <div
                className='rounded-full w-auto pr-3 h-8 flex items-center'
                style={{
                  background: 'rgba(179, 49, 235, 0.30)',
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
              <p className='text-left font-SF_PRO_Light text-black/50 mt-2 text-[18px]'>
                Manage all your accounts, transactions, and services
                effortlessly through our secure online platform.
              </p>
            </div>
            <div className='mt-4 h-20 w-52 flex justify-center items-center self-end rounded-[50px] bg-black/5'>
              <p className='font-SF_Pro_Regular text-[19px]'>
                Web Dashboard <br /> Access
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section-04 */}
      <div className='h-auto w-full max-w-screen-2xl mx-auto py-16 md:py-32 flex flex-col justify-center items-center gap-12'>
        <h1 className='text-3xl md:text-4xl lg:text-[48px] text-center font-SF_PRO_Light text-black leading-tight mb-4 md:mb-8 px-4'>
          Smart Banking Features to Simplify Your Life
        </h1>

        {/* Card-01 */}
        <div className='w-[90%] h-auto flex flex-col lg:flex-row justify-center items-center rounded-[50px] bg-black/5 overflow-hidden'>
          <div className='flex-1 h-full w-full flex flex-col justify-center items-start py-8 px-6 md:p-12'>
            <h1 className='text-2xl font-SF_Pro_Regular text-black mb-4'>
              Create Your FD in Just 2 Minutes
            </h1>
            <p className='font-SF_PRO_Light text-[#757575] text-[18px] mb-4'>
              Start earning with the best interest rates. Our process is quick,
              secure, and hassle-free.
            </p>
            <ul className='text-left font-SF_PRO_Light text-[#757575] text-base list-decimal pl-6 mb-6'>
              <li className='mb-2'>Instant Setup</li>
              <li className='mb-2'>Attractive Interest Rates</li>
              <li className='mb-2'>Flexible Tenures</li>
              <li className='mb-2'>24/7 Access</li>
            </ul>
            <button
              className='h-[50px] px-6 bg-[#0D427C] text-white rounded-full font-SF_PRO_Thin text-[16px] flex items-center justify-center cursor-pointer'
              onClick={() => navigate('/register')}
            >
              Start Your FD Now
            </button>
          </div>
          <div className='flex-1 h-full w-full flex justify-center items-center p-2'>
            <img
              src={fdMockup}
              alt='Fixed Deposit mockup'
              className='w-full h-auto max-w-md'
            />
          </div>
        </div>

        {/* Card-02 */}
        <div className='w-[90%] h-auto flex flex-col lg:flex-row-reverse justify-center items-center rounded-[50px] bg-black/5 overflow-hidden'>
          <div className='flex-1 h-full w-full flex flex-col justify-center items-start py-8 px-6 md:p-12'>
            <h1 className='text-2xl font-SF_Pro_Regular text-black mb-4'>
              Automate Payments with Auto Pay
            </h1>
            <p className='font-SF_PRO_Light text-[#757575] text-[18px] mb-4'>
              Never miss a payment. Set up automatic bill payments and stay
              worry-free.
            </p>
            <ul className='text-left font-SF_PRO_Light text-[#757575] text-base list-decimal pl-6 mb-6'>
              <li className='mb-2'>
                Enter 5 key details and your account password.
              </li>
              <li className='mb-2'>
                Boom! Your Auto Pay is successfully set up.
              </li>
            </ul>
            <button
              className='h-[50px] px-6 bg-[#0D427C] text-white rounded-full font-SF_PRO_Thin text-[16px] flex items-center justify-center cursor-pointer'
              onClick={() => navigate('/register')}
            >
              Activate Auto Pay
            </button>
          </div>
          <div className='flex-1 h-full w-full flex justify-center items-center p-2'>
            <img
              src={autopayMockup}
              alt='Autopay mockup'
              className='w-full h-auto max-w-md'
            />
          </div>
        </div>
      </div>

      {/* Section-05 */}
      <div className='h-auto lg:h-screen w-full max-w-screen-2xl mx-auto flex justify-center items-center py-16 lg:py-0'>
        <div className='h-auto lg:h-[500px] w-[90%] lg:w-[80%] overflow-hidden rounded-[50px] flex flex-col lg:flex-row justify-center items-center gap-8'>
          {/* Text Section */}
          <div className='flex-1 h-full w-full flex flex-col justify-center items-center text-center lg:items-start lg:text-left gap-4'>
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
              className='bg-[#0D427C] rounded-full px-8 py-3 text-white font-SF_PRO_Light cursor-pointer'
              onClick={() => navigate('/register')}
            >
              Get Your Ascentis Account Now
            </button>
          </div>

          {/* Image Section */}
          <div className='flex-1 h-full w-full flex justify-center items-center'>
            <img
              src={payment}
              alt='payment'
              className='w-full max-w-md lg:w-[80%] lg:h-full object-contain'
            />
          </div>
        </div>
      </div>

      {/* Section-06 */}
      <div
        className='w-full max-w-screen-2xl mx-auto flex flex-col items-center px-5 md:px-16 pt-16 md:pt-24 pb-9 bg-white'
        role='region'
        aria-labelledby='discover-cards-title'
      >
        <h1
          id='discover-cards-title'
          className='text-4xl md:text-[48px] font-SF_PRO_Regular text-black text-center'
        >
          Discover the Perfect Card for Every Lifestyle
        </h1>
        <p className='text-lg md:text-[24px] font-SF_PRO_Light text-center text-[#6E6E6E] mt-4'>
          From students to business professionals, our cards are tailored to
          meet your unique needs.
        </p>
        <div className='self-stretch mt-12 md:mt-16'>
          <div className='flex flex-col md:flex-row gap-5'>
            <div className='w-full md:w-6/12 flex justify-center items-center'>
              <img
                loading='lazy'
                src={cards}
                alt='Collection of credit cards showcasing different card types'
                className='w-full object-contain'
              />
            </div>
            <div className='w-full md:w-6/12'>
              <div className='bg-black bg-opacity-5 rounded-[48px] px-6 py-8 md:px-10 md:py-14'>
                <ul
                  role='list'
                  aria-label='Available credit card types'
                  className='space-y-6'
                >
                  <li>
                    <span className='text-base md:text-[20px] uppercase text-zinc-800 font-SF_PRO_Regular'>
                      Platinum Card:
                    </span>
                    <br />
                    <span className='text-base md:text-[20px] text-[#6E6E6E] font-SF_PRO_Light'>
                      Luxury redefined for high-net-worth individuals. Exclusive
                      privileges at your fingertips.
                    </span>
                  </li>
                  <li>
                    <span className='text-base md:text-[20px] uppercase text-zinc-800 font-SF_PRO_Regular'>
                      Business Card:
                    </span>
                    <br />
                    <span className='text-base md:text-[20px] text-[#6E6E6E] font-SF_PRO_Light'>
                      Streamline your business expenses with tailored solutions
                      for professionals.
                    </span>
                  </li>
                  <li>
                    <span className='text-base md:text-[20px] uppercase text-zinc-800 font-SF_PRO_Regular'>
                      Student Card:
                    </span>
                    <br />
                    <span className='text-base md:text-[20px] text-[#6E6E6E] font-SF_PRO_Light'>
                      Empowering students with credit-building opportunities and
                      practical perks.
                    </span>
                  </li>
                  <li>
                    <span className='text-base md:text-[20px] uppercase text-zinc-800 font-SF_PRO_Regular'>
                      Reward Card:
                    </span>
                    <br />
                    <span className='text-base md:text-[20px] text-[#6E6E6E] font-SF_PRO_Light'>
                      Maximize every purchase with unmatched rewards for your
                      everyday spending.
                    </span>
                  </li>
                  <li>
                    <span className='text-base md:text-[20px] uppercase text-zinc-800 font-SF_PRO_Regular'>
                      Secured Card:
                    </span>
                    <br />
                    <span className='text-base md:text-[20px] text-[#6E6E6E] font-SF_PRO_Light'>
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

      <div className='h-16 md:h-[100px] w-full max-w-screen-2xl m-auto'></div>
    </>
  );
};

export default Home;
