import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '/src/config.js';

const ForgotPassPageOne = () => {
  const navigate = useNavigate();
  const [activestep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [userCredentialsErrors, setUserCredentialsErrors] = useState({});
  const [resendDisabled, setResendDisabled] = React.useState(true);
  const [timer, setTimer] = React.useState(120);

  useEffect(() => {
    let interval;

    if (activestep === 1 && timer > 0) {
      // Start timer only on OTP stage
      interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : prevTimer));
      }, 1000);
    }

    // When timer hits 0, enable Resend button
    if (timer === 0) {
      setResendDisabled(false);
    }

    // Cleanup timer
    return () => clearInterval(interval);
  }, [activestep, timer]); // Dependencies

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '1.5em',
    zIndex: 1000,
  };

  const LoadingOverlay = () => (
    <div style={overlayStyles}>
      <div className='spinner'></div>
    </div>
  );
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials({
      ...userCredentials,
      [name]: value,
    });
    setUserCredentialsErrors({
      ...userCredentialsErrors,
      [name]: '',
    });
  };

  const validate = () => {
    let errors = {};

    // Regex patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

    if (activestep === 0) {
      if (!userCredentials.email) errors.email = 'Email is required';
      else if (!emailRegex.test(userCredentials.email))
        errors.email = 'Valid Email is required';
    }

    if (activestep === 1) {
      if (!userCredentials.otp) errors.otp = 'OTP is required';
    }

    if (activestep === 2) {
      if (!userCredentials.newPassword)
        errors.newPassword = 'Password Cannot be Empty';
      if (!userCredentials.confirmNewPassword)
        errors.confirmNewPassword = 'Password Cannot be Empty';
      else if (!passwordRegex.test(userCredentials.newPassword)) {
        errors.newPassword =
          'Password must be at least 8 characters, include one uppercase letter, one lowercase letter, one number, and one special character (@#$%^&+=!)';
      } else if (
        userCredentials.confirmNewPassword !== userCredentials.newPassword
      ) {
        errors.confirmNewPassword = 'Passwords do not match';
      }
    }

    setUserCredentialsErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEmailSubmit = async () => {
    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      // First API Call
      const urlEncodedData = new URLSearchParams();
      urlEncodedData.append('email', userCredentials.email);
      urlEncodedData.append('form', 'forgot_email');

      const response = await axios.post(API_ENDPOINTS.FORGOT, urlEncodedData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        withCredentials: true,
      });

      if (response.data.exists === true) {
        try {
          // Second API Call
          const secondaryResponse = await axios.get(API_ENDPOINTS.OTP, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          });

          if (secondaryResponse.data.exists === true) {
            setActiveStep((cur) => cur + 1);
          } else {
            alert(secondaryResponse.data.message);
          }
        } catch (secondaryError) {
          console.error(
            'Error fetching data from secondary API:',
            secondaryError
          );
          alert('Error with secondary API. Please try again later.');
        }
      } else {
        // Set error for unregistered email
        // setUserCredentialsErrors((prevErrors) => ({
        //   ...prevErrors,
        //   email: 'Please Enter a Registered Email.',
        // }));
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error with primary API:', error);
      alert('Error sending the data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    console.log(activestep);

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const urlEncodedData = new URLSearchParams();
      urlEncodedData.append('otp', userCredentials.otp);

      const response = await axios.post(
        API_ENDPOINTS.VALIDATE,
        urlEncodedData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        }
      );

      if (response.data.check === true) {
        setActiveStep((cur) => cur + 1); // Move to the next step
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error during OTP submission:', error);
      alert('Error submitting the OTP. Please try again later.');
    } finally {
      setLoading(false); // Ensure loading is turned off in all scenarios
    }
  };

  const handleOtpReset = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(API_ENDPOINTS.OTP, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      const { exists: emailSent, message: additionalMessage } = response.data;

      if (emailSent) {
        alert(
          'OTP has been sent to your registered email. This OTP is only valid for 2 minutes.'
        );
        setTimer(120); // Reset timer to 2 minutes
        setResendDisabled(true); // Disable "Resend" again
      } else {
        alert(
          additionalMessage || 'Required data not found in the secondary API.'
        );
      }
    } catch (error) {
      console.error('Error fetching data from secondary API:', error);
      alert('The server has an issue. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async () => {
    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const urlEncodedData = new URLSearchParams();
      urlEncodedData.append('newPassword', userCredentials.newPassword);

      const response = await axios.post(API_ENDPOINTS.CHANGE, urlEncodedData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        withCredentials: true,
      });

      if (response.status === 201) {
        navigate('/passwordsuccess', { state: { fromForgotPass: true } });
      } else {
        alert('Failed to update password. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting password:', error);
      alert('Error sending the data. Please try again later.');
    } finally {
      setLoading(false); // Ensure loading is turned off in all scenarios
    }
  };

  return (
    <div className='h-screen w-full'>
      <div className='h-screen w-full flex justify-center items-center max-sm:items-start max-sm:justify-start max-sm:mt-20'>
        <div className='rounded-lg flex flex-col md:flex-row justify-center items-center h-[520px] w-[1100px]'>
          <div className='flex-1 h-full md:pt-20 w-full md:w-56 sm:px-8'>
            <img
              src='/src/assets/Images/only_ascentis.png'
              alt='logo img'
              className='h-20 w-48 pl-3 max-sm:h-24 max-sm:w-56 cursor-pointer'
              onClick={() => navigate('/')}
            />
            <h2 className='text-2xl font-SF_PRO_Semibold mb-4 ml-4 mt-8 md:hidden'>
              Forgot your password?
            </h2>
            <p className='text-black font-SF_PRO_Light text-[20px] md:text-[22px] md:font-SF_PRO_Light px-4'>
              Let’s reset it in three simple steps:
            </p>
            <ul className='mt-6 space-y-4 text-gray-700 px-4'>
              <li className='flex items-center space-x-2'>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className='text-blue-600'
                />
                <p className='font-SF_PRO_Light text-[18px]'>
                  Enter your registered email to receive a One-Time Password.
                </p>
              </li>
              <li className='flex items-center space-x-2'>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className='text-blue-600'
                />
                <p className='font-SF_PRO_Light text-[18px]'>
                  Enter the OTP sent to your email.
                </p>
              </li>
              <li className='flex items-center space-x-2'>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className='text-blue-600'
                />
                <p className='font-SF_PRO_Light text-[18px]'>
                  Set your new password and regain access to your account.
                </p>
              </li>
            </ul>
          </div>
          <div className='py-[40px] lg:px-[60px] flex-1 h-full w-full sm:px-4 flex justify-center items-center'>
            {activestep === 0 && (
              <>
                {loading && <LoadingOverlay />}
                <section className='h-auto w-full bg-white flex flex-col gap-4'>
                  <div className=' flex justify-start items-center'>
                    <h1 className='text-[28px] font-SF_Pro_Regular hidden md:block pl-6'>
                      Forgot Password?
                    </h1>
                  </div>
                  <div className=' flex justify-center items-center'>
                    <img
                      src='/src/assets/Images/user_avatar.png'
                      alt='user_icon'
                      className='h-[50px] w-[50px]'
                    />
                  </div>

                  <div className=' flex flex-col justify-center items-center'>
                    <input
                      type='email'
                      name='email'
                      value={userCredentials.email}
                      onChange={handleChange}
                      placeholder='Enter Email'
                      className={`h-[65px] w-[90%] px-[24px] py-[10px] rounded-[8.5px] border ${
                        userCredentialsErrors.email
                          ? 'border-red-500'
                          : 'border-[#E5E5E5]'
                      } bg-[#F2F2F2] text-[#989898]`}
                    />
                    {userCredentialsErrors.email && (
                      <p className='text-red-500 text-sm'>
                        {userCredentialsErrors.email}
                      </p>
                    )}
                  </div>

                  <div className=' flex justify-center items-center'>
                    <button
                      className='h-[50px] w-[90%] bg-[#0D427C] text-white rounded-[180px]'
                      onClick={handleEmailSubmit}
                    >
                      Send OTP
                    </button>
                  </div>
                </section>
              </>
            )}

            {activestep === 1 && (
              <>
                {loading && <LoadingOverlay />}
                <section className='h-auto w-full bg-white flex flex-col gap-4'>
                  <div className=' flex justify-start items-center'>
                    <h1 className='text-[28px] font-SF_Pro_Regular hidden md:block pl-6'>
                      Verify Code
                    </h1>
                  </div>

                  <div className=' flex flex-col justify-center items-center'>
                    <input
                      type='text'
                      name='otp'
                      value={userCredentials.otp}
                      onChange={handleChange}
                      placeholder='Enter Code'
                      className={`h-[65px] w-[90%] px-[24px] py-[10px] rounded-[8.5px] border ${
                        userCredentialsErrors.otp
                          ? 'border-red-500'
                          : 'border-[#E5E5E5]'
                      } bg-[#F2F2F2] text-[#989898]`}
                    />
                    {userCredentialsErrors.otp && (
                      <p className='text-red-500 text-sm'>
                        {userCredentialsErrors.otp}
                      </p>
                    )}
                  </div>

                  <div className='flex items-center'>
                    <p className='font-SF_PRO_Light text-[18px] pl-8'>
                      Didn&#39;t Receive Code{' '}
                      <a
                        className={`cursor-pointer text-[#bb524e] ${
                          resendDisabled ? 'pointer-events-none opacity-50' : ''
                        }`}
                        onClick={resendDisabled ? null : handleOtpReset}
                      >
                        Resend
                      </a>
                    </p>
                    {resendDisabled && (
                      <p className='font-SF_PRO_Light text-[18px] text-[#bb524e] ml-4'>
                        {formatTime(timer)}
                      </p>
                    )}
                  </div>

                  <div className=' flex justify-center items-center'>
                    <button
                      className='h-[50px] w-[90%] bg-[#0D427C] text-white rounded-[180px]'
                      onClick={handleOtpSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </section>
              </>
            )}

            {activestep === 2 && (
              <>
                {loading && <LoadingOverlay />}
                <section className='h-auto w-full bg-white flex flex-col gap-4'>
                  <div className=' flex justify-start items-center'>
                    <h1 className='text-[28px] font-SF_Pro_Regular hidden md:block pl-6'>
                      Set a new Password
                    </h1>
                  </div>

                  <div className='relative flex flex-col justify-center items-center w-full'>
                    <div className='relative w-full flex items-center justify-center'>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name='newPassword'
                        placeholder='New Password'
                        value={userCredentials.newPassword}
                        onChange={handleChange}
                        required
                        onCut={(e) => e.preventDefault()}
                        onCopy={(e) => e.preventDefault()}
                        onPaste={(e) => e.preventDefault()}
                        onSelect={(e) => e.preventDefault()}
                        onFocus={() => setShowPassword(true)}
                        onBlur={() => setShowPassword(false)}
                        className={`h-[65px] w-[90%] px-[24px] py-[10px] rounded-[8.5px] border ${
                          userCredentialsErrors.newPassword
                            ? 'border-red-500'
                            : 'border-[#E5E5E5]'
                        } bg-[#F2F2F2] text-[#989898]`}
                        style={{ zIndex: 0 }}
                      />
                      <button
                        type='button'
                        className='absolute right-12 text-gray-600 text-[12px]'
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ zIndex: 1 }}
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    {userCredentialsErrors.newPassword && (
                      <p className='text-red-500 text-sm mt-2 pl-6 pr-6'>
                        {userCredentialsErrors.newPassword}
                      </p>
                    )}
                  </div>

                  <div className='flex flex-col justify-center items-center'>
                    <input
                      type='password'
                      name='confirmNewPassword'
                      placeholder='Confirm New Password'
                      value={userCredentials.confirmNewPassword}
                      onChange={handleChange}
                      onPaste={(e) => e.preventDefault()}
                      className={`h-[65px] w-[90%] px-[24px] py-[10px] rounded-[8.5px] border ${
                        userCredentialsErrors.confirmNewPassword
                          ? 'border-red-500'
                          : 'border-[#E5E5E5]'
                      } bg-[#F2F2F2] text-[#989898]`}
                    />

                    {userCredentialsErrors.confirmNewPassword && (
                      <p className='text-red-500 text-sm'>
                        {userCredentialsErrors.confirmNewPassword}
                      </p>
                    )}
                  </div>

                  <div className=' flex justify-center items-center'>
                    <button
                      className='h-[50px] w-[90%] bg-[#0D427C] text-white rounded-[180px]'
                      onClick={handlePasswordSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
      <section className='flex justify-center items-center'>
        <h2 className='text-center text-[12px]  px-4 md:px-40 my-4 sm:px-6 font-SF_PRO_Regular'>
          Need help? Contact our support team at [customer support number]. By
          proceeding, you agree to our Terms of Service and Privacy Policy.
        </h2>
      </section>
    </div>
  );
};

export default ForgotPassPageOne;
