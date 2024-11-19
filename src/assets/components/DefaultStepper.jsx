import React, { useEffect } from 'react';
import { Stepper, Step, Button } from '@material-tailwind/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Country, State, City } from 'country-state-city';

export function DefaultStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [otp, setOtp] = React.useState('');
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = React.useState(false);
  const [countries, setCountries] = React.useState([]);
  const [states, setStates] = React.useState([]);
  const [cities, setCities] = React.useState([]);
  const [selectedCountry, setSelectedCountry] = React.useState('');
  const [selectedState, setSelectedState] = React.useState('');
  const [formErrors, setFormErrors] = React.useState({});
  const [FormData, setFormData] = React.useState({
    full_name: '',
    dob: '',
    gender: '',
    age: '',
    phone: '',
    email: '',
    res_address: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    occupation: '',
    account_type: '',
    nominee_name: '',
    nominee_age: '',
    nominee_contact: '',
    nominee_relation: '',
    username: '',
    password: '',
    confirm_password: '',
  });

  const [resendDisabled, setResendDisabled] = React.useState(true);
  const [timer, setTimer] = React.useState(120); // 2 minutes = 120 seconds

  useEffect(() => {
    let interval;

    if (activeStep === 2 && timer > 0) {
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
  }, [activeStep, timer]); // Dependencies

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  useEffect(() => {
    const countries = Country.getAllCountries();
    setCountries(countries);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const statesOfCountry = State.getStatesOfCountry(selectedCountry);
      setStates(statesOfCountry);
      setCities([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      const citiesOfState = City.getCitiesOfState(
        selectedCountry,
        selectedState
      );
      setCities(citiesOfState);
    }
  }, [selectedState, selectedCountry]);

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

  const validateForm = () => {
    let errors = {};

    // Regex patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;

    // Check for empty fields and validate using regex
    if (!FormData.full_name) errors.full_name = 'Full Name is required';
    if (!FormData.dob) errors.dob = 'Date of Birth is required';
    if (!FormData.phone || !phoneRegex.test(FormData.phone))
      errors.phone = 'Valid Phone Number is required';
    if (!FormData.email || !emailRegex.test(FormData.email))
      errors.email = 'Valid Email is required';
    if (!FormData.res_address)
      errors.res_address = 'Residential Address is required';
    if (!FormData.city) errors.city = 'City is required';
    if (!FormData.state) errors.state = 'State is required';
    if (!FormData.postal_code) errors.postal_code = 'Postal Code is required';
    if (!FormData.country) errors.country = 'Country is required';
    if (!FormData.occupation) errors.occupation = 'Occupation is required';
    if (!FormData.account_type)
      errors.account_type = 'Account Type is required';
    if (!FormData.gender) errors.gender = 'Gender is required';
    if (!FormData.age) errors.age = 'Age is Required';
    else if (FormData.age < 18) errors.age = 'You are a minor';

    if (activeStep === 0) {
      if (FormData.dob && FormData.age) {
        const userBirthyear = new Date(FormData.dob).getFullYear();
        const currentYear = new Date().getFullYear();
        const calculatedAge = currentYear - userBirthyear;
        const formAge = parseInt(FormData.age);

        if (formAge !== calculatedAge) {
          errors.dob = `The provided Date of Birth does not match the provided age. Expected age based on Date of Birth: ${calculatedAge}`;
          errors.age = `The provided age does not match the Date of Birth. Expected age based on Date of Birth: ${calculatedAge}`;
        }
      }
      if (FormData.country !== 'IN') {
        alert(
          'Our banking services are currently available only in India. Please select India to proceed.'
        );
        errors.country = 'Service available only in India';
      }
    }

    if (activeStep === 1) {
      // Username validation
      if (!FormData.username) {
        errors.username = 'Username is required';
      } else if (!usernameRegex.test(FormData.username)) {
        errors.username =
          'Username must be 3-16 characters long, and can contain letters, numbers, and underscores only';
      }

      // Password validation
      if (!FormData.password) {
        errors.password = 'Password is required';
      } else if (!passwordRegex.test(FormData.password)) {
        errors.password =
          'Password must be at least 8 characters, include one uppercase letter, one lowercase letter, one number, and one special character (@#$%^&+=!)';
      }

      // Confirm password match
      if (!FormData.confirm_password) {
        errors.confirm_password = 'Please confirm your password';
      } else if (FormData.password !== FormData.confirm_password) {
        errors.confirm_password = 'Passwords do not match';
      }

      // Check if username and full_name are the same
      if (FormData.username === FormData.full_name) {
        errors.username = 'Username cannot be the same as your full name';
      }
    }

    setFormErrors(errors);
    console.log(errors);
    console.log(FormData);

    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  const LoadingOverlay = () => (
    <div style={overlayStyles}>
      <div className='spinner'></div>
    </div>
  );

  const getInputClasses = (field) => {
    return formErrors[field]
      ? 'bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5'
      : 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...FormData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: '', // Clear error when user starts typing
    });
  };

  const handleCountryChange = (event) => {
    const { value } = event.target;
    setFormData({ ...FormData, country: value, state: '', city: '' });
    setSelectedCountry(value);
  };

  const handleStateChange = (event) => {
    const { value } = event.target;
    setFormData({ ...FormData, state: value, city: '' });
    setSelectedState(value);
  };

  const handleCityChange = (event) => {
    const { value } = event.target;
    setFormData({ ...FormData, city: value });
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleNext = async () => {
    // Controls moving to the next step in a multistep form.
    if (activeStep === 0 && !validateForm()) {
      return; // Exit if form validation fails
    }

    if (activeStep === 0) {
      setLoading(true); // Show loading overlay

      const params = new URLSearchParams({
        email: FormData.email,
        phone: FormData.phone,
        form: 'register_email',
      });

      try {
        const response = await axios.post(
          'https://ghoul-causal-adder.ngrok-free.app/AscentisBank/check_email',
          params,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true,
          }
        );

        const { exists, message } = response.data;

        if (exists === false) {
          // Move to the next step if email does not exist
          setTimeout(() => {
            setActiveStep((cur) => cur + 1);
            setLoading(false); // Hide loading overlay
          }, 3000);
        } else {
          setLoading(false);
          formErrors.email = message;
          alert(message || 'An error occurred'); // Show error message
        }
      } catch (error) {
        setLoading(false); // Hide loading overlay
        if (error.response) {
          console.error('Error Response:', error.response.data);
          alert(error.response.data.message);
        } else {
          console.error('Error:', error);
          alert('An error occurred. Please try again.');
        }
      }
    }
  };

  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const handleGetOtp = async (event) => {
    event.preventDefault();

    if (activeStep === 1 && !validateForm() && !isChecked) {
      return;
    }

    setLoading(true);

    try {
      // Encode form data to URLSearchParams format
      const urlEncodedData = new URLSearchParams();
      for (const key in FormData) {
        urlEncodedData.append(key, FormData[key]);
      }

      // Check user ID
      const checkUserResponse = await axios.post(
        'https://ghoul-causal-adder.ngrok-free.app/AscentisBank/check_user_id',
        urlEncodedData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        }
      );

      const { exists, message } = checkUserResponse.data;

      if (exists === false) {
        // Fetch secondary data
        try {
          const secondaryResponse = await axios.get(
            'https://ghoul-causal-adder.ngrok-free.app/AscentisBank/otp',
            {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            }
          );
          const newExist = secondaryResponse.data.exists;
          const additionalMessage = secondaryResponse.data.message;
          if (newExist === true) {
            setActiveStep((cur) => cur + 1);
          } else {
            alert(
              additionalMessage ||
                'Required data not found in the secondary API.'
            );
          }
        } catch (error) {
          console.error('Error fetching data from secondary API:', error);
          alert('Error with secondary API. Please try again later.');
        }
      } else if (exists === true) {
        alert(message || 'Username already exists.');
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage =
        error.response?.data?.message || 'An error occurred. Please try again.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = () => {
    // Validate that OTP input is provided
    if (!otp) {
      alert('Please enter the OTP');
      return; // Stop if no OTP is entered
    }

    const urlencodedData = new URLSearchParams();
    urlencodedData.append('otp', otp);

    axios
      .post(
        'https://ghoul-causal-adder.ngrok-free.app/AscentisBank/validate_otp',
        urlencodedData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data);

        if (response.status === 201) {
          navigate('/successPage', { state: { fromRegistration: true } });
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error verifying OTP:', error);
        alert('Invalid OTP. Please try again.');
      });
  };

  const handleOtpReset = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(
        'https://ghoul-causal-adder.ngrok-free.app/AscentisBank/otp',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

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

  return (
    <div className='h-full w-full flex justify-center items-center'>
      <div className='w-full py-4 md:px-8 px-3 max-w-[1200px]'>
        <img
          src='/src/assets/Images/only_ascentis.png'
          alt=''
          className='h-20 w-44 max-sm:h-24 max-sm:w-52 mt-8 cursor-pointer'
          onClick={() => navigate('/')}
        />
        <h1 className='pl-2 text-gray-600 text-[24px] font-SF_PRO_Light'>
          Please fill out the form below to create your account.
        </h1>

        <h1 className='text-3xl pl-2 font-SF_PRO_Semibold my-8 text-center'>
          User Registration Form
        </h1>
        <div className='border border-neutral-300 bg-neutral-100 shadow-[5px_5px_16px_0_rgba(13,66,124,0.25)] rounded-[24px] p-6'>
          <Stepper
            activeStep={activeStep}
            isLastStep={(value) => setIsLastStep(value)}
            isFirstStep={(value) => setIsFirstStep(value)}
          >
            <Step onClick={() => setActiveStep(0)}>1</Step>
            <Step onClick={() => setActiveStep(1)}>2</Step>
            <Step onClick={() => setActiveStep(2)}>3</Step>
          </Stepper>
          {/* onClick={() => setActiveStep(0)} */}
          {/* onClick={() => setActiveStep(1)} */}
          {/* onClick={() => setActiveStep(2)} */}
          <form className='font-SF_PRO_Regular'>
            {activeStep === 0 && (
              <>
                {loading && <LoadingOverlay />}
                <h1 className='text-xl font-bold mt-16 mb-4'>
                  Personal Information
                </h1>
                <div className='grid gap-6 mb-6 md:grid-cols-2'>
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor='full_name'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      Full Name (As per legal documents)
                    </label>
                    <input
                      type='text'
                      id='full_name'
                      className={getInputClasses('full_name')}
                      placeholder='Ex. Raj Yadav'
                      required
                      value={FormData.full_name}
                      onChange={handleChange}
                      name='full_name'
                    />
                    {formErrors.full_name && (
                      <p className='text-red-500 text-sm'>
                        {formErrors.full_name}
                      </p>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label
                      htmlFor='dob'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      Date of Birth
                    </label>
                    <input
                      type='date'
                      id='dob'
                      name='dob'
                      className={getInputClasses('dob')}
                      required
                      value={FormData.dob}
                      onChange={handleChange}
                    />
                    {formErrors.dob && (
                      <p className='text-red-500 text-sm'>{formErrors.dob}</p>
                    )}
                  </div>

                  {/* Gender */}
                  <div>
                    <label
                      htmlFor='gender'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      Gender (Optional)
                    </label>
                    <select
                      id='gender'
                      name='gender'
                      className={getInputClasses('gender')}
                      value={FormData.gender}
                      onChange={handleChange}
                    >
                      <option value=''>Select Gender</option>
                      <option value='male'>Male</option>
                      <option value='female'>Female</option>
                      <option value='other'>Other</option>
                      <option value='prefer_not_to_say'>
                        Prefer not to say
                      </option>
                    </select>
                    {formErrors.gender && (
                      <p className='text-red-500 text-sm'>
                        {formErrors.gender}
                      </p>
                    )}
                  </div>

                  {/* Age */}
                  <div>
                    <label
                      htmlFor='age'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      Age
                    </label>
                    <input
                      type='number'
                      id='age'
                      name='age'
                      className={getInputClasses('age')}
                      placeholder='Age'
                      required
                      value={FormData.age}
                      onChange={handleChange}
                    />
                    {formErrors.age && (
                      <p className='text-red-500 text-sm'>{formErrors.age}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor='phone'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      Phone Number
                    </label>
                    <input
                      type='tel'
                      id='phone'
                      name='phone'
                      className={getInputClasses('phone')}
                      placeholder='9884567833'
                      pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                      required
                      value={FormData.phone}
                      onChange={handleChange}
                    />
                    {formErrors.phone && (
                      <p className='text-red-500 text-sm'>{formErrors.phone}</p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor='email'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      Email Address (For OTP verification)
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      className={getInputClasses('email')}
                      placeholder='john.doe@bank.com'
                      required
                      value={FormData.email}
                      onChange={handleChange}
                    />
                    {formErrors.email && (
                      <p className='text-red-500 text-sm'>{formErrors.email}</p>
                    )}
                  </div>
                </div>

                <h1 className='text-xl font-bold mb-4 mt-16'>
                  {' '}
                  Contact & Address Details
                </h1>
                <div className='grid gap-6 mb-6 md:grid-cols-2'>
                  {/* Residential Address */}
                  <div className='md:col-span-2'>
                    <label
                      htmlFor='res_address'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      Residential Address
                    </label>
                    <input
                      type='text'
                      id='res_address'
                      name='res_address'
                      className={getInputClasses('res_address')}
                      placeholder='123 Main St'
                      required
                      value={FormData.res_address}
                      onChange={handleChange}
                    />
                    {formErrors.res_address && (
                      <p className='text-red-500 text-sm'>
                        {formErrors.res_address}
                      </p>
                    )}
                  </div>

                  {/* Country */}
                  <div>
                    <label
                      htmlFor='country'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      Country
                    </label>
                    <select
                      id='country'
                      name='country'
                      className={getInputClasses('country')}
                      required
                      value={FormData.country}
                      onChange={handleCountryChange}
                    >
                      <option value=''>Select Country</option>
                      {countries.map((country) => (
                        <option key={country.isoCode} value={country.isoCode}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.country && (
                      <p className='text-red-500 text-sm'>
                        {formErrors.country}
                      </p>
                    )}
                  </div>

                  {/* State/Province */}
                  <div>
                    <label
                      htmlFor='state'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      State/Province
                    </label>
                    <select
                      id='state'
                      name='state'
                      className={getInputClasses('state')}
                      required
                      value={FormData.state}
                      onChange={handleStateChange}
                      disabled={!selectedCountry}
                    >
                      <option value=''>Select State</option>
                      {states.map((state) => (
                        <option key={state.isoCode} value={state.isoCode}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.state && (
                      <p className='text-red-500 text-sm'>{formErrors.state}</p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label
                      htmlFor='city'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      City
                    </label>
                    <select
                      id='city'
                      name='city'
                      className={getInputClasses('city')}
                      required
                      value={FormData.city}
                      onChange={handleCityChange}
                      disabled={!selectedState}
                    >
                      <option value=''>Select City</option>{' '}
                      {cities.map((city) => (
                        <option key={city.name} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.city && (
                      <p className='text-red-500 text-sm'>{formErrors.city}</p>
                    )}
                  </div>

                  {/* Postal/Zip Code */}
                  <div>
                    <label
                      htmlFor='postal_code'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      Postal/Zip Code
                    </label>
                    <input
                      type='text'
                      id='postal_code'
                      name='postal_code'
                      className={getInputClasses('postal_code')}
                      placeholder='Postal Code'
                      required
                      value={FormData.postal_code}
                      onChange={handleChange}
                    />
                    {formErrors.postal_code && (
                      <p className='text-red-500 text-sm'>
                        {formErrors.postal_code}
                      </p>
                    )}
                  </div>
                </div>
                <h1 className='text-xl font-bold mb-4 mt-16'>
                  {' '}
                  Employment Information
                </h1>
                <div>
                  <label
                    htmlFor='occupation'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Occupation/Employment Status
                  </label>
                  <select
                    id='occupation'
                    name='occupation'
                    className={getInputClasses('occupation')}
                    value={FormData.occupation}
                    onChange={handleChange}
                  >
                    <option value=''>Select Occupation</option>
                    <option value='employed'>Employed</option>
                    <option value='selfEmployed'>Self-employed</option>
                    <option value='unemployed'>Unemployed</option>
                    <option value='student'>Student</option>
                  </select>
                  {formErrors.occupation && (
                    <p className='text-red-500 text-sm'>
                      {formErrors.occupation}
                    </p>
                  )}
                </div>

                <h1 className='text-xl font-bold mb-4 mt-16'>
                  Account Preferences
                </h1>

                <div>
                  <label
                    htmlFor='account_type'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Account Type
                  </label>
                  <select
                    id='account_type'
                    name='account_type'
                    className={getInputClasses('account_type')}
                    value={FormData.account_type}
                    onChange={handleChange}
                  >
                    <option value=''>Select Account Type</option>
                    <option value='savings'>Savings</option>
                    <option value='current'>Current</option>
                  </select>
                  {formErrors.account_type && (
                    <p className='text-red-500 text-sm'>
                      {formErrors.account_type}
                    </p>
                  )}
                </div>

                <h1 className='text-xl font-bold mb-4 mt-16'>
                  Additional Information (Optional)
                </h1>
                <div className='grid gap-6 mb-6 md:grid-cols-2'>
                  <div>
                    <label
                      htmlFor='nominee_name'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      Nominee Name
                    </label>
                    <input
                      type='text'
                      id='nominee_name'
                      name='nominee_name'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                      placeholder='Name'
                      required
                      value={FormData.nominee_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='nominee_age'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      Nominee Age
                    </label>
                    <input
                      type='text'
                      id='nominee_age'
                      name='nominee_age'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                      placeholder='Age'
                      required
                      value={FormData.nominee_age}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='nominee_contact'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      Nominee Contact Details
                    </label>
                    <input
                      type='text'
                      id='nominee_contact'
                      name='nominee_contact'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                      placeholder='Contact'
                      required
                      value={FormData.nominee_contact}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='nominee_nominee_relation'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      Nominee Relation
                    </label>
                    <input
                      type='text'
                      id='nominee_relation'
                      name='nominee_relation'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                      placeholder='Ex.Son'
                      required
                      value={FormData.nominee_relation}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </>
            )}

            {activeStep === 1 && (
              <>
                {loading && <LoadingOverlay />}
                <h1 className='text-xl font-bold mt-16 mb-4'>
                  Create Username & Password
                </h1>
                <div className='grid gap-6 mb-6'>
                  {/* Username */}
                  <div>
                    <label
                      htmlFor='username'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      Username
                    </label>
                    <input
                      type='text'
                      id='username'
                      name='username'
                      className={getInputClasses('username')}
                      placeholder='Create a username'
                      value={FormData.username}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.username && (
                      <p className='text-red-500 text-sm'>
                        {formErrors.username}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className='relative'>
                    <label
                      htmlFor='password'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      Password
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id='password'
                      name='password'
                      className={getInputClasses('password')}
                      placeholder='Create a password'
                      value={FormData.password}
                      onChange={handleChange}
                      required
                      onCut={(e) => e.preventDefault()}
                      onCopy={(e) => e.preventDefault()}
                      onPaste={(e) => e.preventDefault()}
                      onSelect={(e) => e.preventDefault()} // Prevent selecting
                      onFocus={() => setShowPassword(true)} // Show password when focused
                      onBlur={() => setShowPassword(false)} // Hide password when blurred
                    />
                    <button
                      type='button'
                      className='absolute right-2 top-[40px] text-gray-600 text-[12px]'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                    {formErrors.password && (
                      <p className='text-red-500 text-sm'>
                        {formErrors.password}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label
                      htmlFor='confirm_password'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      Confirm Password
                    </label>
                    <input
                      type='password'
                      id='confirm_password'
                      name='confirm_password'
                      className={getInputClasses('confirm_password')}
                      placeholder='Confirm your password'
                      value={FormData.confirm_password}
                      onChange={handleChange}
                      required
                      onPaste={(e) => e.preventDefault()}
                    />
                    {formErrors.confirm_password && (
                      <p className='text-red-500 text-sm'>
                        {formErrors.confirm_password}
                      </p>
                    )}
                  </div>

                  <div className='mt-16 mb-4'>
                    <p>
                      <strong className='text-xl font-bold '>
                        Terms and Conditions
                      </strong>
                      <br />
                      <br />
                      Welcome to Ascentis! These terms and conditions outline
                      the rules and regulations for the use of Ascentis Website,
                      located at www.ascentis.com. By accessing this website we
                      assume you accept these terms and conditions. Do not
                      continue to use Ascentis Web if you do not agree to all of
                      the terms and conditions stated on this page.
                      <br />
                      <br />
                      <strong>1. Privacy</strong>
                      <br />
                      We value your privacy. Please review our Privacy Policy to
                      understand how we collect and use your personal data.
                      <br />
                      <br />
                      <strong>2. User Accounts</strong>
                      <br />
                      You are responsible for maintaining the confidentiality of
                      your username and password. You agree to provide accurate,
                      complete, and current information. We reserve the right to
                      suspend or terminate your account if any information
                      provided is inaccurate or misleading.
                      <br />
                      <br />
                      <strong>3. Intellectual Property</strong>
                      <br />
                      All content provided on this site is the intellectual
                      property of [Your Company Name] unless otherwise stated.
                      You may not copy, distribute, or use any material without
                      prior consent.
                      <br />
                      <br />
                      <strong>4. Prohibited Use</strong>
                      <br />
                      You agree not to: Use the website for any unlawful
                      purpose. Distribute any harmful software, viruses, or code
                      that could harm the website. Engage in any activity that
                      interferes with the proper functioning of the website.
                      <br />
                      <br />
                      <strong>5. Limitation of Liability</strong>
                      <br />
                      We will not be liable for any damages arising from your
                      use or inability to use the site or its services. Your use
                      of the website is at your own risk.
                      <br />
                      <br />
                      <strong>6. Changes to Terms</strong>
                      <br />
                      We may update these terms from time to time. Continued use
                      of the website after changes have been made constitutes
                      your acceptance of the new terms.
                      <br />
                      <br />
                      <strong>7. Contact Us</strong>
                      <br />
                      If you have any questions about our Terms and Conditions,
                      please contact us at [email/contact info].
                    </p>
                  </div>

                  <div>
                    <input
                      type='checkbox'
                      value='agree'
                      id='termsCheckbox'
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor='termsCheckbox' className='ml-4'>
                      Agree to All Terms and Conditions
                    </label>
                  </div>
                </div>
              </>
            )}

            {activeStep === 2 && (
              <>
                {loading && <LoadingOverlay />}
                <h1 className='text-xl font-bold mt-16 mb-4'>
                  OTP Sent to Your Email Account
                </h1>

                <p className='text-sm mb-4'>
                  Please enter the OTP sent to your Email to verify your
                  Ascentis account.
                </p>
                <div className='grid gap-6 mb-6'>
                  <div>
                    <label htmlFor='otp'></label>
                    <input
                      type='number'
                      id='otp'
                      name='otp'
                      value={otp} // You will store OTP in a separate state
                      onChange={(e) => setOtp(e.target.value)} // Handle OTP change separately
                      placeholder='Enter OTP'
                      required
                      className={getInputClasses('otp')}
                    />
                  </div>
                </div>
                <div className='flex items-center'>
                  <p className='font-SF_PRO_Light text-[18px]'>
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
              </>
            )}

            <div
              className={`flex mt-20 ${
                [0, 2].includes(activeStep) ? 'justify-end' : 'justify-between'
              }`}
            >
              {activeStep === 0 && (
                <Button
                  onClick={handleNext}
                  disabled={isLastStep}
                  className='bg-[#0D427C] text-white rounded-[180px] px-6 py-2.5 shadow-sm hover:bg-[#0a335f]'
                >
                  Next
                </Button>
              )}

              {activeStep === 1 && (
                <>
                  <Button
                    onClick={handlePrev}
                    disabled={isFirstStep}
                    className='rounded-[180px] bg-gray-100 px-8 py-2.5  text-black shadow-sm hover:bg-gray-200'
                  >
                    Prev
                  </Button>

                  <Button
                    onClick={handleGetOtp}
                    disabled={isLastStep}
                    className='bg-[#0D427C] text-white rounded-[180px] px-6 py-2.5 shadow-sm hover:bg-[#0a335f]'
                  >
                    Get OTP
                  </Button>
                </>
              )}
              {activeStep === 2 && (
                <button
                  type='button'
                  onClick={handleOtpSubmit}
                  className='bg-[#0D427C] text-white rounded-[180px] px-6 py-2.5 shadow-sm hover:bg-[#0a335f]'
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DefaultStepper;
