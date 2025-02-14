import { useState } from 'react';
import axios from 'axios';
import { IoMdSend } from 'react-icons/io';
import { BsChatDots } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { ImSpinner8 } from 'react-icons/im';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'bot',
      content: 'Hello! How can I help you today?',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = {
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString(),
    };

    setChatHistory((prev) => [...prev, userMessage]);
    setMessage(''); // Clear the input field immediately
    setIsLoading(true); // Set loading state to true

    try {
      const response = await axios.post(
        'https://chatbot-backend-neeo.onrender.com/get',
        {
          msg: message,
        }
      );
      const botMessage = {
        type: 'bot',
        content: response.data,
        timestamp: new Date().toLocaleTimeString(),
      };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching response from backend:', error);
      const botMessage = {
        type: 'bot',
        content: 'Sorry, something went wrong!',
        timestamp: new Date().toLocaleTimeString(),
      };
      setChatHistory((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  return (
    <div className='fixed bottom-4 right-4 z-50'>
      {isOpen && (
        <div className='bg-white rounded-lg shadow-2xl w-80 md:w-96 mb-4 transition-all duration-300 ease-in-out transform translate-y-0 opacity-100'>
          <div className='bg-blue-600 rounded-t-lg p-4 flex justify-between items-center'>
            <h2 className='text-white font-semibold text-lg'>Chat Support</h2>
            <button
              onClick={() => setIsOpen(false)}
              className='text-white hover:text-gray-200 transition-colors'
            >
              <AiOutlineClose size={20} />
            </button>
          </div>

          <div className='h-96 overflow-y-auto p-4 bg-gray-50'>
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  msg.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <p className='text-sm'>{msg.content}</p>
                  <span className='text-xs opacity-70 mt-1 block'>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className='p-4 border-t border-gray-200'
          >
            <div className='flex space-x-2'>
              <input
                type='text'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder='Type your message...'
                className='flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500'
                disabled={isLoading} // Disable input while loading
              />
              <button
                type='submit'
                className='bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors flex items-center justify-center'
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? (
                  <ImSpinner8 className='animate-spin' size={20} />
                ) : (
                  <IoMdSend size={20} />
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className='bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors'
      >
        <BsChatDots size={24} />
      </button>
    </div>
  );
};

export default ChatBot;
