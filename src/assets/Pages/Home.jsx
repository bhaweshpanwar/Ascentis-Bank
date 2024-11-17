import {useNavigate} from 'react-router-dom';
import Header from '../components/Header';
import {useState, useEffect, useRef} from 'react';

const Home = () => {
    const [activeButton, setActiveButton] = useState('Platinum');
    const testimonials = [
        {
            id: 1,
            img: '/src/assets/Images/Why Ascentis/2.png',
            header: 'Trusted by 50,000+ Customers',
            paragraph:
                'Over the years, we’ve built a community of satisfied customers who rely on us for their financial needs. Our customers trust us not only for our reliable services but for the personalized attention we offer at every step. From small savings accounts to large business loans, our team is dedicated to helping each customer succeed. Join thousands of happy customers who have experienced the difference with Ascentis Bank.',
        },
        {
            id: 2,
            img: '/src/assets/Images/Why Ascentis/4.png',
            header: 'Customizable Banking Solutions',
            paragraph:
                'We understand that no two customers are the same, and neither are their financial needs. That’s why we offer a range of customizable banking solutions that can be tailored to fit your personal and business goals. Whether you’re saving for the future, investing in your business, or managing daily expenses, our flexible options ensure that you have the support you need at every stage. Discover how we can design a banking plan that’s perfect for you.',
        },
        {
            id: 3,
            img: '/src/assets/Images/Why Ascentis/3.png',
            header: 'Seamless Integration with Mobile Banking',
            paragraph:
                'At Ascentis Bank, we bring the future of banking right to your fingertips. Our mobile banking app integrates seamlessly with your accounts, allowing you to manage your finances anytime, anywhere. With features like real-time alerts, instant transfers, and personalized insights, we’ve made banking more convenient and secure than ever before. Explore the ease of mobile banking with us and take control of your financial future.',
        },
        {
            id: 4,
            img: '/src/assets/Images/Why Ascentis/5.png',
            header: 'Commitment to Security',
            paragraph:
                'The security and privacy of your financial data is our highest priority. At Ascentis Bank, we’ve implemented the latest encryption technologies and advanced fraud detection systems to ensure that your personal and business information is always protected. Whether you’re banking online or in person, you can trust that our systems are designed to keep your accounts safe. Your peace of mind is as important to us as your financial success.',
        },
    ];

    const cardTestimonial = [
        {
            id: 1,
            cardName: 'Platinum',
            cardImg: '/src/assets/Images/new_cards/platinum_card.png',
            cardInfo:
                'A premium card with luxury benefits tailored for our high-net-worth customers.',
        },
        {
            id: 2,
            cardName: 'Business',
            cardImg: '/src/assets/Images/new_cards/business_card.png',
            cardInfo:
                'A powerful financial tool crafted for business owners and professionals to manage expenses effectively.',
        },
        {
            id: 3,
            cardName: 'Student',
            cardImg: '/src/assets/Images/new_cards/student_card.png',
            cardInfo:
                'A starter card designed for students to build credit while enjoying practical perks.',
        },
        {
            id: 4,
            cardName: 'Reward',
            cardImg: '/src/assets/Images/new_cards/reward_card.png',
            cardInfo:
                'A versatile card focused on maximizing rewards for everyday purchases.',
        },
        {
            id: 5,
            cardName: 'Secured',
            cardImg: '/src/assets/Images/new_cards/secured_card.png',
            cardInfo:
                ' A credit-building solution for individuals with limited or no credit history, backed by a security deposit.',
        },
    ];

    const navigate = useNavigate();

    const activeButtonStyle = (ButtonName) => {
        return activeButton === ButtonName
            ? 'bg-white rounded-full text-black px-8 py-1'
            : '';
    };

    // Get the currently active card's details
    const activeCard = cardTestimonial.find(
        (card) => card.cardName === activeButton
    );

    const sliderRef = useRef(null);

    useEffect(() => {
        const slider = sliderRef.current;

        // Function to handle horizontal scrolling for both mouse wheel and touch events
        const handleScroll = (event) => {
            if (event.deltaY !== 0) {
                slider.scrollLeft += event.deltaY;
                event.preventDefault();
            }
        };

        // Function to handle touch events
        const handleTouchStart = (event) => {
            const touch = event.touches[0];
            slider.touchStartX = touch.clientX;
            slider.touchStartY = touch.clientY;
        };

        const handleTouchMove = (event) => {
            const touch = event.touches[0];
            const deltaX = slider.touchStartX - touch.clientX;
            const deltaY = slider.touchStartY - touch.clientY;

            slider.scrollLeft += deltaX;
            event.preventDefault();
        };

        if (slider) {
            slider.addEventListener('wheel', handleScroll);
            slider.addEventListener('touchstart', handleTouchStart);
            slider.addEventListener('touchmove', handleTouchMove);

            // Cleanup event listeners on component unmount
            return () => {
                slider.removeEventListener('wheel', handleScroll);
                slider.removeEventListener('touchstart', handleTouchStart);
                slider.removeEventListener('touchmove', handleTouchMove);
            };
        }
    }, []);


    return (
        <>

            {/* Section-01 */}
            <div className='h-[480px] w-full max-w-screen-2xl mx-auto  flex justify-center items-center '>
                <div
                    className='w-[95%] max-w-screen-lg mx-auto md:w-3/5 h-[300px] flex flex-col justify-center items-center'>
                    <div className='h-[143px] md:h-[150px] flex justify-center items-center'>
                        <h1 className='h-full text-center font-geologica text-[40px] md:text-[70px] font-light leading-none bg-gradient-to-r from-[#8CB9BD] to-[#163172] bg-clip-text text-transparent'>
                            Banking Redefined with Trust and Technology
                        </h1>
                    </div>

                    <div className='h-28 md:h-20 w-full flex flex-col md:flex-row px-6 md:px-24'>
                        <div className='flex-1 flex justify-center items-center'>
                            <p className='text-center text-[14px] md:text-[16px] font-SF_PRO_Light text-gray-600'>
                                Join millions of satisfied customers and take control of your
                                finances today with Ascentis Bank
                            </p>
                        </div>
                        <div className='flex justify-center items-center md:mt-0 md:w-48 h-full'>
                            <button
                                className='h-[50px] px-8 bg-[#0D427C] text-white rounded-full font-SF_PRO_Thin text-[16px] flex items-center justify-center cursor-pointer'
                                onClick={() => {
                                    navigate('/register');
                                }}
                            >
                                Get Started
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='30' // Increase the width
                                    height='30' // Increase the height
                                    fill='currentColor'
                                    className='bi bi-arrow-right-short cursor-pointer' // Add cursor-pointer to the SVG
                                    viewBox='0 0 16 16'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8'
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero Image */}
            <div className='h-[900px] w-full mx-auto overflow-hidden'>
                <img
                    src='\src\assets\Images\new.png'
                    alt='dashboard'
                    className='rounded-3xl w-full h-full object-cover absolute top-[450px] md:top-96
               md:scale-140 scale-120 object-[15%_0]'
                />
            </div>

            {/* Section-02 */}
            <div
                className='h-auto w-full max-w-screen-2xl mx-auto flex flex-col justify-center items-center relative overflow-hidden py-16 px-4 md:px-8'>
                <div className='text-center mb-16 mt-8 md:mt-20'>
                    <h1 className='text-[36px] text-left md:text-center ml-4 md:ml-0 md:text-[55px] font-SF_PRO_Thin text-[#787F7F] leading-tight'>
                        Helping You Find the{' '}
                        <span className='md:text-[55px] text-black font-SF_PRO_Thin'>
              Right Financial Solutions{' '}
            </span>{' '}
                        Customized for Your Goals.
                    </h1>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-6 md:mx-8 mb-16'>
                    <div className='rounded-lg overflow-hidden'>
                        <img
                            src='\src\assets\Images\Card01.png'
                            alt='card01'
                            className='w-full h-full object-cover'
                        />
                    </div>
                    <div className='rounded-lg overflow-hidden'>
                        <img
                            src='\src\assets\Images\Card02.png'
                            alt='card02'
                            className='w-full h-full object-cover'
                        />
                    </div>
                    <div className='rounded-lg overflow-hidden'>
                        <img
                            src='\src\assets\Images\Card03.png'
                            alt='card03'
                            className='w-full h-full object-cover'
                        />
                    </div>
                    <div className='rounded-lg overflow-hidden'>
                        <img
                            src='\src\assets\Images\Card04.png'
                            alt='card04'
                            className='w-full h-full object-cover'
                        />
                    </div>
                </div>
            </div>

            {/* Section-03 */}
            <div className='h-auto w-full max-w-screen-2xl mx-auto flex flex-col'>
                <div className='h-40 flex justify-center items-end mt-28'>
                    <h1 className='text-[#969D9D] text-[40px] md:text-[50px] font-SF_PRO_Light'>
                        Why <span className='text-[#163172]'>Ascentis</span>?
                    </h1>
                </div>

                {/* Horizontal Slider */}
                <div className='flex overflow-x-scroll ml-8 mb-28 space-x-2 select-none overscroll-none scrollbar-hide'
                     ref={sliderRef}> {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className='snap-center flex-none w-[90%]'>
                        <div
                            className='h-[480px] md:h-[440px] w-[90%] md:bg-[#F2F3F5] rounded-t-[30px] rounded-b-none md:rounded-[30px] my-12 flex flex-col md:flex-row overflow-hidden md:py-5'> {/* Image Section */}
                            <div
                                className='h-full w-full md:w-[420px] md:px-6 md:py-6 md:pr-12 flex justify-center items-center order-1 md:order-2'>
                                <img src={testimonial.img} alt=''
                                     className='rounded-[30px] w-full md:w-auto h-full md:h-[360px]'/>
                            </div>
                            {/* Text Section */}
                            <div className='flex-1 flex flex-col md:px-14 order-2 md:order-1'>
                                <div
                                    className='h-auto md:h-40 flex justify-start items-start md:justify-start md:items-end md:mt-0 md:pt-3'>
                                    <h1 className='font-SF_PRO_Light text-[30px] md:text-[45px] mt-2 md:mt-6'> {testimonial.header} </h1>
                                </div>
                                <div className='flex-1'><p
                                    className='hidden md:block text-[#5A6161] font-SF_PRO_Light mt-3'> {testimonial.paragraph} </p>
                                    <a
                                        className='md:hidden font-SF_Pro_Regular text-[15px] underline font-semibold text-[#005A9C]'> Learn
                                        More </a></div>
                            </div>
                        </div>
                    </div>))}
                </div>


            </div>

            {/* Section-04 */}
            <div className='h-auto w-full max-w-screen-2xl mx-auto flex justify-center items-center'>
                <div className=' w-[80%] h-[400px] flex flex-col pt-12 mb-12'>
                    <div>
                        <h1 className='font-SF_PRO_Light text-[#AAB1B1] text-[30px] md:text-[50px] text-center'>
                            Transparent Banking. No Hidden Fees.
                        </h1>
                    </div>
                    <div>
                        <h1
                            className='font-SF_PRO_Light text-[30px]  text-center'
                            style={{
                                background: 'linear-gradient(270deg, #8CB9BD 0%, #163172 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                color: 'transparent',
                            }}
                        >
                            100% Clarity
                        </h1>
                    </div>
                    <div className='mt-12'>
                        <p className='text-[#2B3031] font-SF_PRO_Light text-center'>
                            Open an Ascentis Account in Minutes.
                            <br/> Start Banking Smarter Today.
                        </p>
                    </div>
                    <div className='w-full flex justify-center items-center mt-4'>
                        <button
                            className='bg-[#0D427C] rounded-full px-8 py-2 text-white font-SF_PRO_Light cursor-pointer'
                            onClick={() => navigate('/register')}
                        >
                            Get Your Ascentis Account Now{' '}
                        </button>
                    </div>
                </div>
            </div>

            {/* Section-05 bg-[#CBCBCB] */}
            <div
                className='h-auto w-full max-w-screen-2xl mx-auto rounded-t-[40px] md:rounded-t-[80px] flex flex-col justify-center items-center px-6 md:px-16 py-16 md:py-48'>
                <div className='h-auto w-full flex justify-center items-end mb-6 md:mb-12'>
                    <h1 className='text-[#2B3031] font-SF_PRO_Light text-center text-[28px] md:text-[60px] leading-snug md:leading-none'>
                        Choose the Card That Fits Your Lifestyle
                    </h1>
                </div>
                <div className='h-auto w-full flex justify-center items-center mb-8'>
                    <div
                        className='bg-[#163172] h-auto md:h-12 w-full max-w-[440px] md:max-w-[800px] rounded-full flex justify-center items-center gap-x-2 md:gap-x-20 py-2 px-4 md:p-0 font-SF_PRO_Light text-white text-[12px] md:text-[18px]'>
                        <button
                            className={activeButtonStyle('Business')}
                            onClick={() => setActiveButton('Business')}
                        >
                            Business
                        </button>
                        <button
                            className={activeButtonStyle('Student')}
                            onClick={() => setActiveButton('Student')}
                        >
                            Student
                        </button>
                        <button
                            className={activeButtonStyle('Platinum')}
                            onClick={() => setActiveButton('Platinum')}
                        >
                            Platinum
                        </button>
                        <button
                            className={activeButtonStyle('Reward')}
                            onClick={() => setActiveButton('Reward')}
                        >
                            Reward
                        </button>
                        <button
                            className={activeButtonStyle('Secured')}
                            onClick={() => setActiveButton('Secured')}
                        >
                            Secured
                        </button>
                    </div>
                </div>
                <div
                    className='h-auto md:h-[480px] w-full flex flex-col md:flex-row justify-center items-center gap-4 px-4 md:px-0'>
                    <div className='flex-1 h-full flex justify-center items-center'>

                        <img src={activeCard.cardImg} alt={activeCard.cardName}
                             className='h-[200px] w-auto md:h-[340px] md:w-[90%] rounded-lg shadow-md'/>

                    </div>
                    <div className='flex-1 h-full flex flex-col justify-center gap-4 md:gap-8 px-4'>
                        <p className='text-[#787F7F] font-SF_PRO_Light text-[20px] md:text-[40px] text-center md:text-left leading-relaxed md:leading-snug'>
                            {activeCard.cardInfo}
                        </p>
                        <a className='font-SF_PRO_Light underline text-[#163172] cursor-pointer text-center md:text-left'>
                            Learn More
                        </a>
                    </div>
                </div>
            </div>

            {/* Section-06 */}
            <div className='h-auto w-full max-w-screen-2xl mx-auto flex justify-center items-center py-12 relative overflow-hidden'>
                <img
                    src='\src\assets\Images\india_map.png'
                    alt='india_map'
                    className='w-full max-w-[927px] h-auto sm:max-w-[500px] md:max-w-[927px] md:scale-100 scale-125 sm:scale-100 object-cover'
                />

                <div
                    className='absolute h-[200px] sm:h-[400px] md:h-[400px] w-full max-w-[300px] sm:max-w-[500px] md:max-w-[727px] flex justify-center items-center p-4'
                    style={{
                        borderRadius: '20px',
                        // border: '1px solid #FFF',
                        background:
                            'linear-gradient(110deg, rgba(217, 217, 217, 0.20) 0%, rgba(115, 115, 115, 0.20) 102.22%)',
                        backdropFilter: 'blur(60px)',
                    }}
                >
                    <div className='relative w-full max-w-[260px] sm:max-w-[400px] md:max-w-[500px]'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 101 101'
                            className='absolute top-1/2 left-2 transform -translate-y-1/2 h-5 w-5 text-gray-400'
                        >
                            <path
                                d='M63.3 59.9c3.8-4.6 6.2-10.5 6.2-17 0-14.6-11.9-26.5-26.5-26.5S16.5 28.3 16.5 42.9 28.4 69.4 43 69.4c6.4 0 12.4-2.3 17-6.2l20.6 20.6c.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7.9-.9.9-2.5 0-3.4L63.3 59.9zm-20.4 4.7c-12 0-21.7-9.7-21.7-21.7s9.7-21.7 21.7-21.7 21.7 9.7 21.7 21.7-9.7 21.7-21.7 21.7z'></path>
                        </svg>
                        <input
                            type='text'
                            placeholder='search nearest branch'
                            className='w-full rounded-full px-10 py-3 text-sm sm:text-base focus:outline-none'
                        />
                    </div>
                </div>
            </div>

            {/* Section-07 */}
            <div className='h-screen w-full '></div>
        </>
    );
};

export default Home;
