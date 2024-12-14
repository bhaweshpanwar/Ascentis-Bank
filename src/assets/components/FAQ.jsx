const FAQ = () => {
  const faqs = [
    {
      question: 'How do I open a bank account?',
      answer:
        'Opening a bank account is quick and fully online. Visit our website, fill out the application form, and upload your identification documents. Your account will be activated once the verification process is complete.',
    },
    {
      question: 'What documents are required to open an account?',
      answer:
        'You will need to upload valid identification documents such as Aadhaar Card, PAN Card, or Passport during the online application process.',
    },
    {
      question: 'How can I open a Fixed Deposit (FD) account?',
      answer:
        'You can open an FD account by logging into your dashboard. Navigate to the “Fixed Deposits” section, select the desired tenure and amount, and complete the process online.',
    },
    {
      question: 'How do I enable auto-pay for my bills?',
      answer:
        'To set up auto-pay, log in to your dashboard, navigate to the “Payments & Bills” section, and add the bills you want to automate. Select auto-pay, set the amount and schedule, and confirm.',
    },
    {
      question: 'What is the interest rate for savings accounts?',
      answer:
        'Our savings accounts offer competitive interest rates. Log in to your dashboard or visit the savings section on our website for the latest rates.',
    },
    {
      question: 'How do I report a lost or stolen card?',
      answer:
        'To report a lost or stolen card, log in to your account dashboard, go to the “Cards” section, and block the card immediately. You can also contact our 24/7 customer support for assistance.',
    },
    {
      question: 'How can I reset my online banking password?',
      answer:
        "To reset your password, click on 'Forgot Password' on the login page. Follow the instructions sent to your registered email or phone number to securely reset your password.",
    },
    {
      question: 'What benefits do your credit cards offer?',
      answer:
        'Our credit cards provide a range of benefits, including cashback, reward points, travel perks, and exclusive discounts on online shopping. Visit the “Cards” section in your dashboard for details.',
    },
    {
      question: 'How do I update my contact information?',
      answer:
        'You can update your contact information by logging into your dashboard and navigating to the “Profile Settings” section. Changes will be reflected immediately upon verification.',
    },
    {
      question: 'How can I close my account?',
      answer:
        'To close your account, log in to your dashboard and request account closure under “Account Settings.” You can also contact our support team for assistance.',
    },
  ];

  return (
    <div className='w-full max-w-screen-2xl mx-auto p-8 bg-white dark:bg-gray-900'>
      <section className='faq-section'>
        <div className='py-8 px-4 sm:py-16 lg:px-6'>
          <h2 className='mb-8 text-4xl tracking-tight font-SF_Pro_Regular text-black dark:text-white text-center'>
            Frequently Asked Questions
          </h2>
          <div className='grid pt-8 text-left border-t border-gray-200 dark:border-gray-700 md:gap-16 md:grid-cols-2'>
            {faqs.map((faq, index) => (
              <div key={index} className='mb-10'>
                <h3 className='flex items-center mb-4 text-lg font-medium text-black dark:text-white'>
                  <svg
                    className='flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z'
                      clipRule='evenodd'
                    />
                  </svg>
                  {faq.question}
                </h3>
                <p className='text-gray-500 dark:text-gray-400'>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
