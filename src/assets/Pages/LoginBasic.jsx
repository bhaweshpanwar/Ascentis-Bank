import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { RECAPTCHA_KEY } from '/src/config.js';
import { API_ENDPOINTS } from '/src/config.js';

const LoginBasic = () => {
  const navigate = useNavigate();

  const [capVal, setCapVal] = useState(null);
  const [userCredentials, setUserCredentails] = useState({
    username: '',
    password: '',
  });

  const [userCredentialsErrors, setUserCredentailsErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentails({
      ...userCredentials,
      [name]: value,
    });
    setUserCredentailsErrors({
      ...userCredentialsErrors,
      [name]: '',
    });
  };

  const validateLogin = () => {
    let errors = {};
    if (!userCredentials.username) errors.username = 'Username is required';
    if (!userCredentials.password) errors.password = 'Password is required';

    setUserCredentailsErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /*const handleSubmit = async () => {
    if (!validateLogin()) {
      return;
    }

    setIsLoading(true);
    const urlEncodedData = new URLSearchParams();
    urlEncodedData.append('username', userCredentials.username);
    urlEncodedData.append('password', userCredentials.password);

    try {
      const response = await axios.post(
        'https://ghoul-causal-adder.ngrok-free.app/AscentisBank/login',
        urlEncodedData,
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          withCredentials: true, // Ensures the cookie is set by the browser
        }
      );

      setIsLoading(false);

      if (response.status === 201) {
        // Retrieve the session ID from response data
        const sessionId = response.data.session; // Adjust if 'session' key differs
        console.log('JSESSIONID:', sessionId);

        if (!sessionId) {
          throw new Error('Session ID not found in response');
        }

        // Encode the session ID and other parameters
        const encodedSessionId = encodeURIComponent(sessionId);
        const additionalParams = `user=${encodeURIComponent(
          userCredentials.username
        )}&extra=${encodeURIComponent('then%20or%20access')}`;
        const dashboardUrl = `/dashboard/${encodedSessionId}?${additionalParams}`;

        console.log('Navigating to URL:', dashboardUrl);

        // Fetch additional session details if needed
        const sessionResponse = await axios.get(
          'https://ghoul-causal-adder.ngrok-free.app/AscentisBank/home',
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true, // Sends the session cookie
          }
        );

        const parsedData =
          typeof sessionResponse.data === 'string'
            ? JSON.parse(sessionResponse.data)
            : sessionResponse.data;

        console.log('Parsed SessionResponse data:', parsedData);

        // Navigate to the encoded URL
        navigate(dashboardUrl, {
          state: { sessionAccountDetails: parsedData },
        });
      }
    } catch (error) {
      setIsLoading(false);
      alert('An error occurred. Please try again.');
      console.error('Error during login:', error);
    }
  };*/

  const handleSubmit = async () => {
    if (!validateLogin()) {
      return;
    }

    setIsLoading(true);
    const urlEncodedData = new URLSearchParams();
    urlEncodedData.append('username', userCredentials.username);
    urlEncodedData.append('password', userCredentials.password);

    try {
      const response = await axios.post(API_ENDPOINTS.LOGIN, urlEncodedData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true,
      });

      setIsLoading(false);

      let errors = {};
      if (response.data.data === 0) {
        errors.username = 'Username does not exist.';
      } else if (response.data.data === 1) {
        errors.password = 'Wrong Password';
      }
      if (Object.keys(errors).length > 0) {
        setUserCredentailsErrors(errors);
      } else if (response.status === 201) {
        // Fetch additional session details (if needed)
        const sessionResponse = await axios.get(API_ENDPOINTS.HOME, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        const parsedData =
          typeof sessionResponse.data === 'string'
            ? JSON.parse(sessionResponse.data)
            : sessionResponse.data;

        console.log('Parsed SessionResponse data:', parsedData);

        navigate(`/dashboard`, {
          state: { sessionAccountDetails: parsedData },
          replace: false,
        });
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      alert('An error occurred. Please try again.');
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='h-screen w-full '>
      <div className='h-screen w-full flex justify-center items-center max-sm:items-start max-sm:justify-start max-sm:mt-20 mb-16'>
        <div className='rounded-lg flex flex-col md:flex-row justify-center items-center h-[520px] w-[1100px]'>
          {/* Left section */}
          <div className='flex-1 h-full pt-14 w-full md:w-56 sm:px-8'>
            <img
              src='/src/assets/Images/only_ascentis.png'
              alt='logo img'
              className='h-20 w-48 pl-3 max-sm:h-24 max-sm:w-56 cursor-pointer'
              onClick={() => navigate('/')}
            />
            <p className='text-black font-SF_PRO_Light text-[22px] md:text-[22px] md:font-SF_PRO_Light px-4'>
              Log in or sign up to experience secure, seamless, and happy
              banking with Ascentis.
            </p>
            <p className='text-black font-SF_PRO_Light text-[18px] pl-4 pt-24 max-sm:pt-12'>
              Do not have an account?{' '}
              <a
                className='text-[#007AFF] font-SF_PRO_Light text-[18px] cursor-pointer'
                onClick={() => navigate('/register')}
              >
                Create a New Account
              </a>
            </p>
          </div>

          {/* Right section */}
          <div className='py-[40px] lg:px-[60px] flex-1 h-full w-full sm:px-4'>
            <section className='h-full w-full bg-white flex flex-col gap-4'>
              <div className='flex-1 flex justify-center items-center'>
                <img
                  src='/src/assets/Images/user_avatar.png'
                  alt='user_icon'
                  className='h-[50px] w-[50px]'
                />
              </div>

              {/* Username Input */}
              <div className='flex-1 flex flex-col justify-center items-center'>
                <input
                  type='text'
                  id='username'
                  name='username'
                  value={userCredentials.username}
                  onChange={handleChange}
                  placeholder='Enter Username'
                  className={`h-[65px] w-[90%] px-[24px] py-[10px] rounded-[8.5px] border ${
                    userCredentialsErrors.username
                      ? 'border-red-500'
                      : 'border-[#E5E5E5]'
                  } bg-[#F2F2F2] text-[#989898]`}
                />
                {userCredentialsErrors.username && (
                  <p className='text-red-500 text-sm'>
                    {userCredentialsErrors.username}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className='flex-1 flex flex-col justify-center items-center'>
                <input
                  type='password'
                  id='password'
                  name='password'
                  value={userCredentials.password}
                  onChange={handleChange}
                  placeholder='Enter Password'
                  className={`h-[65px] w-[90%] px-[24px] py-[10px] rounded-[8.5px] border ${
                    userCredentialsErrors.password
                      ? 'border-red-500'
                      : 'border-[#E5E5E5]'
                  } bg-[#F2F2F2] text-[#989898]`}
                />
                {userCredentialsErrors.password && (
                  <p className='text-red-500 text-sm'>
                    {userCredentialsErrors.password}
                  </p>
                )}
              </div>

              <div className='h-8 flex justify-end items-start pr-6'>
                <a
                  className='text-[#007AFF] text-[14px] font-SF_PRO_Light md:text-[18px] cursor-pointer'
                  onClick={() => navigate('/forgotPassword')}
                >
                  Forgot Password?
                </a>
              </div>

              <div className='flex-1 flex justify-center items-center'>
                <ReCAPTCHA
                  sitekey={RECAPTCHA_KEY}
                  onChange={(val) => setCapVal(val)}
                />
              </div>
              {/* Submit Button */}
              <div className='flex-1 flex justify-center items-center'>
                <button
                  className='h-[50px] w-[90%] bg-[#0D427C] text-white rounded-[180px] flex justify-center items-center'
                  onClick={handleSubmit}
                  disabled={!capVal}
                >
                  {isLoading ? <div className='spinnerLogin'></div> : 'Login'}
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
      <section className='flex justify-start items-start'>
        <h2 className='text-center text-[12px] text-gray-700 px-4 md:px-40 my-4 sm:px-6 font-SF_PRO_Regular'>
          By logging in, you agree to Ascentis Bank Terms of Service and Privacy
          Policy. We are committed to protecting your personal information and
          ensuring a secure banking experience. Unauthorized access or use is
          strictly prohibited and may lead to legal action.
        </h2>
      </section>
    </div>
  );
};

export default LoginBasic;
