import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import onlyAscentis from '../Images/only_ascentis.png';
import check from '../Images/check.png';

const PasswordSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if redirected from registration success
  const isAuthorized = location.state?.fromForgotPass;

  useEffect(() => {
    if (!isAuthorized) {
      navigate('/'); // Redirect to home immediately if unauthorized
      return;
    }
  }, [isAuthorized, navigate]);

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-white text-center p-4'>
      <img src={onlyAscentis} alt='ascentis' className='h-20 mb-4' />
      <img src={check} alt='check' className='h-24 w-24 mb-4' />

      <p className='text-md md:text-lg font-SF_PRO_Light text-gray-700 mb-2 w-[500px] my-12'>
        Your password has been set successfully! You can now log in with your
        new credentials and continue enjoying secure banking with Ascentis.
      </p>
      <button
        className='h-[50px] w-fit bg-[#0D427C] text-white rounded-[180px] px-20 py-2 mt-14 font-SF_PRO_Light'
        onClick={() => navigate('/login')}
      >
        Back to Login
      </button>
    </div>
  );
};

export default PasswordSuccessPage;
