'use client';

import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useGlobalSocket } from '@/context/SocketContext';

// Helper: file icon renderer
const renderFileIcon = (ext) => {
  ext = (ext || '').toLowerCase();
  if (ext === 'pdf') return <span className="text-red-500 text-xl">📄</span>;
  if (['doc', 'docx'].includes(ext)) return <span className="text-blue-500 text-xl">📝</span>;
  if (['xls', 'xlsx'].includes(ext)) return <span className="text-green-600 text-xl">📊</span>;
  if (['ppt', 'pptx'].includes(ext)) return <span className="text-orange-500 text-xl">📽️</span>;
  if (['zip', 'rar'].includes(ext)) return <span className="text-gray-600 text-xl">🗜️</span>;
  if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext)) return <span>🖼️</span>;
  return <span className="text-gray-500 text-xl">📎</span>;
};

// Helper: check image
const isImage = (attachment) => {
  const ext = (attachment?.format || attachment?.original_filename?.split('.').pop() || '').toLowerCase();
  return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext);
};

const ChatRoomPrivate = ({ selectedUser, onBack }) => {
  const { user } = useSelector((state) => state.auth);
  const socket = useGlobalSocket();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typingStatus, setTypingStatus] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const fileRef = useRef(null);
  const bottomRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!user || !selectedUser) return;

    axios
      .get(`${API}/api/chat/private?user1=${user.id}&user2=${selectedUser.id}`)
      .then((res) => setMessages(res.data))
      .catch(console.error);
  }, [user, selectedUser]);

  useEffect(() => {
    if (!user || !selectedUser) return;

    axios
      .post(`${API}/api/chat/mark-seen`, {
        senderId: selectedUser.id,
        receiverId: user.id,
      })
      .catch(console.error);
  }, [user, selectedUser]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (msg) => {
  if (!selectedUser) return; // 🛡️ prevent null access

  const { senderId, to } = msg;
  if (
    (senderId === user.id && to === selectedUser.id) ||
    (senderId === selectedUser.id && to === user.id)
  ) {
    setMessages((prev) => [...prev, msg]);
  }
};


    const handleTyping = ({ from, isTyping }) => {
      if (from === selectedUser.id) {
        setTypingStatus(isTyping ? 'Typing...' : null);
      }
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('typing', handleTyping);
    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('typing', handleTyping);
    };
  }, [socket, user, selectedUser]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    socket?.emit('typing', { to: selectedUser.id, isTyping: true });

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('typing', { to: selectedUser.id, isTyping: false });
    }, 1000);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files?.[0] || null);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() && !selectedFile) return;

    let attachment = null;
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      try {
        const res = await axios.post(`${API}/api/chat/upload`, formData);
        attachment = {
          url: res.data.url,
          format: res.data.format,
          original_filename: res.data.original_filename || selectedFile.name,
          resource_type: res.data.resource_type,
        };
      } catch (err) {
        console.error('File upload failed', err);
      }
    }

    const msg = {
      senderId: user.id,
      senderName: user.name,
      senderAvatar: user.profileImageUrl,
      message: input,
      attachment,
      to: selectedUser.id,
    };

    socket.emit('sendMessage', msg);
    setMessages((prev) => [...prev, msg]);
    setInput('');
    setSelectedFile(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  if (!selectedUser) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 bg-white dark:bg-gray-900">
        Select a user to start chatting
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full p-2 md:p-3 rounded-xl bg-white dark:bg-gradient-to-tl dark:from-[#b4b0b0] dark:to-[#504e4e]">
      {/* Back Button */}
      {onBack && (
        <div className="md:hidden mb-2">
          <button
            onClick={onBack}
            className="text-sm bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white px-3 py-1 rounded shadow hover:bg-gray-300 dark:hover:bg-gray-500"
          >
            ← Back to Users
          </button>
        </div>
      )}

      {/* Chat Header */}
      <div className="font-bold text-lg text-center text-black dark:text-white mb-2">
        Chat with {selectedUser.name}
      </div>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto p-2 rounded-lg space-y-1 bg-gray-100 dark:bg-gray-700">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[75vw] md:max-w-[60%] p-2 rounded-lg break-words ${
              msg.senderId === user.id
                ? 'ml-auto bg-green-200 dark:bg-green-600'
                : 'mr-auto bg-purple-200 dark:bg-purple-500'
            }`}
          >
            <div className="font-semibold text-sm text-gray-900 dark:text-white">{msg.senderName}</div>

            {msg.attachment?.url && (
              <div className="mt-1">
                {isImage(msg.attachment) ? (
                  <>
                    <img
                      src={msg.attachment.url}
                      alt={msg.attachment.original_filename}
                      className="w-40 h-auto rounded-md"
                    />
                    <a
                      href={msg.attachment.url}
                      download
                      className="text-blue-600 dark:text-blue-300 text-sm underline"
                    >
                      Download Image
                    </a>
                  </>
                ) : (
                  <div className="flex items-center gap-2 bg-white dark:bg-gray-600 rounded px-2 border border-gray-300 dark:border-gray-500">
                    {renderFileIcon(msg.attachment.format || msg.attachment.original_filename?.split('.').pop())}
                    <span className="text-sm text-gray-800 dark:text-white break-words">
                      {msg.attachment.original_filename}
                    </span>
                    <a
                      href={msg.attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="ml-auto text-blue-600 dark:text-blue-300 text-sm underline"
                    >
                      Download
                    </a>
                  </div>
                )}
              </div>
            )}

            {msg.message && (
              <div className="mt-1 px-2 whitespace-pre-wrap text-gray-800 dark:text-white">{msg.message}</div>
            )}

            {msg.senderId === user.id && (
              <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                {msg.seen ? 'Seen' : 'Sent'}
              </div>
            )}
          </div>
        ))}

        {typingStatus && (
          <div className="text-sm italic text-gray-600 dark:text-gray-300">{typingStatus}</div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* File Preview */}
      {selectedFile && (
        <div className="flex items-center space-x-3 bg-gray-200 dark:bg-gray-600 p-2 rounded-md mt-2 max-w-xs">
          {renderFileIcon(selectedFile.name.split('.').pop())}
          <span className="break-words font-medium dark:text-white">{selectedFile.name}</span>
          <button
            type="button"
            onClick={() => setSelectedFile(null)}
            className="text-red-600 font-bold"
            title="Remove file"
          >
            ×
          </button>
        </div>
      )}

      {/* Message Input */}
      <form onSubmit={sendMessage} className="mt-2 flex items-center gap-1">
        <input
          value={input}
          onChange={handleInputChange}
          className="flex-grow px-4 py-2 border rounded-md bg-[#fdfdfc] dark:bg-gray-800 dark:text-white dark:border-gray-600"
          placeholder="Type a message..."
        />
        <input type="file" ref={fileRef} className="hidden" onChange={handleFileChange} />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="bg-yellow-400 dark:bg-yellow-500 px-2 py-1 rounded text-xl"
          title="Attach a file"
        >
          📎
        </button>
        <button type="submit" className="bg-purple-600 text-white px-5 py-1 rounded">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatRoomPrivate;
