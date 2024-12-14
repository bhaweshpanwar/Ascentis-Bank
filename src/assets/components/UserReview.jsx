const UserReview = () => {
  const reviews = [
    {
      name: 'Rajesh Singh',
      review: 'Excellent service and support. Highly recommended!',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Vikram Sharma',
      review: 'Incredible customer service and great products. Very satisfied!',
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    {
      name: 'Priya Rao',
      review: 'They truly care about their customers. Exceptional experience.',
      image: 'https://randomuser.me/api/portraits/women/50.jpg',
    },
    {
      name: 'Suresh Mehta',
      review: 'Quick and reliable services every time. Never disappointed!',
      image: 'https://randomuser.me/api/portraits/men/15.jpg',
    },
    {
      name: 'Neha Gupta',
      review:
        'Fantastic products and top-notch support. Will recommend to all.',
      image: 'https://randomuser.me/api/portraits/women/36.jpg',
    },
    {
      name: 'Anil Kumar',
      review: "Professional and efficient. Couldn't ask for more.",
      image: 'https://randomuser.me/api/portraits/men/65.jpg',
    },
    {
      name: 'Sanya Joshi',
      review: 'Their attention to detail and customer care is outstanding.',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
      name: 'Mukesh Yadav',
      review: 'Truly exceptional service. Exceeded my expectations.',
      image: 'https://randomuser.me/api/portraits/men/76.jpg',
    },
    {
      name: 'Ritika Desai',
      review: "The best experience I've had with any company in a long time.",
      image: 'https://randomuser.me/api/portraits/women/20.jpg',
    },
  ];

  return (
    <>
      <section id='testimonies' className='py-20'>
        <div className='w-full max-w-screen-2xl m-auto px-6'>
          <div className='transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100'>
            <div className='mb-12 space-y-5 md:mb-16 md:text-center'>
              <div className='inline-block px-3 py-1 text-sm font-semibold text-indigo-200 rounded-lg md:text-center text-cn '>
                Words from Others
              </div>
              <h1
                className='mb-5 text-[48px] text-black font-SF_Pro_Regular'
                // style={{
                //     background:
                //         'var(--Brand-Gradient, linear-gradient(270deg, #8CB9BD 0%, #163172 100%))',
                //     backgroundClip: 'text',
                //     webkitBackgroundClip: 'text',
                //     webkitTextFillColor: 'transparent',
                // }}
              >
                It&apos;s not just us.
              </h1>
              <p className='text-xl text-gray-400 md:text-center md:text-2xl font-SF_PRO_Light'>
                Here&apos;s what others have to say about us.
              </p>
            </div>
          </div>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8'>
            {reviews.map((review, index) => (
              <div key={index} className='text-sm leading-6'>
                <div className='relative'>
                  <div className='relative p-6 space-y-6 leading-none rounded-[20px] bg-black bg-opacity-0  hover:scale-105 transition-all  shadow-md'>
                    <div className='flex items-center space-x-4'>
                      <img
                        src={review.image}
                        className='w-12 h-12 bg-center bg-cover border rounded-full'
                        alt={review.name}
                      />
                      <div>
                        <h3 className='text-lg font-SF_Pro_Regular text-black'>
                          {review.name}
                        </h3>
                      </div>
                    </div>
                    <p className='leading-normal font-SF_PRO_Light text-gray-700 text-[18px]'>
                      {review.review}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default UserReview;
