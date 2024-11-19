import { useState } from 'react';

const data = [
  {
    id: '1',
    heading: 'Auto Pay',
    fullParagraph:
      'Automate Your Payments Effortlessly With Auto Pay, you can set up automatic payments for your recurring bills and loans. This service ensures that you never miss a due date by automatically deducting the payment from your account on the scheduled date. It saves you time and eliminates the hassle of remembering multiple payment dates, providing peace of mind and helping you avoid late fees.',
    shortParagraph: 'Automate Your Payments Effortlessly With Auto Pay...',
    image: 'src/assets/Images/Services/auto_pay.png',
  },
  {
    id: '2',
    heading: 'Personal Banking',
    fullParagraph:
      "Personalized Banking Solutions Our Personal Banking services are designed to cater to your individual financial needs. From savings and checking accounts to personalized financial advice, we offer a range of products and services to help you manage your money effectively. Whether you're planning for the future, saving for a big purchase, or simply managing your day-to-day expenses, our personal banking services provide the tools and support you need.",
    shortParagraph:
      'Personalized Banking Solutions Our Personal Banking services...',
    image: 'src/assets/Images/Services/personal_banking.png',
  },
  {
    id: '3',
    heading: 'Business Banking',
    fullParagraph:
      'Tailored Services for Your Business We understand that every business is unique, which is why our Business Banking services are tailored to meet the specific needs of your business. We offer a variety of solutions including business loans, credit lines, merchant services, and cash management tools. Our goal is to support your business growth by providing flexible financing options and expert advice to help you navigate the financial landscape.',
    shortParagraph: 'Tailored Services for Your Business We understand...',
    image: 'src/assets/Images/Services/business_banking.png',
  },
  {
    id: '4',
    heading: 'Investment Services',
    fullParagraph:
      "Grow Your Wealth with Expert Advice Our Investment Services are designed to help you achieve your financial goals through personalized guidance and a wide range of investment options. Whether you're a seasoned investor or just starting out, our team of experts can help you create a diversified portfolio that aligns with your risk tolerance and financial objectives. We offer investment opportunities in stocks, bonds, mutual funds, and more, along with regular reviews to ensure your investments are on track.",
    shortParagraph:
      'Grow Your Wealth with Expert Advice Our Investment Services...',
    image: 'src/assets/Images/Services/investment_services.png',
  },
  {
    id: '5',
    heading: 'Online & Mobile Banking',
    fullParagraph:
      'Bank Anytime, Anywhere Our Online & Mobile Banking services give you the flexibility to manage your accounts from anywhere, at any time. You can access your account information, transfer funds, pay bills, and even deposit checks using our secure mobile app. With features like real-time alerts and mobile payments, you can stay on top of your finances and make banking convenient and secure.',
    shortParagraph:
      'Bank Anytime, Anywhere Our Online & Mobile Banking services...',
    image: 'src/assets/Images/Services/online_banking.png',
  },
  {
    id: '6',
    heading: 'Loan Services',
    fullParagraph:
      'Flexible Loan Options We offer a variety of loan services to meet your financial needs, including personal loans, auto loans, and mortgages. Our loan products come with competitive interest rates and flexible terms to make borrowing more accessible and affordable. Our team can help you navigate the loan application process, ensuring you get the financing you need with terms that fit your budget.',
    shortParagraph:
      'Flexible Loan Options We offer a variety of loan services...',
    image: 'src/assets/Images/Services/loan_services.png',
  },
  {
    id: '7',
    heading: 'Credit Card Services',
    fullParagraph:
      "Comprehensive Credit Card Management Our Credit Card Services are designed to provide you with the flexibility and security you need. Whether you're looking to earn rewards, build credit, or enjoy low-interest rates, we offer a range of credit card options to suit your needs. You can manage your account online, track your spending, and receive fraud protection to keep your financial information safe.",
    shortParagraph:
      'Comprehensive Credit Card Management Our Credit Card Services...',
    image: 'src/assets/Images/Services/credit_card_services.png',
  },
  {
    id: '8',
    heading: 'Customer Support',
    fullParagraph:
      '24/7 Customer Support At Acsentis Bank, we prioritize customer satisfaction. Our dedicated Customer Support team is available 24/7 to assist you with any questions or issues you may have. Whether you need help with your account, technical support, or financial advice, our team is here to provide prompt and professional assistance.',
    shortParagraph: '24/7 Customer Support At Acsentis Bank...',
    image: 'src/assets/Images/Services/customer_support.png',
  },
];

const Services = () => {
  const [expandedDiv, setExpandedDiv] = useState(null);
  const handleExpand = (id) => {
    setExpandedDiv(expandedDiv === id ? null : id);
  };
  return (
    <>

      <div className='h-auto md:h-[500px] w-full max-w-screen-2xl m-auto px-4 md:px-36 flex flex-col justify-center items-center md:gap-20 gap-10'>
        <h1
          className='relative z-10 md:text-center text-left text-4xl md:text-6xl font-SF_Pro_Regular mt-8 sm:mt-0'
          style={{
            background:
              'var(--Brand-Gradient, linear-gradient(270deg, #8CB9BD 0%, #163172 100%))',
            backgroundClip: 'text',
            webkitBackgroundClip: 'text',
            webkitTextFillColor: 'transparent',
          }}
        >
          Empowering Your Financial Future with Acsentis Bank&apos;s
          Comprehensive Services
        </h1>

        <p className='font-SF_PRO_Light text-[#5A6161] text-[15px] sm:text-2xl md:text-center text-left md:px-40 sm:px-20 mb-12 sm:mb-0'>
          At Acsentis Bank, we offer a range of services designed to meet all
          your financial needs. Explore our services to find the perfect
          solution for managing your finances with ease and confidence.
        </p>
      </div>

      <div className='h-auto w-full max-w-screen-2xl m-auto flex flex-col justify-center items-center px-6 py-6 md:py-0 md:px-20 gap-3.5 md:gap-10'>
        {' '}
        {data.map(({ id, heading, fullParagraph, shortParagraph, image }) => (
          <div
            key={id}
            className={`h-[200px] md:h-[400px] w-full rounded-[30px] flex justify-center items-center overflow-hidden md:flex-row flex-col ${
              expandedDiv === id ? 'transition-all duration-500 h-auto' : ''
            }`}
            style={{ boxShadow: '2px 2px 40px -6px rgba(0, 0, 0, 0.10)' }}
            onClick={() => handleExpand(id)}
          >
            <div className='w-full md:w-[60%] h-auto md:h-full flex flex-col justify-center items-start px-8 py-8 md:py-0'>
              <div className='h-[40px] md:h-[90px]'>
                <h1
                  className='relative z-10 text-center text-2xl md:text-4xl h-full font-SF_PRO_Light'
                  // style={{
                  //   background:
                  //     'var(--Brand-Gradient, linear-gradient(270deg, #8CB9BD 0%, #163172 100%))',
                  //   backgroundClip: 'text',
                  //   webkitBackgroundClip: 'text',
                  //   webkitTextFillColor: 'transparent',
                  // }}
                >
                  {heading}
                </h1>
              </div>
              <div
                className={`text-[#787F7F] font-SF_PRO_Light text-[20px] ${
                  expandedDiv === id ? 'block' : 'hidden'
                } md:block`}
              >
                {' '}
                {fullParagraph}{' '}
              </div>
              <div
                className={`text-[#787F7F] font-SF_PRO_Light text-[20px] ${
                  expandedDiv === id ? 'hidden' : 'block'
                } md:hidden`}
              >
                {' '}
                {shortParagraph}{' '}
              </div>
            </div>
            <div className='w-[40%] h-full justify-center items-center p-6 md:flex hidden'>
              <img
                src={image}
                className='h-full w-full object-cover rounded-[30px]'
              />
            </div>
          </div>
        ))}
      </div>
      <div className='w-full max-w-screen-2xl m-auto h-[100px]'></div>
    </>
  );
};

export default Services;
