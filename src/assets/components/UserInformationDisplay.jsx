// import {
//   FiMail,
//   FiPhone,
//   FiUser,
//   FiHash,
//   FiCalendar,
//   FiMapPin,
// } from 'react-icons/fi';

const UserInformationDisplay = () => {
  // Dummy user data
  const userData = {
    fullName: 'Jonathan Anderson',
    username: 'jon_anderson',
    accountNumber: '2023456789',
    age: '32',
    email: 'jonathan.anderson@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Financial District, New York, NY 10004',
    additionalInfo: [
      { title: 'Account Type', value: 'Premium Savings' },
      { title: 'Nominee Name', value: 'Sarah Anderson' },
      { title: 'Occupation', value: 'Software Engineer' },
    ],
  };

  return (
    <div className='min-h-screen bg-gray-50 p-4 md:p-8 font-outfit' role='main'>
      <div className='max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden'>
        <div className='p-6 md:p-8'>
          {/* Header */}
          <h1 className='text-2xl font-bold text-gray-800 mb-6' role='heading'>
            User Information
          </h1>

          {/* User Info Section */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-4'>
              {/* Full Name */}
              <div
                className='flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200'
                role='group'
                aria-label='Basic Information'
              >
                <div>
                  <p className='text-sm text-gray-500'>Full Name</p>
                  <p className='text-md font-medium text-gray-800'>
                    {userData.fullName}
                  </p>
                </div>
              </div>

              {/* Username */}
              <div className='flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
                <div>
                  <p className='text-sm text-gray-500'>Username</p>
                  <p className='text-md font-medium text-gray-800'>
                    {userData.username}
                  </p>
                </div>
              </div>

              {/* Account Number */}
              <div className='flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
                <div>
                  <p className='text-sm text-gray-500'>Account Number</p>
                  <p className='text-md font-medium text-gray-800'>
                    {userData.accountNumber}
                  </p>
                </div>
              </div>

              {/* Age */}
              <div className='flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
                <div>
                  <p className='text-sm text-gray-500'>Age</p>
                  <p className='text-md font-medium text-gray-800'>
                    {userData.age}
                  </p>
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              {/* Email */}
              <div className='flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
                <div>
                  <p className='text-sm text-gray-500'>Email</p>
                  <p className='text-md font-medium text-gray-800'>
                    {userData.email}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className='flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
                <div>
                  <p className='text-sm text-gray-500'>Phone</p>
                  <p className='text-md font-medium text-gray-800'>
                    {userData.phone}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className='flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
                <div>
                  <p className='text-sm text-gray-500'>Address</p>
                  <p className='text-md font-medium text-gray-800'>
                    {userData.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details Section */}
          <div className='mt-8'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4'>
              Additional Details
            </h2>
            <div className='max-h-60 overflow-y-auto pr-4 space-y-4'>
              {userData.additionalInfo.map((info, index) => (
                <div
                  key={index}
                  className='p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200'
                  role='group'
                  aria-label={info.title}
                >
                  <p className='text-sm text-gray-500'>{info.title}</p>
                  <p className='text-md font-medium text-gray-800'>
                    {info.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInformationDisplay;
