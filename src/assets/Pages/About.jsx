import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='h-auto w-full max-w-screen-2xl m-auto px-12'>
        <div className='h-full w-full bg-black bg-opacity-5 mt-28 rounded-[30px] pt-28 relative'>
          <h1
            className='relative z-10 text-center text-7xl h-32 font-SF_Pro_Regular'
            style={{
              background:
                'var(--Brand-Gradient, linear-gradient(270deg, #8CB9BD 0%, #163172 100%))',
              backgroundClip: 'text',
              webkitBackgroundClip: 'text',
              webkitTextFillColor: 'transparent',
            }}
          >
            Pioneering Financial Solutions
          </h1>

          <img
            src='src/assets/Images/About_Us/team_aboutus_transparent.png'
            className='relative z-0 -mt-20 w-full'
            alt='team'
          />
        </div>
      </div>

      <div className='h-[600px] w-full max-w-screen-2xl m-auto py-[10px] relative my-16'>
        <div className='h-full w-full overflow-hidden relative'>
          <h1 className='text-[250px] font-SF_Pro_Regular text-[#AAB1B1] leading-tight'>
            Building <br /> Trust
          </h1>
          <h1
            className='absolute text-[90px] font-SF_PRO_Light'
            style={{
              top: '57%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            Driving Innovation
          </h1>
        </div>
      </div>

      <div className='h-auto w-full max-w-screen-2xl m-auto px-12 flex flex-col justify-center items-center overflow-hidden'>
        {/*Heritage of Trust*/}
        <div className='h-[500px] w-full rounded-3xl flex justify-center items-center relative'>
          <div className='overflow-hidden flex-1 relative'>
            <img
              src='src/assets/Images/About_Us/heritage_of_trust.png'
              className='rounded-3xl w-full h-full object-cover'
            />
            <div
              className='absolute inset-0  rounded-3xl'
              style={{
                background:
                  'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 28.99%, rgba(22, 49, 114, 0.80) 80.65%)',
              }}
            ></div>
            <div className='absolute top-[80%] left-36 transform -translate-x-1/2 -translate-y-1/2'>
              <button className='bg-white text-black py-2 px-4 rounded-[15px] shadow-lg font-SF_PRO_Light text-2xl'>
                Heritage of Trust
              </button>
            </div>
          </div>
          <div className='flex-1 flex flex-col justify-center items-center gap-10 pl-12'>
            <div className='w-full'>
              <h1 className='font-SF_Pro_Regular text-4xl text-left'>
                Over a Decade of Reliable Service
              </h1>
            </div>
            <div>
              <ul className='list-disc pl-5 text-[#787F7F] text-2xl'>
                <li>Built on trust and reliability.</li>
                <li>Over a decade of unwavering service.</li>
                <li>Secure, dependable financial services.</li>
                <li>
                  Long history of customer satisfaction and ethical practices.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/*Global Standards*/}
        <div className='h-[500px] w-full rounded-3xl flex justify-center items-center relative'>
          <div className='flex-1 flex flex-col justify-center items-center gap-10 pr-12'>
            <div className='w-full'>
              <h1 className='font-SF_Pro_Regular text-4xl text-left'>
                Adopting Best Practices for Excellence
              </h1>
            </div>
            <div>
              <ul className='list-disc pl-5 text-[#787F7F] text-2xl'>
                <li>Adherence to global standards.</li>
                <li>Adoption of best practices from leading institutions.</li>
                <li>Efficient, transparent, and client-centric operations.</li>
                <li>High-quality service in all aspects of banking.</li>
              </ul>
            </div>
          </div>
          <div className='overflow-hidden flex-1 relative'>
            <img
              src='src/assets/Images/About_Us/global_standards.png'
              className='rounded-3xl w-full h-full object-cover'
            />
            <div
              className='absolute inset-0  rounded-3xl'
              style={{
                background:
                  'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 28.99%, rgba(22, 49, 114, 0.80) 80.65%)',
              }}
            ></div>
            <div className='absolute top-[80%] left-36 transform -translate-x-1/2 -translate-y-1/2'>
              <button className='bg-white text-black py-2 px-4 rounded-[15px] shadow-lg font-SF_PRO_Light text-2xl'>
                Global Standards
              </button>
            </div>
          </div>
        </div>

        {/*Innovative Solutions*/}
        <div className='h-[500px] w-full rounded-3xl flex justify-center items-center relative'>
          <div className='overflow-hidden flex-1 relative'>
            <img
              src='src/assets/Images/About_Us/innovative_solutions.png'
              className='rounded-3xl w-full h-full object-cover'
            />
            <div
              className='absolute inset-0  rounded-3xl'
              style={{
                background:
                  'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 28.99%, rgba(22, 49, 114, 0.80) 80.65%)',
              }}
            ></div>
            <div className='absolute top-[80%] left-36 transform -translate-x-1/2 -translate-y-1/2'>
              <button className='bg-white text-black py-2 px-4 rounded-[15px] shadow-lg font-SF_PRO_Light text-2xl'>
                Innovative Solutions
              </button>
            </div>
          </div>
          <div className='flex-1 flex flex-col justify-center items-center gap-10 pl-12'>
            <div className='w-full'>
              <h1 className='font-SF_Pro_Regular text-4xl text-left'>
                Leading with Technology
              </h1>
            </div>
            <div>
              <ul className='list-disc pl-5 text-[#787F7F] text-2xl'>
                <li>Continuous integration of cutting-edge technology.</li>
                <li>
                  Enhancing the banking experience with state-of-the-art
                  solutions.
                </li>
                <li>Mobile banking apps and robust security protocols.</li>
                <li>Modern, efficient solutions tailored to evolving needs.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className='h-[460px] w-full max-w-screen-2xl m-auto flex flex-col justify-center items-center px-32 gap-20'>
        <h1 className='text-6xl font-SF_PRO_Light'>
          Leadership That <i className='font-SF_PRO_Thin'>Inspires</i>
        </h1>
        <p className='text-[#787F7F] text-2xl font-SF_Pro_Light text-center'>
          At Ascentis Bank, we are proud to be guided by a team of visionary
          leaders who bring extensive expertise and a forward-thinking approach
          to the banking industry. Our leadership team is dedicated to fostering
          sustainable growth, driving innovation, and maintaining the highest
          standards of financial integrity.
        </p>
      </div>

      <div className='h-fit w-full max-w-screen-2xl m-auto bg-black flex justify-center items-center pb-32'>
        {/* First Section */}
        <div className='h-full w-full flex flex-col justify-center items-center px-24'>
          <div className=' h-[350px] w-full relative'>
            <img
              src='src/assets/Images/About_Us/alexCEO_new.png'
              className='absolute top-[-80px]'
            />
          </div>
          <div>
            <h1 className='text-3xl font-SF_PRO_Light text-center text-white'>
              Alex Johnson-CEO
            </h1>
          </div>
          <div className='h-full w-full mt-12'>
            <p className='text-left text-2xl text-[#7B7B7B]'>
              With over 25 years of experience in the banking industry, Alex
              leads with a vision for sustainable growth and innovation. His
              strategic insights and commitment to excellence have been pivotal
              in steering Ascentis Bank towards new heights, ensuring we remain
              at the forefront of financial services.
            </p>
          </div>
        </div>

        {/* Second Section */}
        <div className='h-full w-full flex flex-col justify-center items-center px-24'>
          <div className='h-[350px] w-full relative'>
            <img
              src='src/assets/Images/About_Us/sophiaCFO_new.png'
              className='absolute top-[-80px]'
            />
          </div>
          <div>
            <h1 className='text-3xl font-SF_PRO_Light text-center text-white'>
              Sophia Lee-CFO
            </h1>
          </div>
          <div className='h-full w-full mt-12'>
            <p className='text-left text-2xl text-[#7B7B7B]'>
              Sophia brings strategic financial insights, ensuring Ascentis Bank
              remains financially robust and growth-oriented with a vision for
              sustainable growth and innovation. Her dedication to financial
              stability and growth has been instrumental in reinforcing our
              bank’s strong foundation and securing its future.
            </p>
          </div>
        </div>
      </div>

      <div className='h-auto w-full max-w-screen-2xl m-auto flex flex-col justify-center items-center'>
        <div className='h-[400px] pt-48'>
          <h1 className='text-[60px] font-SF_PRO_Light'>
            Building{' '}
            <span
              style={{
                background:
                  'var(--Brand-Gradient, linear-gradient(270deg, #8CB9BD 0%, #163172 100%))',
                backgroundClip: 'text',
                webkitBackgroundClip: 'text',
                webkitTextFillColor: 'transparent',
              }}
            >
              Better Future
            </span>{' '}
            Together
          </h1>
        </div>

        <div className=' h-[1000px] w-full px-48 pt-8'>
          <div className=' h-full w-full flex justify-center items-center gap-[20px]'>
            <div className='w-full h-full flex flex-col justify-start items-center gap-[20px]'>
              <div className='h-[560px] w-full rounded-[40px] bg-gray-400 overflow-hidden relative'>
                <img
                  src='src/assets/Images/About_Us/workshop.png'
                  className='w-full h-full object-cover absolute'
                />
                <div
                  className='absolute inset-0 rounded-3xl'
                  style={{
                    background:
                      'linear-gradient(180deg, #163172 7.27%, rgba(22, 49, 114, 0.00) 59.86%)',
                    zIndex: 1,
                  }}
                ></div>
                <h1
                  className='absolute text-white font-SF_PRO_Thin text-5xl'
                  style={{ zIndex: 2, top: '40px', left: '40px' }}
                >
                  Financial
                  <br /> Literacy
                  <br /> Workshops
                </h1>
              </div>

              <div className='h-[280px] w-full rounded-[40px] bg-black bg-opacity-5 flex justify-center items-center overflow-hidden'>
                <div className='h-full w-full flex-1 flex flex-col justify-center items-center px-6 gap-[20px]'>
                  <h1 className='text-3xl font-SF_PRO_Light text-left w-full'>
                    CSR Programs
                  </h1>
                  <p className='text-[#737373] font-SF_PRO_Light text-[15px]'>
                    Our corporate social responsibility programs are designed to
                    support various initiatives, from environmental
                    sustainability to social welfare, making a positive impact
                    on society
                  </p>
                </div>
                <div className='h-full w-full flex-1 pr-4 py-4'>
                  <img
                    src='src/assets/Images/About_Us/csr_programs.png'
                    className='h-full w-full object-cover rounded-[40px]'
                  />
                </div>
              </div>
            </div>
            <div className='w-full h-full  flex flex-col justify-end items-center gap-[20px]'>
              <div className='h-[280px] w-full rounded-[40px] bg-black bg-opacity-5 flex justify-center items-center overflow-hidden'>
                <div className='h-full w-full flex-1 flex flex-col justify-center items-center px-6 gap-[20px]'>
                  <h1 className='text-3xl font-SF_PRO_Light text-left w-full'>
                    Community Investments
                  </h1>
                  <p className='text-[#737373] font-SF_PRO_Light text-[15px]'>
                    $50 million invested in community projects, supporting
                    infrastructure, education, and sustainable development for a
                    better tomorrow.
                  </p>
                </div>
                <div className='h-full w-full flex-1 pr-4 py-4'>
                  <img
                    src='src/assets/Images/About_Us/community_investments.png'
                    className='h-full w-full object-cover rounded-[40px]'
                  />
                </div>
              </div>
              <div className='h-[560px] w-full rounded-[40px] bg-gray-400 overflow-hidden relative'>
                <img
                  src='src/assets/Images/About_Us/extensive_react.png'
                  className='w-full h-full object-cover'
                />
                <div
                  className='absolute inset-0  rounded-3xl'
                  style={{
                    background:
                      'linear-gradient(180deg, #163172 7.27%, rgba(22, 49, 114, 0.00) 59.86%)',
                    zIndex: '1',
                  }}
                ></div>
                <h1
                  className='absolute text-white font-SF_PRO_Thin text-5xl'
                  style={{ zIndex: 2, top: '40px', left: '40px' }}
                >
                  Extensive
                  <br /> Reach
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='h-[600px] w-full py-32 px-32 flex flex-col justify-center items-center'>
        <div className='h-full w-full rounded-3xl flex flex-col justify-center items-center'>
          <div className='mt-12'>
            <p className='text-[#2B3031] font-SF_PRO_Light text-center text-3xl'>
              Open an Ascentis Account in Minutes.
              <br /> Start Banking Smarter Today.
            </p>
          </div>
          <div className='w-full flex justify-center items-center mt-8'>
            <button
              className='bg-[#0D427C] rounded-full px-8 py-2 text-white font-SF_PRO_Light cursor-pointer'
              onClick={() => navigate('/register')}
            >
              Get Your Ascentis Account Now{' '}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
