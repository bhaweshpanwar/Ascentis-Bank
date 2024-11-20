import { useState, useEffect } from 'react';
import axios from 'axios';
// import { useLocation } from 'react-router-dom';
import UserInformationDisplay from '../components/UserInformationDisplay';
const SessionAccountDetails = {
  accountOwnerName: 'Bhawesh Panwar',
  accountBalance: 45000.0,
  recentTransactions: [
    {
      name: 'Tanmay Sharma',
      type: 'Outgoing',
      status: 'In Progress',
      date: new Date('2024-11-18T14:00:00'),
      amount: 10000.0,
    },
    {
      name: 'Tanmay Sharma',
      type: 'Outgoing',
      status: 'In Progress',
      date: new Date('2024-11-18T14:00:00'),
      amount: 10000.0,
    },
    {
      name: 'Tanmay Sharma',
      type: 'Outgoing',
      status: 'In Progress',
      date: new Date('2024-11-18T14:00:00'),
      amount: 10000.0,
    },
    {
      name: 'Tanmay Sharma',
      type: 'Outgoing',
      status: 'In Progress',
      date: new Date('2024-11-18T14:00:00'),
      amount: 10000.0,
    },
    {
      name: 'Krishna Yadav',
      type: 'Incoming',
      status: 'Completed',
      date: new Date('2024-11-17T10:30:00'),
      amount: 1000.0,
    },
    {
      name: 'Raj Yadav',
      type: 'Outgoing',
      status: 'Pending',
      date: new Date('2024-11-16T09:00:00'),
      amount: 90.0,
    },
    {
      name: 'MP Portal',
      type: 'Outgoing',
      status: 'Done',
      date: new Date('2024-11-15T18:45:00'),
      amount: 90.0,
    },
    {
      name: 'Akash Singh',
      type: 'Outgoing',
      status: 'Completed',
      date: new Date('2024-11-20T13:15:00'),
      amount: 1000.0,
    },
  ],
};
const SessionAutoPayDetails = SessionAccountDetails;
const SessionTransactionDetails = {
  accountOwnerName: 'Bhawesh Panwar',
  accountBalance: 45000.0,
  recentTransactions: [
    {
      name: 'Tanmay Sharma',
      type: 'Outgoing',
      status: 'In Progress',
      date: new Date('2024-11-18T14:00:00'),
      amount: 10000.0,
    },
    {
      name: 'Tanmay Sharma',
      type: 'Outgoing',
      status: 'In Progress',
      date: new Date('2024-11-18T14:00:00'),
      amount: 10000.0,
    },
    {
      name: 'Tanmay Sharma',
      type: 'Outgoing',
      status: 'In Progress',
      date: new Date('2024-11-18T14:00:00'),
      amount: 10000.0,
    },
    {
      name: 'Tanmay Sharma',
      type: 'Outgoing',
      status: 'In Progress',
      date: new Date('2024-11-18T14:00:00'),
      amount: 10000.0,
    },
    {
      name: 'Krishna Yadav',
      type: 'Incoming',
      status: 'Completed',
      date: new Date('2024-11-17T10:30:00'),
      amount: 1000.0,
    },
    {
      name: 'Raj Yadav',
      type: 'Outgoing',
      status: 'Pending',
      date: new Date('2024-11-16T09:00:00'),
      amount: 90.0,
    },
    {
      name: 'MP Portal',
      type: 'Outgoing',
      status: 'Done',
      date: new Date('2024-11-15T18:45:00'),
      amount: 90.0,
    },
    {
      name: 'Akash Singh',
      type: 'Outgoing',
      status: 'Completed',
      date: new Date('2024-11-20T13:15:00'),
      amount: 1000.0,
    },
  ],
};

const Dashboard = () => {
  const [current, setCurrent] = useState('Home'); // State to track active section
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [currentPaymentState, setCurrentPaymentState] = useState(0);
  const [currentAutoPayState, setCurrentAutoPayState] = useState(3);
  const [loading, setLoading] = useState(false);
  const [basicLoading, setBasicLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [SessionTransactionDetails, setSessionTransactionDetails] = useState(
    {}
  );
  // const location = useLocation();
  // const BeforeSessionAccountDetails = location.state?.sessionAccountDetails;
  // const [SessionAccountDetails, setSessionAccountDetails] = useState(
  //   BeforeSessionAccountDetails
  // );

  // useEffect(() => {
  //   if (current === 'Pay or Transfer' && currentPaymentState === 2) {
  //     const timer = setTimeout(() => {
  //       setCurrentPaymentState(0);
  //     }, 5000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [currentPaymentState, current]);

  // useEffect(() => {
  //   if (current === 'Auto Pay' && currentAutoPayState === 3) {
  //     const timer = setTimeout(() => {
  //       setCurrentAutoPayState(0);
  //       handleAutoPayUIUpdate();
  //     }, 3000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [currentAutoPayState, current]);

  useEffect(() => {
    if (current === 'Pay or Transfer' && currentPaymentState === 0) {
      setFormPaymentData({
        recipientAccountNumber: '',
        recipientName: '',
        amount: '',
      });
      setFormPaymentDataErrors({});
    }
  }, [current, currentPaymentState]);

  const [formPaymentData, setFormPaymentData] = useState({
    recipientName: '',
    recipientAccountNumber: '',
    amount: '',
  });
  const [formPaymentDataErrors, setFormPaymentDataErrors] = useState({});

  // State for Auto Pay Form
  const [formAutoPay, setFormAutoPay] = useState({
    recipientName: '',
    recipientAccountNumber: '',
    endDate: '',
    paymentFrequency: '',
    amount: '',
  });

  const [formAutoPayErrors, setFormAutoPayErrors] = useState({});

  const toggleBalanceVisibility = () => {
    setBalanceVisible(!balanceVisible);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (current === 'Auto Pay') {
      setFormAutoPay({
        ...formAutoPay,
        [name]: value,
      });
      setFormAutoPayErrors({
        ...formAutoPayErrors,
        [name]: '',
      });
    } else {
      setFormPaymentData({
        ...formPaymentData,
        [name]: value,
      });
      setFormPaymentDataErrors({
        ...formPaymentDataErrors,
        [name]: '',
      });
    }
  };

  const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 280,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '1.5em',
    zIndex: 1000,
  };

  const overlayStylesBasic = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000, // Ensure it's above other elements
  };

  const LoadingOverlay = () => (
    <div style={overlayStylesBasic}>
      <div className='loaderNew'></div>
    </div>
  );

  const LoadingOverlayDashboard = () => (
    <div style={overlayStyles}>
      <div className='loaderDashboard'></div>
    </div>
  );

  const validatePayment = () => {
    let errors = {};

    if (current === 'Pay or Transfer' && currentPaymentState === 0) {
      if (!formPaymentData.recipientName)
        errors.recipientName = 'Recipient Name is Required.';
      if (!formPaymentData.recipientAccountNumber)
        errors.recipientAccountNumber = 'Account Number is Required.';
      if (!formPaymentData.amount) errors.amount = 'Amount is Required.';
      setFormPaymentDataErrors(errors);
      return Object.keys(errors).length === 0;
    }

    if (current === 'Pay or Transfer' && currentPaymentState === 1) {
      if (!formPaymentData.otp) errors.otp = 'Otp is Required.';
      setFormPaymentDataErrors(errors);
      return Object.keys(errors).length === 0;
    }

    if (current === 'Auto Pay' && currentAutoPayState === 1) {
      if (!formAutoPay.recipientName)
        errors.autoPayRecipientName = 'Recipient Name is Required.';
      if (!formAutoPay.recipientAccountNumber)
        errors.autoPayRecipientAccountNumber = 'Account Number is Required.';
      if (!formAutoPay.endDate) errors.autoPayEndDate = 'End Date is Required.';
      if (!formAutoPay.paymentFrequency)
        errors.autoPayPaymentFrequency = 'Payment Frequency is Required.';
      if (!formAutoPay.amount) errors.autoPayAmount = 'Amount is Required.';
      setFormAutoPayErrors(errors);
      return Object.keys(errors).length === 0;
    }

    if (current === 'Auto Pay' && currentAutoPayState === 2) {
      if (!password) errors.password = 'Password is Required.'; // Match key with formAutoPayErrors check in input
      setFormAutoPayErrors(errors);
      return Object.keys(errors).length === 0;
    }

    return true;
  };

  const formatDateSend = (date) => {
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  const handleSendPayment = async () => {
    if (!validatePayment()) {
      return;
    }
    setBasicLoading(true);

    const urlEncodedData = new URLSearchParams();
    for (const key in formPaymentData) {
      if (Object.prototype.hasOwnProperty.call(formPaymentData, key)) {
        urlEncodedData.append(key, formPaymentData[key]);
      }
    }
    urlEncodedData.append('form', 'payment_email');
    const today = new Date();
    const formattedDate = formatDateSend(today);
    urlEncodedData.append('transactionDate', formattedDate);

    try {
      const response = await axios.post(
        'https://ghoul-causal-adder.ngrok-free.app/AscentisBank/pay',
        urlEncodedData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        }
      );
      console.log(response.data); // Log response data for debugging

      if (response.data.data === 2) {
        try {
          // Second API Call
          const secondaryResponse = await axios.get(
            'https://ghoul-causal-adder.ngrok-free.app/AscentisBank/otp',
            {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            }
          );

          if (secondaryResponse.data.exists === true) {
            setBasicLoading(false);
            setCurrentPaymentState((cur) => cur + 1);
          } else {
            setBasicLoading(false);
            alert('Error sending OTP. Please try again later.');
          }
        } catch (secondaryError) {
          setBasicLoading(false);
          console.error(
            'Error fetching data from secondary API:',
            secondaryError
          );
          alert('Error with secondary API. Please try again later.');
        }
      } else {
        handleResponseErrors(response.data.data);
      }
    } catch (error) {
      setBasicLoading(false);
      console.error('Error during sending payment:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleResponseErrors = (data) => {
    const errors = {};
    if (data === 0) {
      errors.recipientName = 'Please provide a valid account number ';
    } else if (data === 1) {
      errors.recipientAccountNumber =
        'Account Number & Recipient Name does not match.';
    }
    setFormPaymentDataErrors(errors);
  };

  const handleOtpSubmit = async () => {
    setBasicLoading(true);

    const urlEncodedData = new URLSearchParams();
    urlEncodedData.append('otp', otp);

    try {
      const response = await axios.post(
        'https://ghoul-causal-adder.ngrok-free.app/AscentisBank/transaction',
        urlEncodedData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        }
      );

      setBasicLoading(false);

      if (response.data.success || response.status === 201) {
        setCurrentPaymentState((cur) => cur + 1);
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setBasicLoading(false);
      console.error('Error during OTP submission:', error);
      alert('An error occurred while verifying OTP. Please try again.');
    }
  };

  // Fetch updated session details when needed
  const handleHomeUIUpdate = async () => {
    setLoading(true);
    try {
      const sessionResponse = await axios.get(
        'https://ghoul-causal-adder.ngrok-free.app/AscentisBank/home',
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      let parsedData;
      if (typeof sessionResponse.data === 'string') {
        parsedData = JSON.parse(sessionResponse.data); // Parse if string
      } else {
        parsedData = sessionResponse.data; // Use directly if object
      }

      setSessionAccountDetails(parsedData); // Update session details
    } catch (error) {
      console.error('Error fetching session details:', error);
      alert('Failed to fetch session details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTransactionUIUpdate = async () => {
    setLoading(true);
    try {
      const sessionResponse = await axios.get(
        'https://ghoul-causal-adder.ngrok-free.app/AscentisBank/transactionList',
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      let parsedData;
      if (typeof sessionResponse.data === 'string') {
        parsedData = JSON.parse(sessionResponse.data); // Parse if string
      } else {
        parsedData = sessionResponse.data; // Use directly if object
      }

      setSessionTransactionDetails(parsedData); // Update session details
    } catch (error) {
      console.error('Error fetching session details:', error);
      alert('Failed to fetch session details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSetAutoPay = async () => {
    if (!validatePayment()) {
      return;
    }

    setBasicLoading(true);

    const urlEncodedData = new URLSearchParams();
    for (const key in formAutoPay) {
      if (Object.prototype.hasOwnProperty.call(formAutoPay, key)) {
        urlEncodedData.append(key, formAutoPay[key]);
      }
    }

    const today = new Date();
    const formattedDate = formatDateSend(today);
    urlEncodedData.append('autoPayDate', formattedDate);

    try {
      const response = await axios.post(
        'https://ghoul-causal-adder.ngrok-free.app/AscentisBank/pay',
        urlEncodedData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        }
      );

      console.log(response.data); // Debugging log, remove in production

      // Handle response data
      if (response.data?.data === 0) {
        setFormAutoPayErrors((prevErrors) => ({
          ...prevErrors,
          autoPayRecipientAccountNumber:
            'Please Provide a Valid Account Number.',
        }));
      } else if (response.data?.data === 1) {
        setFormAutoPayErrors((prevErrors) => ({
          ...prevErrors,
          autoPayRecipientName: 'Name & Account Number do not match.',
        }));
      } else if (response.data?.data === 2 || response.status === 201) {
        setCurrentAutoPayState(3); // Move to next state
      }
    } catch (error) {
      console.error('Error during setting auto-pay:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setBasicLoading(false); // Ensure loading is stopped in all scenarios
    }
  };

  const handleAutoPayPassword = async () => {
    if (!validatePayment()) return;

    setBasicLoading(true);
    const urlEncodedData = new URLSearchParams();
    urlEncodedData.append('password', password);

    try {
      const response = await axios.post(
        'https://ghoul-causal-adder.ngrok-free.app/AscentisBank/pay',
        urlEncodedData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        }
      );

      if (response.data?.exists === true) {
        setCurrentAutoPayState(3);
      } else {
        setFormAutoPayErrors((prevErrors) => ({
          ...prevErrors,
          password: 'Wrong Password',
        }));
      }
    } catch (error) {
      console.error('Error during sending payment:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setBasicLoading(false);
    }
  };

  return (
    <div className='flex'>
      {/* Sidebar */}
      <aside className='w-[280px] h-screen bg-[#163172]'>
        <div className='w-full h-full flex flex-col justify-center items-center'>
          {/* Logo Section */}
          <div className='h-[20%] w-full flex justify-center items-center'>
            <img
              src='src/assets/Images/name&logo.png'
              alt='Logo'
              className='w-[185px]'
            />
          </div>

          {/* Navigation Section */}
          <div className='h-[80%] w-full px-8 pt-4'>
            <ul className='w-full h-full flex flex-col justify-start items-start gap-2'>
              {/* Home */}
              <li
                className={`h-[40px] w-full flex items-center gap-2 cursor-pointer rounded-[10px] pl-3 ${
                  current === 'Home' ? 'bg-[#FAFAFA] bg-opacity-15' : ''
                }`}
                onClick={() => {
                  setCurrent('Home');
                  handleHomeUIUpdate();
                }}
              >
                <img src='src/assets/Images/home_vector.png' alt='Home' />
                <span className='font-outfit font-light text-[18px] text-white'>
                  Home
                </span>
              </li>
              {/* Pay or Transfer */}
              <li
                className={`h-[40px] w-full flex items-center gap-2 cursor-pointer rounded-[10px] pl-3 ${
                  current === 'Pay or Transfer'
                    ? 'bg-[#FAFAFA] bg-opacity-15'
                    : ''
                }`}
                onClick={() => setCurrent('Pay or Transfer')}
              >
                <img
                  src='src/assets/Images/pay_vector.png'
                  alt='Pay or Transfer'
                />
                <span className='font-outfit font-light text-[18px] text-white'>
                  Pay or Transfer
                </span>
              </li>

              {/* Auto Pay */}
              <li
                className={`h-[40px] w-full flex items-center gap-2 cursor-pointer rounded-[10px] pl-3 ${
                  current === 'Auto Pay' ? 'bg-[#FAFAFA] bg-opacity-15' : ''
                }`}
                onClick={() => {
                  setCurrent('Auto Pay');
                  // setCurrentAutoPayState(0); // Update state
                }}
              >
                <img src='src/assets/Images/auto_pay.png' alt='Auto Pay' />
                <span className='font-outfit font-light text-[18px] text-white'>
                  Auto Pay
                </span>
              </li>

              {/* Tranactions */}
              <li
                className={`h-[40px] w-full flex items-center gap-2 cursor-pointer rounded-[10px] pl-3 ${
                  current === 'Tranactions' ? 'bg-[#FAFAFA] bg-opacity-15' : ''
                }`}
                onClick={() => {
                  setCurrent('Transactions');
                  handleTransactionUIUpdate(); // Update state
                }}
              >
                <img src='src/assets/Images/transaction.png' alt='Auto Pay' />
                <span className='font-outfit font-light text-[18px] text-white'>
                  Transactions
                </span>
              </li>

              {/* Account Info */}
              <li
                className={`h-[40px] w-full flex items-center gap-2 cursor-pointer rounded-[10px] pl-3 ${
                  current === 'Account Info' ? 'bg-[#FAFAFA] bg-opacity-15' : ''
                }`}
                onClick={() => setCurrent('Account Info')}
              >
                <img
                  src='src/assets/Images/pay_vector.png'
                  alt='Pay or Transfer'
                />
                <span className='font-outfit font-light text-[18px] text-white'>
                  Account Info
                </span>
              </li>

              {/* Settings */}
              <li
                className={`h-[40px] w-full flex items-center gap-2 cursor-pointer rounded-[10px] pl-3 ${
                  current === 'Settings' ? 'bg-[#FAFAFA] bg-opacity-15' : ''
                }`}
                onClick={() => setCurrent('Settings')}
              >
                <img
                  src='src/assets/Images/settings_vector.png'
                  alt='Settings'
                />
                <span className='font-outfit font-light text-[18px] text-white'>
                  Settings
                </span>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Section */}
      <main className='flex-1 h-screen bg-[#F8F9FA] '>
        <header className=' h-[60px] w-full border-b-2 py-6 px-6 flex justify-end items-center cursor-pointer'>
          <h1 className='font-outfit'>
            {SessionAccountDetails.accountOwnerName}
          </h1>
        </header>
        <div className='h-[600px] w-full px-24 pt-8 overflow-scroll'>
          {/*Home*/}
          {current === 'Home' && (
            <>
              {loading && <LoadingOverlayDashboard />}
              <div className='h-full w-full  flex flex-col justify-center items-center  gap-8'>
                {/*Balance Section*/}
                <div className='h-[25%] w-full  flex flex-col justify-center items-center'>
                  {/*Balance*/}
                  <div className='h-[70%] w-full flex flex-col justify-start items-start '>
                    <section className='flex justify-start items-start'>
                      <h1 className='font-outfit font-medium text-[16px]'>
                        Total Account Balance
                      </h1>
                      <img
                        src={
                          balanceVisible
                            ? 'src/assets/Images/eye_open.png'
                            : 'src/assets/Images/eye_close_new.png'
                        }
                        className='w-[20px] ml-4 cursor-pointer '
                        onClick={toggleBalanceVisibility}
                      />
                    </section>
                    <h1 className='font-outfit font-medium text-2xl'>
                      {balanceVisible
                        ? formatCurrency(SessionAccountDetails.accountBalance)
                        : 'XXX'}
                    </h1>
                    <p className='text-[#919191] font-outfit'>
                      Your total balance at {formattedDate}
                    </p>
                  </div>

                  {/*CTA*/}
                  <div className='h-[30%] w-full flex justify-start items-center gap-1.5'>
                    <button className='font-outfit bg-[#363636] rounded-[10px] font-light gap-1.5 text-white flex justify-center items-center py-2 px-4'>
                      <img
                        src='src/assets/Images/pay_vector.png'
                        alt='Pay or Transfer'
                      />
                      Pay or Transfer
                    </button>
                    <button className='font-outfit bg-[#EBEAFF] rounded-[10px] font-light gap-1.5 text-[#5C58FF] flex justify-center items-center py-2 px-4'>
                      <img src='src/assets/Images/add_img.png' alt='Top Up' />
                      Top Up
                    </button>
                  </div>
                </div>

                {/*Recent Transaction Section*/}
                <div className='h-[75%] w-full flex flex-col justify-center items-center rounded-[10px] border-[1.5px] border-[#EBEBEB]'>
                  <div className='h-[20%] w-full flex justify-between items-center px-3'>
                    <p className='font-outfit font-medium text-[20px]'>
                      Recent transactions
                    </p>
                    <button className='font-outfit text-black rounded-[10px] font-light border-[1.5px] border-[#C9C9C9] py-1 px-2 text-[16px]'>
                      View all
                    </button>
                  </div>
                  <div className='h-[80%] w-full px-14 overflow-y-auto'>
                    {SessionAccountDetails.recentTransactions
                      .slice()
                      .map((transaction, index) => (
                        <div
                          key={index}
                          className='h-[60px] w-full flex justify-center items-center mb-2 border-b-2 border-gray-300'
                        >
                          {/*Name*/}
                          <div className='h-full w-[70%]  font-outfit flex justify-between items-start'>
                            <section className='flex flex-col justify-center items-start'>
                              <div className='text-[18px] '>
                                {transaction.name}
                              </div>
                              <div className='text-[14px] text-[#5E5E5E]'>
                                {transaction.type}
                              </div>
                            </section>
                            <section className='text-[12px] flex justify-center items-center h-full mr-3'>
                              {formatDate(transaction.date)}
                            </section>
                          </div>

                          {/*Status*/}
                          <div className='h-full w-[15%]  font-outfit flex justify-center items-center'>
                            {transaction.status === 'Completed' ? (
                              <button className='text-[#363636] text-[14px] bg-[#9AEBBF] rounded-[10px] px-2 py-1'>
                                Completed
                              </button>
                            ) : (
                              <button className='text-[#363636] text-[14px] bg-[#FFE6BF] rounded-[10px] px-2 py-1'>
                                {transaction.status}
                              </button>
                            )}
                          </div>

                          {/*Amount*/}
                          <div className='h-full w-[15%]  flex justify-center items-center'>
                            {transaction.type === 'Incoming' ? (
                              <p className='text-[#3CB775] font-outfit'>
                                {'+' + formatCurrency(transaction.amount)}
                              </p>
                            ) : (
                              <p className='text-[#363636] font-outfit'>
                                {'-' + formatCurrency(transaction.amount)}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </>
          )}
          {current === 'Pay or Transfer' && (
            <>
              {loading && <LoadingOverlayDashboard />}
              <>
                {currentPaymentState === 0 && (
                  <>
                    {basicLoading && <LoadingOverlay />}
                    <div>
                      <h1 className='font-outfit font-bold text-2xl'>
                        Pay or Transfer
                      </h1>
                      <p className='font-outfit font-light text-lg text-gray-600'>
                        Initiate payments and transfers here.
                      </p>
                    </div>

                    <form className='space-y-6 mt-8' noValidate>
                      <div className='space-y-2'>
                        <label
                          htmlFor='recipientAccountNumber'
                          className='block text-sm font-medium text-[#323232] font-outfit'
                        >
                          Account Number
                        </label>
                        <input
                          type='text'
                          id='recipientAccountNumber'
                          name='recipientAccountNumber'
                          value={formPaymentData.recipientAccountNumber}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 ${
                            formPaymentDataErrors.recipientAccountNumber
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                          aria-invalid={
                            !!formPaymentDataErrors.recipientAccountNumber
                          }
                          aria-describedby='recipientAccountNumber-error'
                        />
                        {formPaymentDataErrors.recipientAccountNumber && (
                          <p
                            id='recipientAccountNumber-error'
                            className='text-red-500 text-sm mt-1 animate-fade-in'
                            role='alert'
                          >
                            {formPaymentDataErrors.recipientAccountNumber}
                          </p>
                        )}
                      </div>

                      <div className='space-y-2'>
                        <label
                          htmlFor='recipientName'
                          className='block text-sm font-medium text-[#323232] font-outfit'
                        >
                          Account Holder Name
                        </label>
                        <input
                          type='text'
                          id='recipientName'
                          name='recipientName'
                          value={formPaymentData.recipientName}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 ${
                            formPaymentDataErrors.recipientName
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                          aria-invalid={!!formPaymentDataErrors.recipientName}
                          aria-describedby='recipientName-error'
                        />
                        {formPaymentDataErrors.recipientName && (
                          <p
                            id='recipientName-error'
                            className='text-red-500 text-sm mt-1 animate-fade-in'
                            role='alert'
                          >
                            {formPaymentDataErrors.recipientName}
                          </p>
                        )}
                      </div>

                      <div className='space-y-2'>
                        <label
                          htmlFor='amount'
                          className='block text-sm font-medium text-[#323232] font-outfit'
                        >
                          Amount
                        </label>
                        <input
                          type='number'
                          id='amount'
                          name='amount'
                          value={formPaymentData.amount}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 ${
                            formPaymentDataErrors.amount
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                          aria-invalid={!!formPaymentDataErrors.amount}
                          aria-describedby='amount-error'
                        />
                        {formPaymentDataErrors.amount && (
                          <p
                            id='amount-error'
                            className='text-red-500 text-sm mt-1 animate-fade-in'
                            role='alert'
                          >
                            {formPaymentDataErrors.amount}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={handleSendPayment}
                        type='button'
                        className='w-full py-3 px-4 bg-[#323232] text-white rounded-lg shadow-md font-outfit font-light'
                      >
                        Send Payment
                      </button>
                    </form>
                  </>
                )}
                {currentPaymentState === 1 && (
                  <>
                    {basicLoading && <LoadingOverlay />}
                    <div>
                      <h1 className='font-outfit font-bold text-2xl'>
                        Enter OTP
                      </h1>
                      <p className='font-outfit font-light text-lg text-gray-600'>
                        OTP has send to your registered email.
                      </p>
                    </div>

                    <form className='space-y-6 mt-8' noValidate>
                      <div className='space-y-2'>
                        <label
                          htmlFor='otp'
                          className='block text-sm font-medium text-[#323232] font-outfit'
                        >
                          Otp
                        </label>
                        <input
                          type='number'
                          id='otp'
                          name='otp'
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 ${
                            formPaymentDataErrors.otp
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                          aria-invalid={!!formPaymentDataErrors.otp}
                          aria-describedby='otp-error'
                        />
                        {formPaymentDataErrors.amount && (
                          <p
                            id='otp-error'
                            className='text-red-500 text-sm mt-1 animate-fade-in'
                            role='alert'
                          >
                            {formPaymentDataErrors.otp}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={handleOtpSubmit}
                        type='button'
                        className='w-full py-3 px-4 bg-[#323232] text-white rounded-lg shadow-md font-outfit font-light'
                      >
                        Verify
                      </button>
                    </form>
                  </>
                )}
                {currentPaymentState === 2 && (
                  <>
                    <div className='h-full w-full flex flex-col justify-center items-center'>
                      <h1 className='text-2xl md:text-3xl font-SF_PRO_Semibold text-green-600 mb-2'>
                        Payment Sucessfull!
                      </h1>
                      <img
                        src='/src/assets/Images/check.png'
                        alt='check'
                        className='h-24 w-24 mb-4'
                      />
                    </div>
                  </>
                )}
              </>
            </>
          )}
          {current === 'Auto Pay' && (
            <>
              {loading && <LoadingOverlayDashboard />}
              <>
                {currentAutoPayState === 0 && (
                  <>
                    <div className='h-full w-full  flex flex-col justify-center items-center  gap-8'>
                      {/*Auto Pay Top Section*/}
                      <div className='h-[10%] w-full  flex justify-start items-center'>
                        {/*CTA TO STATE 2*/}
                        <button
                          className='font-outfit bg-[#EBEAFF] rounded-[10px] font-light gap-1.5 text-[#5C58FF] flex justify-center items-center py-2 px-4'
                          onClick={() => setCurrentAutoPayState(1)}
                        >
                          <img
                            src='src/assets/Images/add_img.png'
                            alt='Top Up'
                          />
                          New
                        </button>
                      </div>

                      {/*Recent Transaction Section*/}
                      <div className='h-[90%] w-full flex flex-col justify-center items-center rounded-[10px] border-[1.5px] border-[#EBEBEB]'>
                        <div className='h-[20%] w-full flex justify-between items-center px-3'>
                          <p className='font-outfit font-medium text-[20px]'>
                            Current Auto Pay
                          </p>
                        </div>
                        <div className='h-[80%] w-full px-14 overflow-y-auto'>
                          {SessionAutoPayDetails.recentTransactions
                            .slice()
                            .map((transaction, index) => (
                              <div
                                key={index}
                                className='h-[60px] w-full flex justify-center items-center mb-2 border-b-2 border-gray-300'
                              >
                                {/*Name*/}
                                <div className='h-full w-[70%]  font-outfit flex justify-between items-start'>
                                  <section className='flex flex-col justify-center items-start'>
                                    <div className='text-[18px] '>
                                      {transaction.name}
                                    </div>
                                  </section>
                                  <section className='text-[12px] flex justify-center items-center h-full mr-3'>
                                    {formatDate(transaction.date)}
                                  </section>
                                </div>

                                {/*Amount*/}
                                <div className='h-full w-[15%]  flex justify-center items-center'>
                                  <p className='text-[#363636] font-outfit'>
                                    {formatCurrency(transaction.amount)}
                                  </p>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {currentAutoPayState === 1 && (
                  <>
                    {basicLoading && <LoadingOverlay />}
                    <div>
                      <button
                        className='rounded-full border-[1px] border-gray-600 py-2 px-[6px]'
                        onClick={() => setCurrentAutoPayState(0)}
                      >
                        <img src='src\assets\Images\back_arrow.png' />
                      </button>
                      <h1 className='font-outfit font-bold text-2xl'>
                        Auto Pay
                      </h1>
                      <p className='font-outfit font-light text-lg text-gray-600'>
                        Set up recurring payments easily.
                      </p>
                    </div>

                    <form className='space-y-6 mt-8' noValidate>
                      {/* Recipient Name */}
                      <div className='space-y-2'>
                        <label
                          htmlFor='recipientName'
                          className='block text-sm font-medium text-[#323232] font-outfit'
                        >
                          Recipient Name
                        </label>
                        <input
                          type='text'
                          id='recipientName'
                          name='recipientName'
                          value={formAutoPay.recipientName}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 ${
                            formAutoPayErrors?.autoPayRecipientName
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                          aria-invalid={
                            !!formAutoPayErrors?.autoPayRecipientName
                          }
                          aria-describedby='recipientName-error'
                        />
                        {formAutoPayErrors?.autoPayRecipientName && (
                          <p
                            id='recipientName-error'
                            className='text-red-500 text-sm mt-1 animate-fade-in'
                            role='alert'
                          >
                            {formAutoPayErrors.autoPayRecipientName}
                          </p>
                        )}
                      </div>

                      {/* Account Number */}
                      <div className='space-y-2'>
                        <label
                          htmlFor='accountNumber'
                          className='block text-sm font-medium text-[#323232] font-outfit'
                        >
                          Account Number
                        </label>
                        <input
                          type='text'
                          id='accountNumber'
                          name='accountNumber'
                          value={formAutoPay.accountNumber}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 ${
                            formAutoPayErrors?.autoPayRecipientAccountNumber
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                          aria-invalid={
                            !!formAutoPayErrors?.autoPayRecipientAccountNumber
                          }
                          aria-describedby='accountNumber-error'
                        />
                        {formAutoPayErrors?.autoPayRecipientAccountNumber && (
                          <p
                            id='accountNumber-error'
                            className='text-red-500 text-sm mt-1 animate-fade-in'
                            role='alert'
                          >
                            {formAutoPayErrors.autoPayRecipientAccountNumber}
                          </p>
                        )}
                      </div>

                      {/* End Date */}
                      <div className='space-y-2'>
                        <label
                          htmlFor='startDate'
                          className='block text-sm font-medium text-[#323232] font-outfit'
                        >
                          End Date
                        </label>
                        <input
                          type='date'
                          id='startDate'
                          name='startDate'
                          value={formAutoPay.endDate}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 ${
                            formAutoPayErrors?.autoPayEndDate
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                        />
                        {formAutoPayErrors?.autoPayEndDate && (
                          <p
                            id='amount-error'
                            className='text-red-500 text-sm mt-1 animate-fade-in'
                            role='alert'
                          >
                            {formAutoPayErrors.autoPayEndDate}
                          </p>
                        )}
                      </div>

                      {/* Payment Frequency */}
                      <div className='space-y-2'>
                        <label
                          htmlFor='paymentFrequency'
                          className='block text-sm font-medium text-[#323232] font-outfit'
                        >
                          Payment Frequency
                        </label>
                        <select
                          id='paymentFrequency'
                          name='paymentFrequency'
                          value={formAutoPay.paymentFrequency}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 ${
                            formAutoPayErrors?.autoPayPaymentFrequency
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                        >
                          <option value='' disabled>
                            Select Payment Frequency
                          </option>
                          <option value='monthly'>Monthly</option>
                          <option value='weekly'>Weekly</option>
                          <option value='yearly'>Yearly</option>
                        </select>
                        {formAutoPayErrors?.autoPayPaymentFrequency && (
                          <p
                            id='amount-error'
                            className='text-red-500 text-sm mt-1 animate-fade-in'
                            role='alert'
                          >
                            {formAutoPayErrors.autoPayPaymentFrequency}
                          </p>
                        )}
                      </div>

                      {/* Amount */}
                      <div className='space-y-2'>
                        <label
                          htmlFor='amount'
                          className='block text-sm font-medium text-[#323232] font-outfit'
                        >
                          Amount
                        </label>
                        <input
                          type='number'
                          id='amount'
                          name='amount'
                          value={formAutoPay.amount}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 ${
                            formAutoPayErrors?.autoPayAmount
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                          aria-invalid={!!formAutoPayErrors?.autoPayAmount}
                          aria-describedby='amount-error'
                        />
                        {formAutoPayErrors?.autoPayAmount && (
                          <p
                            id='amount-error'
                            className='text-red-500 text-sm mt-1 animate-fade-in'
                            role='alert'
                          >
                            {formAutoPayErrors.autoPayAmount}
                          </p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button
                        type='button'
                        onClick={validatePayment}
                        className='w-full py-3 px-4 bg-[#323232] text-white rounded-lg shadow-md font-outfit font-light'
                      >
                        Set Auto Pay
                      </button>
                    </form>
                  </>
                )}
                {currentAutoPayState === 2 && (
                  <>
                    {basicLoading && <LoadingOverlay />}
                    <div>
                      <h1 className='font-outfit font-bold text-2xl'>
                        Enter Account Password
                      </h1>
                      <p className='font-outfit font-light text-lg text-gray-600'>
                        To initiate Auto Pay, please enter your account
                        password.
                      </p>
                    </div>

                    <form className='space-y-6 mt-8' noValidate>
                      <div className='space-y-2'>
                        <label
                          htmlFor='password'
                          className='block text-sm font-medium text-[#323232] font-outfit'
                        >
                          Enter Password
                        </label>
                        <input
                          type='password'
                          id='password'
                          name='password'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 ${
                            formAutoPayErrors.password
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                          aria-invalid={!!formAutoPayErrors.password}
                          aria-describedby='otp-error'
                        />
                        {formAutoPayErrors.password && (
                          <p
                            id='otp-error'
                            className='text-red-500 text-sm mt-1 animate-fade-in'
                            role='alert'
                          >
                            {formAutoPayErrors.password}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={validatePayment}
                        type='button'
                        className='w-full py-3 px-4 bg-[#323232] text-white rounded-lg shadow-md font-outfit font-light'
                      >
                        Verify
                      </button>
                    </form>
                  </>
                )}
                {currentAutoPayState === 3 && (
                  <>
                    <div className='w-full h-full flex justify-center items-center flex-col gap-10'>
                      <h1 className='font-outfit text-3xl text-green-600'>
                        Auto Pay Set Successfull
                      </h1>
                      <img src='src\assets\Images\check.png' className='w-24' />
                    </div>
                  </>
                )}
              </>
            </>
          )}
          {current === 'Settings' && (
            <div>
              <h1 className='font-outfit font-bold text-2xl'>Settings</h1>
              <p className='font-outfit font-light text-lg text-gray-600'>
                Manage your account settings here.
              </p>
            </div>
          )}

          {current === 'Transactions' && (
            <>
              {loading && <LoadingOverlayDashboard />}
              <div className='h-full w-full  flex flex-col justify-center items-center  gap-8'>
                <div className='h-[10%] w-full  flex justify-start items-center'>
                  <h1 className='font-outfit text-2xl'>Transactions</h1>
                </div>
                <div className='h-[80%] w-full px-14 overflow-y-auto rounded-[10px] border-[1px] border-gray-300 p-5'>
                  {SessionTransactionDetails.recentTransactions
                    .slice()
                    .map((transaction, index) => (
                      <div
                        key={index}
                        className='h-[60px] w-full flex justify-center items-center mb-2 border-b-2 border-gray-300'
                      >
                        {/*Name*/}
                        <div className='h-full w-[70%]  font-outfit flex justify-between items-start'>
                          <section className='flex flex-col justify-center items-start'>
                            <div className='text-[18px] '>
                              {transaction.name}
                            </div>
                            <div className='text-[14px] text-[#5E5E5E]'>
                              {transaction.type}
                            </div>
                          </section>
                          <section className='text-[12px] flex justify-center items-center h-full mr-3'>
                            {formatDate(transaction.date)}
                          </section>
                        </div>

                        {/*Status*/}
                        <div className='h-full w-[15%]  font-outfit flex justify-center items-center'>
                          {transaction.status === 'Completed' ? (
                            <button className='text-[#363636] text-[14px] bg-[#9AEBBF] rounded-[10px] px-2 py-1'>
                              Completed
                            </button>
                          ) : (
                            <button className='text-[#363636] text-[14px] bg-[#FFE6BF] rounded-[10px] px-2 py-1'>
                              {transaction.status}
                            </button>
                          )}
                        </div>

                        {/*Amount*/}
                        <div className='h-full w-[15%]  flex justify-center items-center'>
                          {transaction.type === 'Incoming' ? (
                            <p className='text-[#3CB775] font-outfit'>
                              {'+' + formatCurrency(transaction.amount)}
                            </p>
                          ) : (
                            <p className='text-[#363636] font-outfit'>
                              {'-' + formatCurrency(transaction.amount)}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}

          {current === 'Account Info' && (
            <>
              <UserInformationDisplay />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
