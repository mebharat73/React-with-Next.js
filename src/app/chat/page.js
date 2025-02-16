'use client';
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messageListRef = useRef(null); // Reference for the message list to scroll
  const textareaRef = useRef(null); // Reference for the textarea
  const { user } = useSelector((state) => state.auth);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, user: 'User  ', avatar: 'https://via.placeholder.com/40' }, // Placeholder image
      ]);
      setInput('');
    }
  };

  // Scroll to the bottom of the message list whenever new messages are added
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle Enter key for line breaks
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  // Automatically adjust the height of the textarea
  const handleInputChange = (e) => {
    setInput(e.target.value);
    textareaRef.current.style.height = 'auto'; // Reset height
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to scrollHeight
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] dark:bg-gradient-to-tl dark:from-[#b4b0b0] dark:to-[#504e4e]"> 
      <div className="w-11/12 px-3 md:px-5 md:w-5/12 h-[94vh] bg-gradient-to-tl from-[#C3EF38] to-[#dd53ff] border-1 border-t-4 border-[#84a123] rounded-3xl shadow-2xl shadow-[#C3EF38] dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0]">
        <h1 className="mt-5 mb-5 font-serif text-4xl text-center font-bold text-purple-800">Chat Room</h1>

        <ul
          ref={messageListRef}
          className="space-y-1 md:space-y-2 max-h-[500px] overflow-y-auto px-3 py-3 bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] rounded-2xl shadow-stone-400 dark:bg-gradient-to-tl dark:from-[#b4b0b0] dark:to-[#504e4e] border-y-2 border-[#68217A] border-double no-scrollbar"
        >
          {messages.map((msg, index) => (
            <li
              key={index}
              className={`flex items-start space-x-8 px-2 py-1 rounded-xl shadow-md transition-transform duration-300 ease-in-out ${
                index % 2 === 0
                  ? 'bg-gradient-to-tl from-[#f0f656] to-[#e382fb] dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0]'
                  : 'bg-gradient-to-tl from-[#8e912d] to-[#dd53ff] dark:bg-gradient-to-tl dark:from-[#b4b0b0] dark:to-[#504e4e] opacity-95'
              }`}
              style={{
                display: 'block',
                maxWidth: '100%',
                width: 'fit-content',
                wordWrap: 'break-word',
                marginLeft: '0',
              }}
            >
              <img
                src={user ? user.profileImageUrl : 'https://via.placeholder.com/40'}
                alt="User Avatar"
                className="w-6 h-6 rounded-full border-2 border-white shadow-md"
              />
              <div className="flex-1 -mt-7">
                <span className="font-serif text-sm font-semibold text-[#315b19]">{msg.user}</span>
                <p
                  className="px-3 text-black dark:text-[#d0fa44] text-sm font-semibold font-sans break-words"
                  style={{ whiteSpace: 'pre-wrap' }} // Ensure line breaks are respected
                >
                  {msg.text}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <form onSubmit={sendMessage} className="flex space-x-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange} // Update input and adjust height
            onKeyDown={handleInputKeyDown} // Listen for Enter key press
            placeholder="Type a message..."
            rows="1"
            className="flex-1 border border-[#8b2fa2] rounded-2xl text-gray-800 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300 px-5 mt-3 bg-gradient-to-r from-green-100 to-purple-100 resize-none overflow-hidden"
            style={{ 
              resize: 'none',  // Disable resizing
              overflowY: 'auto', // Allow vertical scrolling
              scrollbarWidth: 'none', // For Firefox to hide the scrollbar
            }}
          />
          <button
            type="submit"
            className="mt-3 px-2 py-1 bg-[#68217A] text-[#d0fa44] dark:text-white rounded-lg hover:bg-[#8b2fa2] transition-colors duration-300"
          >
            Send
          </button>
        </form>

      </div>
    </div>
  );
};

export default ChatRoom;
