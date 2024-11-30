const FAQ = () => {
  const faqs = [
    {
      question: 'How do I open a bank account?',
      answer:
        'Opening a bank account with us is easy. You can apply online through our website or visit any of our branches with the necessary identification documents. Our staff will guide you through the process.',
    },
    {
      question: 'What documents are required to open an account?',
      answer:
        'To open a bank account, you will need to provide identification documents such as a valid ID proof (Aadhaar card, PAN card, Passport) and address proof (utility bill, rental agreement). Additional documents may be required based on the type of account.',
    },
    {
      question: 'How can I apply for a loan?',
      answer:
        'You can apply for a loan online through our website or visit any of our branches. Our loan officers will assist you in selecting the right loan product and guide you through the application process.',
    },
    {
      question: 'What is the interest rate for savings accounts?',
      answer:
        'Our savings account interest rates are competitive and vary based on the account type and balance. For the latest interest rates, please visit our website or contact our customer service.',
    },
    {
      question: 'How do I report a lost or stolen card?',
      answer:
        'If your card is lost or stolen, please contact our customer service immediately to report it. You can also block your card through our mobile app or online banking portal to prevent unauthorized transactions.',
    },
    {
      question: 'How can I reset my online banking password?',
      answer:
        "To reset your online banking password, go to the login page and click on the 'Forgot Password' link. Follow the instructions to reset your password securely.",
    },
    {
      question: 'What are the benefits of a credit card?',
      answer:
        'Our credit cards offer various benefits, including cashback, reward points, travel privileges, and more. For detailed information, please visit the credit card section on our website.',
    },
    {
      question: 'How do I update my contact information?',
      answer:
        'You can update your contact information through our online banking portal or mobile app. Alternatively, you can visit any of our branches to update your details.',
    },
    {
      question: 'What are the charges for international transactions?',
      answer:
        'Charges for international transactions may vary based on the type of account and transaction. Please refer to our fee schedule on the website or contact customer service for detailed information.',
    },
    {
      question: 'How can I close my account?',
      answer:
        'To close your account, please visit your nearest branch and submit a written request. Our staff will assist you with the account closure process.',
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
