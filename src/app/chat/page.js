'use client'
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
    messageListRef.current?.scrollIntoView({ behavior: 'smooth' });
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
    <div className="p-10 bg-gradient-to-tl from-[#C3EF38] to-[#dd53ff] border-1 border-t-4 border-[#84a123] rounded-3xl shadow-2xl shadow-[#C3EF38] max-w-4xl mt-5 mb-10">
      <h1 className="font-serif text-4xl text-center font-bold text-purple-800 pb-6">Chat Room</h1>

      <ul ref={messageListRef} className="space-y-4 max-h-[600px] overflow-y-auto mb-3 px-10 py-6 bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] rounded-2xl shadow-stone-400">
        {messages.map((msg, index) => (
          <li
            key={index}
            className={`flex items-start space-x-3 mt-2 px-1 py-1 rounded-xl shadow-md transition-transform duration-300 ease-in-out ${
              index % 2 === 0 ? 'bg-gradient-to-tl from-[#f0f656] to-[#e382fb]' : 'bg-gradient-to-tl from-[#8e912d] to-[#dd53ff] opacity-95'
            }`}
          >
            {/* Check if user exists before accessing profileImageUrl */}
            <img 
              src={user ? user.profileImageUrl : 'https://via.placeholder.com/40'} 
              alt="User Avatar" 
              className="w-10 h-10 rounded-full border-2 border-white shadow-md" 
            />
            <div className="flex-1">
              <span className="font-semibold font-serif text-[#d7fe54]">{msg.user}</span>
              <p className="text-[#68217A] mt-1 font-semibold break-words">{msg.text}</p>
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
          className="flex-1 border border-[#8b2fa2] rounded-2xl text-gray-800 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300 px-5 mt-3 bg-gradient-to-r from-green-100 to-purple-100 resize-none"
        />
        <button
          type="submit"
          className="mt-3 px-2 py-1 bg-[#8b2fa2] text-[#d0fa44] rounded-lg hover:bg-purple-700 transition-colors duration-300"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
