const UserInformationDisplay = ({ userData }) => {
  if (!userData) {
    return (
      <div className='font-outfit text-gray-600'>
        No user information available.
      </div>
    );
  }

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
            <div className='space-y-4'>
              <div className='flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
                <div>
                  <p className='text-sm text-gray-500'>Account Type</p>
                  <p className='text-md font-medium text-gray-800'>
                    {userData.accountType}
                  </p>
                </div>
              </div>

              {/* Occupation */}
              <div className='flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
                <div>
                  <p className='text-sm text-gray-500'>Occupation</p>
                  <p className='text-md font-medium text-gray-800'>
                    {userData.occupation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInformationDisplay;
