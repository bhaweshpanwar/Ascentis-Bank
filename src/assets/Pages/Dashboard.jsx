import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import UserInformationDisplay from '../components/UserInformationDisplay';
import { API_ENDPOINTS } from '/src/config.js';
import DashaccountInfo from '../Images/account_info.png';
import DashaddImg from '../Images/add_img.png';
import DashbackArrow from '../Images/back_arrow.png';
import DasheyeOen from '../Images/eye_open.png';
import DasheyeClose from '../Images/eye_close_new.png';
import DashfixedDeposit from '../Images/fixed_deposit.png';
import DashhomeVector from '../Images/home_vector.png';
import DashlogOut from '../Images/log_out.png';
import DashnameAndLogo from '../Images/name&logo.png';
import DashpayVector from '../Images/pay_vector.png';
import Dashtransaction from '../Images/transaction.png';
import DashautoPay from '../Images/auto_pay.png';
import Dashcheck from '../Images/check.png';

/*const SessionFixedDepositDetailsDummy = [
  {
    fd_Id: '001FD',
    name: 'John Doe',
    interestRate: 5.5,
    amount: 10000,
    endDate: '2025-12-31',
  },
  {
    fd_Id: '002FD',
    name: 'Jane Smith',
    interestRate: 6.2,
    amount: 5000,
    endDate: '2026-06-15',
  },
  {
    fd_Id: '003FD',
    name: 'Alice Johnson',
    interestRate: 4.8,
    amount: 20000,
    endDate: '2024-09-10',
  },
];

const SessionAccountDetailsDummy = {
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

const SessionAutoPayDetailsDummy = [
  {
    autopay_Id: '001AP',
    name: 'Amit Sharma',
    startDate: '2023-01-01',
    endDate: '2024-01-01',
    paymentFrequency: 'Monthly',
    amount: 5000,
  },
  {
    autopay_Id: '002AP',
    name: 'Sneha Iyer',
    startDate: '2022-06-15',
    endDate: '2023-06-15',
    paymentFrequency: 'Yearly',
    amount: 60000,
  },
  {
    autopay_Id: '003AP',
    name: 'Rohan Mehta',
    startDate: '2023-03-01',
    endDate: '2023-12-01',
    paymentFrequency: 'Weekly',
    amount: 1200,
  },
  {
    autopay_Id: '004AP',
    name: 'Pooja Deshmukh',
    startDate: '2023-07-10',
    endDate: '2024-07-10',
    paymentFrequency: 'Monthly',
    amount: 7500,
  },
  {
    autopay_Id: '005AP',
    name: 'Karan Verma',
    startDate: '2023-08-01',
    endDate: '2024-08-01',
    paymentFrequency: 'Weekly',
    amount: 1000,
  },
];*/

const Dashboard = () => {
  const [current, setCurrent] = useState('Home'); // State to track active section
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [currentPaymentState, setCurrentPaymentState] = useState(0);
  const [currentAutoPayState, setCurrentAutoPayState] = useState(0);
  const [currentFixedDepositState, setCurrentFixedDepositState] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState({});
  const [basicLoading, setBasicLoading] = useState(false);
  const [userData, setUserData] = useState({ accountInfo: {} });
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [fdpassword, setfdPassword] = useState('');
  const [SessionTransactionDetails, setSessionTransactionDetails] = useState({
    recentTransactions: [], // Default to an empty array
  });
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [isAmountModalVisible, setIsAmountModalVisible] = useState(false);
  const [forfeitedAmount, setForfeitedAmount] = useState(0);

  const navigate = useNavigate();
  const [SessionAutoPayDetails, setSessionAutoPayDetails] = useState({
    existingAutopay: [],
    // existingAutopay: SessionAutoPayDetailsDummy,
  });

  const [SessionFixedDepositDetails, setSessionFixedDepositDetails] = useState({
    recentFD: [],
    // recentFD: SessionFixedDepositDetailsDummy,
  });
  const location = useLocation();
  const BeforeSessionAccountDetails = location.state?.sessionAccountDetails;
  const [SessionAccountDetails, setSessionAccountDetails] = useState(
    BeforeSessionAccountDetails
  );
  // const { sessionId } = useParams(); // Extract sessionId from the URL
  // console.log('Session ID:', sessionId);

  useEffect(() => {
    if (current === 'Pay or Transfer' && currentPaymentState === 2) {
      const timer = setTimeout(() => {
        setCurrentPaymentState(0);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentPaymentState, current]);

  useEffect(() => {
    if (current === 'Auto Pay' && currentAutoPayState === 3) {
      const timer = setTimeout(() => {
        setCurrentAutoPayState(0);
        handleAutoPayUIUpdate();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentAutoPayState, current]);

  useEffect(() => {
    if (current === 'Fixed Deposit' && currentFixedDepositState === 3) {
      const timer = setTimeout(() => {
        setCurrentFixedDepositState(0);
        handleFixedDepositUIUpdate();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentFixedDepositState, current]);

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

  useEffect(() => {
    if (current === 'Pay or Transfer' && currentPaymentState === 1) {
      setOtp({
        otp: '',
      });
      setFormPaymentDataErrors({});
    }
  }, [current, currentPaymentState]);

  useEffect(() => {
    if (current === 'Auto Pay' && currentAutoPayState === 1) {
      setFormAutoPay({
        recipientName: '',
        recipientAccountNumber: '',
        endDate: '',
        paymentFrequency: '',
        amount: '',
      });
      setFormPaymentDataErrors({});
    }
  }, [current, currentAutoPayState]);

  useEffect(() => {
    if (current === 'Fixed Deposit' && currentFixedDepositState === 1) {
      setFormFixedDeposit({
        depositAmount: '',
        depositDuration: '',
        interestRate: '',
      });
    }
  }, [currentFixedDepositState, current]);

  useEffect(() => {
    if (current === 'Fixed Deposit' && currentFixedDepositState === 2) {
      setfdPassword('');
    }
  }, [currentFixedDepositState, current]);

  const fetchUserInfo = async () => {
    setLoading(true);

    try {
      const response = await axios.get(API_ENDPOINTS.ACCOUNT_INFO, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      const parsedData =
        typeof response.data === 'string'
          ? JSON.parse(response.data)
          : response.data;

      setUserData(parsedData);
    } catch (error) {
      console.error('Error fetching user information:', error);
      alert('Failed to fetch user information.');
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

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

  const [formFixedDeposit, setFormFixedDeposit] = useState({
    amount: '',
    duration: '',
    interestRate: '',
  });

  const [formFixedDepositErrors, setFormFixedDepositErrors] = useState({});

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

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';

      // Perform the logout request
      axios
        .get(API_ENDPOINTS.LOGOUT, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        })
        .then((response) => {
          if (response.status === 201) {
            console.log('Logout successful before unload.');
          } else {
            console.error(
              'Logout failed before unload with status:',
              response.status
            );
          }
        })
        .catch((error) => {
          console.error('Error during logout before unload:', error);
        });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // useEffect(() => {
  //   const handleBeforeUnload = async (event) => {
  //     event.preventDefault();
  //     event.returnValue = '';
  //     try {
  //       await axios.get(API_ENDPOINTS.LOGOUT, {
  //         headers: { 'Content-Type': 'application/json' },
  //         withCredentials: true,
  //       });
  //     } catch (error) {
  //       console.error('Failed to logout:', error);
  //     }
  //   };
  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle Auto Pay form
    if (current === 'Auto Pay' && currentAutoPayState === 1) {
      setFormAutoPay({
        ...formAutoPay,
        [name]: value,
      });

      setFormAutoPayErrors({
        ...formAutoPayErrors,
        [name]: '', // Clear error when user is typing
      });
    }

    // Handle Fixed Deposit form
    if (current === 'Fixed Deposit' && currentFixedDepositState === 1) {
      setFormFixedDeposit((prev) => ({
        ...prev,
        [name]: value,
        ...(name === 'depositDuration' && {
          interestRate:
            {
              6: 4.5,
              1: 5.0,
              3: 5.5,
              5: 6.0,
            }[value] || '',
        }),
      }));

      // Only validate when explicitly triggered, not while user is typing
      setFormFixedDepositErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '', // Clear error when user is typing
      }));
    }

    // Handle Pay or Transfer form
    if (current === 'Pay or Transfer' && currentPaymentState === 0) {
      setFormPaymentData({
        ...formPaymentData,
        [name]: value,
      });
      setFormPaymentDataErrors({
        ...formPaymentDataErrors,
        [name]: '', // Clear error when user is typing
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

    // Pay or Transfer: Initial State Validation
    if (current === 'Pay or Transfer' && currentPaymentState === 0) {
      if (!formPaymentData.recipientName)
        errors.recipientName = 'Recipient Name is Required.';
      if (!formPaymentData.recipientAccountNumber)
        errors.recipientAccountNumber = 'Account Number is Required.';
      if (!formPaymentData.amount) errors.amount = 'Amount is Required.';
      setFormPaymentDataErrors(errors);
      return Object.keys(errors).length === 0;
    }

    // Pay or Transfer: OTP Validation
    if (current === 'Pay or Transfer' && currentPaymentState === 1) {
      if (!formPaymentData.otp) errors.otp = 'OTP is Required.';
      setFormPaymentDataErrors(errors);
      return Object.keys(errors).length === 0;
    }

    // Auto Pay: Form Fields Validation
    if (current === 'Auto Pay' && currentAutoPayState === 1) {
      let validAutoPayDate = new Date();
      validAutoPayDate.setDate(validAutoPayDate.getDate() + 7);

      if (!formAutoPay.recipientName)
        errors.autoPayRecipientName = 'Recipient Name is Required.';
      if (!formAutoPay.recipientAccountNumber)
        errors.autoPayRecipientAccountNumber = 'Account Number is Required.';
      if (!formAutoPay.endDate) {
        errors.autoPayEndDate = 'End Date is Required.';
      } else {
        const enteredEndDate = new Date(formAutoPay.endDate); // Parse the entered endDate
        if (enteredEndDate <= validAutoPayDate) {
          errors.autoPayEndDate = `End Date must be at least 7 days from today .i.e. ${formatDate(
            today
          )}`;
        }
      }
      if (!formAutoPay.paymentFrequency)
        errors.autoPayPaymentFrequency = 'Payment Frequency is Required.';
      if (!formAutoPay.amount) errors.autoPayAmount = 'Amount is Required.';
      setFormAutoPayErrors(errors);
      return Object.keys(errors).length === 0;
    }

    // Auto Pay: Password Validation
    if (current === 'Auto Pay' && currentAutoPayState === 2) {
      if (!password) errors.password = 'Password is Required.';
      setFormAutoPayErrors(errors);
      return Object.keys(errors).length === 0;
    }

    // Fixed Deposit: Form Validation
    if (current === 'Fixed Deposit' && currentFixedDepositState === 1) {
      if (!formFixedDeposit.depositAmount)
        errors.depositAmount = 'Deposit Amount is Required.';
      if (formFixedDeposit.depositDuration === 'Duration')
        errors.depositDuration = 'Deposit Duration is Required.';
      if (!formFixedDeposit.interestRate)
        errors.interestRate = 'Interest Rate is Required.';
      setFormFixedDepositErrors(errors);
      return Object.keys(errors).length === 0;
    }

    // Fixed Deposit: Password Validation
    if (current === 'Fixed Deposit' && currentFixedDepositState === 2) {
      if (!fdpassword) errors.fdpassword = 'Password is Required.';
      setFormFixedDepositErrors(errors);
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
      const response = await axios.post(API_ENDPOINTS.PAY, urlEncodedData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        withCredentials: true,
      });
      console.log(response.data); // Log response data for debugging

      if (response.data.data === 2) {
        try {
          // Second API Call
          const secondaryResponse = await axios.get(API_ENDPOINTS.OTP, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          });

          if (secondaryResponse.data?.exists === true) {
            setBasicLoading(false);
            setCurrentPaymentState((cur) => cur + 1);
          } else {
            setBasicLoading(false);
            alert(secondaryResponse.data.message);
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
        setBasicLoading(false);
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
      errors.recipientAccountNumber = 'Please provide a valid account number ';
    } else if (data === 1) {
      errors.recipientName = 'Account Number & Recipient Name does not match.';
    }
    setFormPaymentDataErrors(errors);
  };

  const handleAccountDelete = async () => {
    if (current === 'Account Info' && !password) {
      alert('Please enter your password to confirm deletion.');
      return;
    }
    setBasicLoading(true);

    const urlEncodedData = new URLSearchParams();
    urlEncodedData.append('password', password); // Assuming `password` is your variable holding the password input

    try {
      const response = await axios.post(
        API_ENDPOINTS.DELETE_ACCOUNT, // Replace with the actual endpoint
        urlEncodedData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        }
      );

      const responseData = response.data?.data;

      if (responseData === 0) {
        setBasicLoading(false);
        alert('Wrong Password. Please try again.');
      } else if (responseData === 1) {
        setBasicLoading(false);
        alert(
          'AutoPay is associated with your account. Please delete it before proceeding.'
        );
      } else if (responseData === 2) {
        setBasicLoading(false);
        alert(
          'A Fixed Deposit is associated with your account. Please delete it before proceeding.'
        );
      } else if (responseData === 3 && response.status === 201) {
        setBasicLoading(false);
        setForfeitedAmount(response.data.amount || 0);
        setIsPasswordModalVisible(false);
        setIsAmountModalVisible(true);

        // Navigate to /login after 2-3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      setBasicLoading(false);
      console.error('Error during account deletion:', error);
      alert(
        'An error occurred while processing your request. Please try again.'
      );
    }
  };

  const handleOtpSubmit = async () => {
    setBasicLoading(true);

    const urlEncodedData = new URLSearchParams();
    urlEncodedData.append('otp', otp);

    try {
      const response = await axios.post(
        API_ENDPOINTS.TRANSACTION,
        urlEncodedData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        }
      );

      if (response.data?.data === 2 || response.status === 201) {
        setBasicLoading(false);
        setCurrentPaymentState((cur) => cur + 1);
      } else if (response.data?.data === 0) {
        setBasicLoading(false);
        alert('Wrong Otp ,Transaction Failed!');
        setCurrentPaymentState(0);
      } else if (response.data?.data === 1) {
        setBasicLoading(false);
        alert('Insufficient balance');
        setCurrentPaymentState(0);
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
      const sessionResponse = await axios.get(API_ENDPOINTS.HOME, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

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
      setTimeout(() => {
        setLoading(false); // Hide the loader after the delay
      }, 1000);
    }
  };

  const handleTransactionUIUpdate = async () => {
    setLoading(true);
    try {
      const sessionResponse = await axios.get(API_ENDPOINTS.TRANSACTION_LIST, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      let parsedData;
      if (typeof sessionResponse.data === 'string') {
        parsedData = JSON.parse(sessionResponse.data); // Parse if string
      } else {
        parsedData = sessionResponse.data; // Use directly if object
      }
      console.log(parsedData);

      setSessionTransactionDetails(parsedData); // Update session details
    } catch (error) {
      console.error('Error fetching session details:', error);
      alert('Failed to fetch session details. Please try again.');
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleAutoPayUIUpdate = async () => {
    setLoading(true); // Show the loader immediately

    try {
      const sessionResponse = await axios.get(API_ENDPOINTS.AUTOPAY_LIST, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      let parsedData;
      if (typeof sessionResponse.data === 'string') {
        parsedData = JSON.parse(sessionResponse.data); // Parse if string
      } else {
        parsedData = sessionResponse.data; // Use directly if object
      }

      setSessionAutoPayDetails(parsedData); // Update session details
    } catch (error) {
      console.error('Error fetching session details:', error);
      alert('Failed to fetch session details. Please try again.');
    } finally {
      // Add a delay to ensure the loader stays visible for 2-3 seconds
      setTimeout(() => {
        setLoading(false); // Hide the loader after the delay
      }, 1000); // Delay of 2 seconds
    }
  };

  const handleFixedDepositUIUpdate = async () => {
    setLoading(true); // Show the loader immediately

    try {
      const sessionResponse = await axios.get(API_ENDPOINTS.EXISTING_FD, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      let parsedData;
      if (typeof sessionResponse.data === 'string') {
        parsedData = JSON.parse(sessionResponse.data); // Parse if string
      } else {
        parsedData = sessionResponse.data; // Use directly if object
      }

      setSessionFixedDepositDetails(parsedData); // Update session details
    } catch (error) {
      console.error('Error fetching session details:', error);
      alert('Failed to fetch session details. Please try again.');
    } finally {
      // Add a delay to ensure the loader stays visible for 2-3 seconds
      setTimeout(() => {
        setLoading(false); // Hide the loader after the delay
      }, 1000); // Delay of 2 seconds
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
      const response = await axios.post(API_ENDPOINTS.AUTOPAY, urlEncodedData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        withCredentials: true,
      });

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
        setCurrentAutoPayState(2); // Move to next state
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
        API_ENDPOINTS.AUTO_PWD,
        urlEncodedData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        }
      );

      if (response.data?.data === 0) {
        setFormAutoPayErrors((prevErrors) => ({
          ...prevErrors,
          password: 'Wrong Password.',
        }));
      }
      if (response.data?.data === 1) {
        setCurrentAutoPayState(3);
        alert(
          'Auto-pay setup was successful, but the transaction could not be completed due to insufficient balance.'
        );
      } else if (response.data?.data === 2) {
        setCurrentAutoPayState(3);
      }
    } catch (error) {
      console.error('Error during sending payment:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setBasicLoading(false);
    }
  };

  // Logout handler
  const handleLogout = useCallback(() => {
    axios
      .get(API_ENDPOINTS.LOGOUT, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 201) {
          navigate('/login'); // Redirect to login on successful logout
        } else {
          console.error('Logout failed with status:', response.status);
          alert('Logout failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error during logout:', error);
        alert('An error occurred. Please try again.');
      });
  }, [navigate]);

  // Handle back button navigation
  useEffect(() => {
    const handlePopState = () => {
      const userConfirmed = window.confirm(
        'Are you sure you want to leave this page?'
      );
      if (!userConfirmed) {
        // Prevent navigation
        window.history.pushState(null, '', window.location.href);
      } else {
        handleLogout(); // Log out if the user confirms
      }
    };

    // Push initial state into history stack
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handleLogout]);

  const handleLogoutButtonClick = () => {
    const userConfirmed = window.confirm('Are you sure you want to log out?');
    if (userConfirmed) handleLogout();
  };

  const handleFdDelete = async (transaction) => {
    setIsLoading((prevLoadingState) => ({
      ...prevLoadingState,
      [transaction.fd_Id]: true, // Use the unique ID
    }));
    console.log(transaction.fd_Id);
    const urlEncodedData = new URLSearchParams();
    urlEncodedData.append('fd_Id', transaction.fd_Id);
    try {
      const response = await axios.post(API_ENDPOINTS.DROP_FD, urlEncodedData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        withCredentials: true,
      });

      if (response.data.data === 1 || response.status === 201) {
        alert('FD deleted successfully');
        handleFixedDepositUIUpdate();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting FD:', error);
      alert('Failed to delete Fixed Deposit. Please try again.');
    } finally {
      setIsLoading((prevLoadingState) => ({
        ...prevLoadingState,
        [transaction.fd_Id]: false, // Reset the loading state for the specific button
      }));
    }
  };

  const handleAutoPayDelete = async (transaction) => {
    setIsLoading((prevLoadingState) => ({
      ...prevLoadingState,
      [transaction.autopay_Id]: true,
    }));
    console.log(transaction.autopay_Id);
    const urlEncodedData = new URLSearchParams();
    urlEncodedData.append('autopay_Id', transaction.autopay_Id);
    try {
      const response = await axios.post(
        API_ENDPOINTS.DROP_AUTOPAY,
        urlEncodedData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        }
      );

      if (response.data.data === 1 || response.status === 201) {
        alert('Auto Pay Deleted successfully');
        handleAutoPayUIUpdate();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting Auto Pay:', error);
      alert('Failed to delete Auto Pay. Please try again.');
    } finally {
      setIsLoading((prevLoadingState) => ({
        ...prevLoadingState,
        [transaction.autopay_Id]: false,
      }));
    }
  };

  const handleOpenFixedDeposit = async () => {
    if (!validatePayment()) {
      return;
    }
    setBasicLoading(true);

    const urlEncodedData = new URLSearchParams();
    for (const key in formFixedDeposit) {
      if (Object.prototype.hasOwnProperty.call(formFixedDeposit, key)) {
        urlEncodedData.append(key, formFixedDeposit[key]);
      }
    }
    const today = new Date();
    const formattedDate = formatDateSend(today);
    urlEncodedData.append('fixedDepositDate', formattedDate);

    try {
      const response = await axios.post(API_ENDPOINTS.FD, urlEncodedData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        withCredentials: true,
      });
      if (response.data?.data === 0) {
        alert('Insufficient balance to create FD');
      } else if (response.data?.data === 1) {
        setCurrentFixedDepositState(2);
      }
    } catch (error) {
      console.error('Error during setting auto-pay:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setBasicLoading(false);
    }
  };

  const handleFixedDepositPassword = async () => {
    if (!validatePayment()) return;

    setBasicLoading(true);
    const urlEncodedData = new URLSearchParams();
    urlEncodedData.append('fdpassword', fdpassword);

    try {
      const response = await axios.post(API_ENDPOINTS.FD_PWD, urlEncodedData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        withCredentials: true,
      });

      if (response.data?.data === 0) {
        setFormFixedDepositErrors((prevErrors) => ({
          ...prevErrors,
          fdpassword: 'Wrong Password.',
        }));
      }
      if (response.data?.data === 1 || response.status === 201) {
        setCurrentFixedDepositState(3);
      }
    } catch (error) {
      console.error('Error during Creating FD:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setBasicLoading(false);
    }
  };

  if (!SessionAccountDetails) {
    return (
      <>
        <section className='bg-white dark:bg-gray-900'>
          <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
            <div className='mx-auto max-w-screen-sm text-center'>
              <h1 className='mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500'>
                Session Expired
              </h1>
              <p className='mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white'>
                Your login session has expired.
              </p>
              <p className='mb-4 text-lg font-light text-gray-500 dark:text-gray-400'>
                Please log in again to access your account.
              </p>
              <button
                onClick={() => {
                  navigate('/login');
                }}
                className='inline-flex text-white bg-[#0D427C] my-4 py-3 px-4 rounded-full font-SF_PRO_Light'
              >
                Go to Login
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <div className='flex overflow-hidden'>
      <div className='max-w-2xl mx-auto'>
        {/* Password Confirmation Modal */}
        {loading && <LoadingOverlayDashboard />}
        <>
          {isPasswordModalVisible && (
            <div
              className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'
              aria-hidden='true'
            >
              <div className='bg-white rounded-lg shadow-lg w-full max-w-md p-6 dark:bg-gray-700'>
                <div className='flex items-start justify-between mb-4'>
                  <h3 className='text-xl font-semibold text-gray-900 dark:text-white font-outfit'>
                    Confirm Account Deletion
                  </h3>
                  <button
                    className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                    onClick={() => {
                      setIsPasswordModalVisible(false);
                      setPassword('');
                    }}
                  >
                    <svg
                      className='w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </button>
                </div>
                <p className='text-gray-500 dark:text-gray-400 font-outfit mb-8'>
                  Enter your password to confirm the deletion of your account.
                  Your remaining balance will be forfeited and cannot be
                  accessed again.
                </p>
                <input
                  type='password'
                  className='w-full p-2  border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white mb-20'
                  placeholder='Enter your password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className='flex justify-end space-x-2'>
                  <button
                    className='px-4 py-2 bg-gray-300 rounded-full font-outfit hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
                    onClick={() => {
                      setIsPasswordModalVisible(false);
                      setPassword('');
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className='px-4 py-2 bg-[#D96B6E] hover:bg-[#D13639] text-white font-outfit rounded-full '
                    onClick={handleAccountDelete}
                  >
                    Confirm Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </>

        {/* Amount Confirmation Modal */}
        {isAmountModalVisible && (
          <div
            className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 font-outfit '
            aria-hidden='true'
          >
            <div className='bg-white rounded-lg shadow-lg w-full max-w-md p-6 dark:bg-gray-700'>
              <div className='flex items-start justify-between mb-4'>
                <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                  Account Deleted
                </h3>
              </div>
              <p className='text-gray-500 dark:text-gray-400 mb-4'>
                Your account has been successfully deleted. The forfeited amount
                is <strong>{formatCurrency(forfeitedAmount)}</strong>. You
                cannot access it again.
              </p>
              <p className='text-gray-500 dark:text-gray-400'>
                Redirecting you to the login page...
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Sidebar */}
      <aside className='w-[280px] h-screen bg-[#163172]'>
        <div className='w-full h-full flex flex-col justify-center items-center'>
          {/* Logo Section */}
          <div className='h-[20%] w-full flex justify-start pl-8 items-center '>
            <img src={DashnameAndLogo} alt='Logo' className='w-[185px]' />
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
                <img src={DashhomeVector} alt='Home' />
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
                <img src={DashpayVector} alt='Pay or Transfer' />
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
                  setCurrentAutoPayState(0); // Update state
                  setFormAutoPayErrors({});
                  handleAutoPayUIUpdate();
                }}
              >
                <img src={DashautoPay} alt='Auto Pay' />
                <span className='font-outfit font-light text-[18px] text-white'>
                  Auto Pay
                </span>
              </li>

              {/* Fixed Deposit */}
              <li
                className={`h-[40px] w-full flex items-center gap-2 cursor-pointer rounded-[10px] pl-3 ${
                  current === 'Fixed Deposit'
                    ? 'bg-[#FAFAFA] bg-opacity-15'
                    : ''
                }`}
                onClick={() => {
                  setCurrent('Fixed Deposit');
                  setCurrentFixedDepositState(0); // Update state
                  setFormFixedDepositErrors({});
                  handleFixedDepositUIUpdate();
                }}
              >
                <img src={DashfixedDeposit} alt='Fixed Deposit' />
                <span className='font-outfit font-light text-[18px] text-white'>
                  Fixed Deposit
                </span>
              </li>

              {/* Tranactions */}
              <li
                className={`h-[40px] w-full flex items-center gap-2 cursor-pointer rounded-[10px] pl-3 ${
                  current === 'Transactions' ? 'bg-[#FAFAFA] bg-opacity-15' : ''
                }`}
                onClick={() => {
                  setCurrent('Transactions');
                  handleTransactionUIUpdate(); // Update state
                }}
              >
                <img src={Dashtransaction} alt='Auto Pay' />
                <span className='font-outfit font-light text-[18px] text-white'>
                  Transactions
                </span>
              </li>

              {/* Account Info */}
              <li
                className={`h-[40px] w-full flex items-center gap-2 cursor-pointer rounded-[10px] pl-3 ${
                  current === 'Account Info' ? 'bg-[#FAFAFA] bg-opacity-15' : ''
                }`}
                onClick={() => {
                  setCurrent('Account Info');
                  fetchUserInfo();
                }}
              >
                <img src={DashaccountInfo} alt='Pay or Transfer' />
                <span className='font-outfit font-light text-[18px] text-white'>
                  Account Info
                </span>
              </li>

              {/* Log Out */}
              <li
                className={`h-[40px] w-full flex items-center gap-2 cursor-pointer rounded-[10px] pl-3 ${
                  current === 'Log Out' ? 'bg-[#FAFAFA] bg-opacity-15' : ''
                }`}
                onClick={() => {
                  handleLogoutButtonClick();
                }}
              >
                <img src={DashlogOut} alt='LogOut' />
                <span className='font-outfit font-light text-[18px] text-white'>
                  Log Out
                </span>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Section */}
      <main className='flex-1 h-screen bg-[#F8F9FA] '>
        <header className=' h-[60px] w-full border-b-2 py-6 px-6 flex justify-end items-center cursor-pointer'>
          <h1
            className='font-outfit'
            onClick={() => {
              setCurrent('Account Info');
              fetchUserInfo();
            }}
          >
            {SessionAccountDetails.accountOwnerName}
          </h1>
        </header>
        <div className='h-[600px] w-full px-24 pt-8 overflow-y-scroll overflow-x-hidden'>
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
                        src={balanceVisible ? DasheyeOen : DasheyeClose}
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
                    <button
                      className='font-outfit bg-[#363636] rounded-[10px] font-light gap-1.5 text-white flex justify-center items-center py-2 px-4'
                      onClick={() => setCurrent('Pay or Transfer')}
                    >
                      <img src={DashpayVector} alt='Pay or Transfer' />
                      Pay or Transfer
                    </button>
                    <button
                      className='font-outfit bg-[#EBEAFF] rounded-[10px] font-light gap-1.5 text-[#5C58FF] flex justify-center items-center py-2 px-4'
                      onClick={() => {
                        setCurrent('Auto Pay');
                        setCurrentAutoPayState(0); // Update state
                        setFormAutoPayErrors({});
                        handleAutoPayUIUpdate();
                      }}
                    >
                      Auto Pay
                    </button>
                  </div>
                </div>

                {/*Recent Transaction Section*/}
                <div className='h-[75%] w-full flex flex-col justify-center items-center rounded-[10px] border-[1.5px] border-[#EBEBEB]'>
                  <div className='h-[20%] w-full flex justify-between items-center px-3'>
                    <p className='font-outfit font-medium text-[20px]'>
                      Recent transactions
                    </p>
                    <button
                      className='font-outfit text-black rounded-[10px] font-light border-[1.5px] border-[#C9C9C9] py-1 px-2 text-[16px]'
                      onClick={() => {
                        setCurrent('Transactions');
                        handleTransactionUIUpdate();
                      }}
                    >
                      View all
                    </button>
                  </div>
                  <div className='h-[80%] w-full px-14 overflow-y-auto'>
                    {SessionAccountDetails.recentTransactions.length > 0 ? (
                      SessionAccountDetails.recentTransactions
                        .slice()
                        .map((transaction, index) => (
                          <div
                            key={index}
                            className='h-[60px] w-full flex justify-center items-center mb-2 border-b-2 border-gray-300'
                          >
                            {/*Name*/}
                            <div className='h-full w-[70%] font-outfit flex justify-between items-start'>
                              <section className='flex flex-col justify-center items-start'>
                                <div className='text-[18px]'>
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
                            <div className='h-full w-[15%] font-outfit flex justify-center items-center'>
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
                            <div className='h-full w-[15%] flex justify-center items-center'>
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
                        ))
                    ) : (
                      <div className='text-center text-gray-500 text-[16px] font-outfit mt-5'>
                        No transactions available
                      </div>
                    )}
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
                        src={Dashcheck}
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
                          onClick={() => {
                            setCurrentAutoPayState(1);
                            setFormAutoPayErrors({});
                          }}
                        >
                          <img src={DashaddImg} alt='Top Up' />
                          New
                        </button>
                      </div>

                      {/* Recent Transaction Section */}
                      <div className='h-[80%] w-full px-14 overflow-y-auto'>
                        {Array.isArray(SessionAutoPayDetails.existingAutopay) &&
                        SessionAutoPayDetails.existingAutopay.length > 0 ? (
                          SessionAutoPayDetails.existingAutopay
                            .filter(
                              (transaction) =>
                                transaction !== null &&
                                transaction !== undefined
                            ) // Ensure valid entries
                            .map((transaction, index) => (
                              <div
                                key={index}
                                className='h-[60px] w-full flex justify-center items-center mb-2 border-b-2 border-gray-300'
                              >
                                {/* Name and Dates */}
                                <div className='h-full w-[70%] font-outfit flex justify-between items-start'>
                                  <section className='flex flex-col justify-center items-start'>
                                    <div className='text-[18px]'>
                                      {transaction.name || 'Unknown'}
                                    </div>
                                    <div className='text-[12px] text-gray-500'>
                                      Start:{' '}
                                      {transaction.startDate
                                        ? formatDate(transaction.startDate)
                                        : 'N/A'}{' '}
                                      | End:{' '}
                                      {transaction.endDate
                                        ? formatDate(transaction.endDate)
                                        : 'N/A'}
                                    </div>
                                  </section>
                                  <section className='text-[16px] font-outfit flex justify-start items-center w-[100px] h-full mr-3'>
                                    {transaction.frequency || 'N/A'}
                                  </section>
                                </div>

                                {/* Amount */}
                                <div className='h-full w-[15%] flex justify-end items-center'>
                                  <p className='text-[#363636] font-outfit'>
                                    {transaction.amount
                                      ? formatCurrency(transaction.amount)
                                      : 'N/A'}
                                  </p>
                                </div>
                                <div className='h-full w-[15%] flex justify-end items-center'>
                                  <button
                                    className='bg-[#ff86828c] hover:bg-[#e2625d] duration-700 font-outfit px-2 py-1 rounded-md text-white'
                                    onClick={() =>
                                      handleAutoPayDelete(transaction)
                                    }
                                    disabled={isLoading[transaction.autopay_Id]}
                                  >
                                    {isLoading[transaction.autopay_Id] ? (
                                      <div className='spinnerLogin'></div>
                                    ) : (
                                      'Stop'
                                    )}
                                  </button>
                                </div>
                              </div>
                            ))
                        ) : (
                          <div className='text-gray-500 text-center mt-4'>
                            No active auto-pay.
                          </div>
                        )}
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
                        <img src={DashbackArrow} />
                      </button>
                      <h1 className='font-outfit font-bold text-2xl'>
                        Auto Pay
                      </h1>
                      <p className='font-outfit font-light text-lg text-gray-600'>
                        Set up recurring payments easily.
                      </p>
                    </div>

                    <form className='space-y-6 mt-8 pb-28' noValidate>
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
                          htmlFor='recipientAccountNumber'
                          className='block text-sm font-medium text-[#323232] font-outfit'
                        >
                          Account Number
                        </label>
                        <input
                          type='text'
                          id='recipientAccountNumber'
                          name='recipientAccountNumber'
                          value={formAutoPay.recipientAccountNumber}
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
                          htmlFor='endDate'
                          className='block text-sm font-medium text-[#323232] font-outfit'
                        >
                          End Date
                        </label>
                        <input
                          type='date'
                          id='endDate'
                          name='endDate'
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
                          <option value='weekly'>Weekly</option>
                          <option value='monthly'>Monthly</option>
                          <option value='quaterly'>Quaterly</option>
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
                        onClick={handleSetAutoPay}
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
                      <button
                        className='rounded-full border-[1px] border-gray-600 py-2 px-[6px]'
                        onClick={() => setCurrentAutoPayState(1)}
                      >
                        <img src={DashbackArrow} />
                      </button>
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
                        onClick={handleAutoPayPassword}
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
                      <img src={Dashcheck} className='w-24' />
                    </div>
                  </>
                )}
              </>
            </>
          )}

          {current === 'Transactions' && (
            <>
              {loading && <LoadingOverlayDashboard />}
              <div className='h-full w-full  flex flex-col justify-center items-center  gap-8'>
                <div className='h-[10%] w-full  flex justify-start items-center'>
                  <h1 className='font-outfit text-2xl'>Transactions</h1>
                </div>
                <div className='h-[80%] w-full px-14 overflow-y-auto rounded-[10px] border-[1px] border-gray-300 p-5'>
                  {SessionTransactionDetails.recentTransactions.length > 0 ? (
                    SessionTransactionDetails.recentTransactions
                      .slice()
                      .map((transaction, index) => (
                        <div
                          key={index}
                          className='h-[60px] w-full flex justify-center items-center mb-2 border-b-2 border-gray-300'
                        >
                          {/*Name*/}
                          <div className='h-full w-[70%] font-outfit flex justify-between items-start'>
                            <section className='flex flex-col justify-center items-start'>
                              <div className='text-[18px]'>
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
                          <div className='h-full w-[15%] font-outfit flex justify-center items-center'>
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
                          <div className='h-full w-[15%] flex justify-center items-center'>
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
                      ))
                  ) : (
                    <div className='text-center text-gray-500 text-[16px] font-outfit mt-5'>
                      No transactions available
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {current === 'Account Info' && (
            <>
              {loading && <LoadingOverlayDashboard />}
              <UserInformationDisplay userData={userData.accountInfo} />
              <div className='h-auto w-full flex justify-end items-start mb-20'>
                <button
                  className='block text-white bg-[#d13639] font-outfit rounded-full text-md px-5 py-2.5 text-center mr-8'
                  onClick={() => {
                    setIsPasswordModalVisible(true);
                    setPassword('');
                  }}
                >
                  Delete Account
                </button>
              </div>
            </>
          )}
          {current === 'Fixed Deposit' && (
            <>
              {loading && <LoadingOverlayDashboard />}
              <>
                {currentFixedDepositState === 0 && (
                  <>
                    <div className='h-full w-full  flex flex-col justify-center items-center  gap-8'>
                      {/*Auto Pay Top Section*/}
                      <div className='h-[10%] w-full  flex justify-start items-center'>
                        {/*CTA TO STATE 2*/}
                        <button
                          className='font-outfit bg-[#EBEAFF] rounded-[10px] font-light gap-1.5 text-[#5C58FF] flex justify-center items-center py-2 px-4'
                          onClick={() => {
                            setCurrentFixedDepositState(1);
                            setFormFixedDepositErrors({});
                            // setFormFixedDeposit({})
                          }}
                        >
                          <img src={DashaddImg} alt='Top Up' />
                          New
                        </button>
                      </div>

                      {/* Recent Transaction Section */}
                      <div className='h-[80%] w-full px-14 overflow-y-auto'>
                        {Array.isArray(SessionFixedDepositDetails.recentFD) &&
                        SessionFixedDepositDetails.recentFD.length > 0 ? (
                          SessionFixedDepositDetails.recentFD
                            .filter(
                              (transaction) =>
                                transaction !== null &&
                                transaction !== undefined
                            ) // Ensure valid entries
                            .map((transaction, index) => (
                              <div
                                key={index}
                                className='h-[60px] w-full flex justify-center items-center mb-2 border-b-2 border-gray-300'
                              >
                                {/* Name and Dates */}
                                <div className='h-full w-[70%] font-outfit flex justify-between items-start'>
                                  <section className='flex flex-col justify-center items-start'>
                                    <div className='text-[18px]'>
                                      {transaction.name || 'Unknown'}
                                    </div>
                                    <div className='text-[12px] text-gray-500'>
                                      End:{' '}
                                      {transaction.endDate
                                        ? formatDate(transaction.endDate)
                                        : 'N/A'}
                                    </div>
                                  </section>
                                  <section className='text-[16px] font-outfit flex justify-start items-center w-[100px] h-full mr-3'>
                                    {transaction.interestRate}% Interest
                                  </section>
                                </div>

                                {/* Amount */}
                                <div className='h-full w-[15%] flex justify-end items-center'>
                                  <p className='text-[#363636] font-outfit'>
                                    {transaction.amount
                                      ? formatCurrency(transaction.amount)
                                      : 'N/A'}
                                  </p>
                                </div>
                                <div className='h-full w-[15%] flex justify-end items-center'>
                                  <button
                                    className='bg-[#ff86828c] hover:bg-[#e2625d] duration-700 font-outfit px-2 py-1 rounded-md text-white'
                                    onClick={() => handleFdDelete(transaction)}
                                    disabled={isLoading[transaction.fd_Id]} // Disable this button while it's loading
                                  >
                                    {isLoading[transaction.fd_Id] ? (
                                      <div className='spinnerLogin'></div>
                                    ) : (
                                      'Stop'
                                    )}
                                  </button>
                                </div>
                              </div>
                            ))
                        ) : (
                          <div className='text-gray-500 text-center mt-4'>
                            No active Fixed Deposits.
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
                {currentFixedDepositState === 1 && (
                  <>
                    {basicLoading && <LoadingOverlay />}
                    <div>
                      <button
                        className='rounded-full border-[1px] border-gray-600 py-2 px-[6px]'
                        onClick={() => setCurrentFixedDepositState(0)}
                      >
                        <img src='src/assets/Images/back_arrow.png' />
                      </button>
                      <h1 className='font-outfit font-bold text-2xl'>
                        Fixed Deposit
                      </h1>
                      <p className='font-outfit font-light text-lg text-gray-600'>
                        Invest your savings and earn fixed returns.
                      </p>
                    </div>

                    <form className='space-y-6 mt-8' noValidate>
                      {/* Deposit Amount */}
                      <div className='space-y-2'>
                        <label
                          htmlFor='depositAmount'
                          className='block text-sm font-medium text-[#323232] font-outfit'
                        >
                          Deposit Amount
                        </label>
                        <input
                          type='number'
                          id='depositAmount'
                          name='depositAmount'
                          value={formFixedDeposit.depositAmount}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 ${
                            formFixedDepositErrors?.depositAmount
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                          aria-invalid={!!formFixedDepositErrors?.depositAmount}
                          aria-describedby='depositAmount-error'
                        />
                        {formFixedDepositErrors?.depositAmount && (
                          <p
                            id='depositAmount-error'
                            className='text-red-500 text-sm mt-1 animate-fade-in'
                            role='alert'
                          >
                            {formFixedDepositErrors.depositAmount}
                          </p>
                        )}
                      </div>

                      {/* Deposit Duration */}
                      <div className='space-y-2'>
                        <label
                          htmlFor='depositDuration'
                          className='block text-sm font-medium text-[#323232] font-outfit'
                        >
                          Deposit Duration
                        </label>
                        <select
                          id='depositDuration'
                          name='depositDuration'
                          value={formFixedDeposit.depositDuration}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 ${
                            formFixedDepositErrors?.depositDuration
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                        >
                          <option value='Duration'>Select Duration</option>
                          <option value='6'>6 Months</option>
                          <option value='1'>1 Year</option>
                          <option value='3'>3 Years</option>
                          <option value='5'>5 Years</option>
                        </select>
                        {formFixedDepositErrors?.depositDuration && (
                          <p
                            id='depositDuration-error'
                            className='text-red-500 text-sm mt-1 animate-fade-in'
                            role='alert'
                          >
                            {formFixedDepositErrors.depositDuration}
                          </p>
                        )}
                      </div>

                      {/* Interest Rate */}
                      <div className='space-y-2'>
                        <label
                          htmlFor='interestRate'
                          className='block text-sm font-medium text-[#323232] font-outfit'
                        >
                          Interest Rate (%)
                        </label>
                        <input
                          type='number'
                          id='interestRate'
                          name='interestRate'
                          value={formFixedDeposit.interestRate}
                          onChange={handleChange}
                          disabled
                          className='w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500'
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type='button'
                        className='w-full py-3 px-4 bg-[#323232] text-white rounded-lg shadow-md font-outfit font-light'
                        onClick={handleOpenFixedDeposit}
                      >
                        Open Fixed Deposit
                      </button>
                    </form>
                  </>
                )}
                {currentFixedDepositState === 2 && (
                  <>
                    {basicLoading && <LoadingOverlay />}
                    <div>
                      <button
                        className='rounded-full border-[1px] border-gray-600 py-2 px-[6px]'
                        onClick={() => setCurrentFixedDepositState(1)}
                      >
                        <img src={DashbackArrow} />
                      </button>
                      <h1 className='font-outfit font-bold text-2xl'>
                        Enter Account Password
                      </h1>
                      <p className='font-outfit font-light text-lg text-gray-600'>
                        To initiate Fixed Deposit, please enter your account
                        password.
                      </p>
                    </div>

                    <form className='space-y-6 mt-8' noValidate>
                      <div className='space-y-2'>
                        <label
                          htmlFor='fdpassword'
                          className='block text-sm font-medium text-[#323232] font-outfit'
                        >
                          Enter Password
                        </label>
                        <input
                          type='password'
                          id='fdpassword'
                          name='fdpassword'
                          value={fdpassword}
                          onChange={(e) => setfdPassword(e.target.value)}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 ${
                            formFixedDepositErrors.fdpassword
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                          aria-invalid={!!formFixedDepositErrors.fdpassword}
                          aria-describedby='otp-error'
                        />
                        {formFixedDepositErrors.fdpassword && (
                          <p
                            id='otp-error'
                            className='text-red-500 text-sm mt-1 animate-fade-in'
                            role='alert'
                          >
                            {formFixedDepositErrors.fdpassword}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={handleFixedDepositPassword}
                        type='button'
                        className='w-full py-3 px-4 bg-[#323232] text-white rounded-lg shadow-md font-outfit font-light'
                      >
                        Verify
                      </button>
                    </form>
                  </>
                )}
                {currentFixedDepositState === 3 && (
                  <>
                    <div className='w-full h-full flex justify-center items-center flex-col gap-10'>
                      <h1 className='font-outfit text-3xl text-green-600'>
                        Fixed Deposit Created Successfull
                      </h1>
                      <img src={Dashcheck} className='w-24' />
                    </div>
                  </>
                )}
              </>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
