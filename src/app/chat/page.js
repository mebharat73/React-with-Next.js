'use client';
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './ChatRoom.module.css'; // Import the styles

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [replyTo, setReplyTo] = useState(null); // State to track the message being replied to
  const messageListRef = useRef(null); // Reference for the message list to scroll
  const textareaRef = useRef(null); // Reference for the textarea
  const { user } = useSelector((state) => state.auth);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: input,
          user: user ? user.name : 'User',
          avatar: user ? user.profileImageUrl : 'https://via.placeholder.com/40',
          replyTo, // Include the replyTo information (message being replied to)
          attachment: null, // Add the attachment here if there is one
        },
      ]);
      setInput('');
      setReplyTo(null); // Reset reply after sending
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

  // Handle reply to a message
  const handleReply = (msg) => {
    setReplyTo(msg); // Set the message being replied to
    // We don't need to set input here since we don't want the reply's text in the input
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] dark:bg-gradient-to-tl dark:from-[#b4b0b0] dark:to-[#504e4e]">
      <div className="w-11/12 px-3 md:px-5 md:w-9/12 h-[94vh] bg-gradient-to-tl from-[#C3EF38] to-[#dd53ff] border-1 border-y-4 border-[#84a123] rounded-3xl shadow-2xl shadow-[#C3EF38] dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0] lg:w-5/12 flex flex-col">
        <h1 className="mt-5 mb-3 font-serif text-4xl text-center font-bold text-purple-800">Chat Room</h1>

        {replyTo && ( // Display the reply information if a message is being replied to
          <div className="flex items-start bg-gray-200 p-2 rounded-lg mb-2 border border-gray-300">
            <img
              src={replyTo.avatar}
              alt="Replying User Avatar"
              className="w-6 h-6 rounded-full border-2 border-white shadow-md mr-2"
            />
            <div className="flex-1">
              <span className="font-semibold">{replyTo.user}</span>
              <p className="text-sm">{replyTo.text}</p>
            </div>
            <button onClick={() => setReplyTo(null)} className="ml-2 text-red-500">Cancel</button>
          </div>
        )}

        <ul
          ref={messageListRef}
          className="space-y-2 md:space-y-1.5 max-h-[600px] overflow-y-auto px-3 py-3 mb-1 bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] rounded-2xl shadow-stone-400 dark:bg-gradient-to-tl dark:from-[#b4b0b0] dark:to-[#504e4e] border-y-2 border-[#68217A] border-double no-scrollbar flex-grow"
        >
          {messages.map((msg, index) => (
            <li
              key={index} // This key will trigger re-render and animation
              onClick={() => handleReply(msg)} // Add click handler for reply
              className={`flex items-start space-x-7 px-1 py-1 rounded-xl shadow-md transition-transform duration-500 ease-in-out ${styles.fadeInMessage} ${
                index % 2 === 0
                  ? 'bg-gradient-to-tl from-[#f0f656] to-[#e382fb] dark:bg-gradient-to-tl dark:from-[#000000] dark:to-[#e0c6e5]'
                  : 'bg-gradient-to-tl from-[#8e912d] to-[#dd53ff] dark:bg-gradient-to-tl dark:from-[#f6dcdc] dark:to-[#504e4e] opacity-95'
              } ${styles.messageHover}`} // Apply messageHover class for hover effect
              style={{
                display: 'block',
                maxWidth: '100%',
                width: 'fit-content',
                wordWrap: 'break-word',
                marginLeft: '0',
              }}
            >
              {msg.replyTo && ( // Check if the message is a reply
                <div className="flex items-start bg-gray-200 px-2 py-1 rounded-lg mb-2 border border-gray-300">
                  <img
                    src={msg.replyTo.avatar}
                    alt="Replying User Avatar"
                    className="w-6 h-6 rounded-full border-2 border-black shadow-md mr-1"
                  />
                  <div className="flex-1 -mt-1">
                    <span className="font-normal">{msg.replyTo.user}</span>
                    <p className="-mt-1 text-sm">{msg.replyTo.text}</p>
                  </div>
                </div>
              )}

            <div className="flex-1 -mt-3 p-2">
              <span className="font-serif text-xs font-semibold text-[#315b19] animate-pulse">{msg.user}</span>
              <img
                src={user ? user.profileImageUrl : 'https://via.placeholder.com/40'}
                alt="User Avatar"
                className="w-6 h-6 rounded-full border-2 border-white shadow-md"
              />
              
                
                <p
                  className="-mt-6 px-7 text-black dark:text-[#d0fa44] text-sm font-semibold font-sans break-words"
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {msg.text}
                </p>
                

                {/* Attachments */}
                {msg.attachment && (
                  <div className="mt-2">
                    <img
                      src={msg.attachment}
                      alt="Attachment"
                      className="max-w-full rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>

        <form onSubmit={sendMessage} className="flex space-x-2 py-1">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange} // Update input and adjust height
            onKeyDown={handleInputKeyDown} // Listen for Enter key press
            placeholder="Type a message..."
            rows="1"
            className="flex-1 border border-[#8b2fa2] rounded-2xl text-gray-800 font-semibold text-lg focus:outline-none focus:ring-1 focus:ring-[#9e47b4] transition-all duration-300 px-5 bg-gradient-to-r from-green-100 to-purple-100 resize-none overflow-hidden"
            style={{
              resize: 'none',
              overflowY: 'auto',
              scrollbarWidth: 'none',
            }}
          />
          <button
            type="submit"
            className="mt-0 px-3 bg-[#68217A] text-[#d0fa44] font-semibold dark:text-white rounded-2xl hover:bg-[#8b2fa2] transition-colors duration-300"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
