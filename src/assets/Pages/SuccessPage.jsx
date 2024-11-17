import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if redirected from registration success
  const isAuthorized = location.state?.fromRegistration;

  useEffect(() => {
    if (!isAuthorized) {
      navigate('/'); // Redirect to home immediately if unauthorized
      return;
    }

    // Set up a timeout for redirecting to the login page after 10 seconds
    const timer = setTimeout(() => {
      navigate('/login');
    }, 10000);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [isAuthorized, navigate]);

  // If not authorized, prevent rendering the component
  if (!isAuthorized) {
    return null;
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-white text-center p-4'>
      <img
        src='/src/assets/Images/only_ascentis.png'
        alt='ascentis'
        className='h-20 mb-4'
      />
      <img
        src='/src/assets/Images/check.png'
        alt='check'
        className='h-24 w-24 mb-4'
      />
      <h1 className='text-2xl md:text-3xl font-SF_PRO_Semibold text-green-600 mb-2'>
        Registration Successful!
      </h1>
      <p className='text-md md:text-lg font-SF_PRO_Light text-gray-700 mb-2'>
        Thank you for verifying your email. Your account has been created
        successfully.
      </p>
      <p className='text-gray-500 mt-2 font-SF_PRO_Light'>
        You will be redirected to the login page shortly.
      </p>
    </div>
  );
};

export default SuccessPage;
