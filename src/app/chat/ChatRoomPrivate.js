'use client';

import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useGlobalSocket } from '@/context/SocketContext';

// Helper to render file icons based on file extension
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

// Helper to check if file is image
const isImage = (attachment) => {
  const ext = (attachment?.format || attachment?.original_filename?.split('.').pop() || '').toLowerCase();
  return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext);
};

const ChatRoomPrivate = ({ selectedUser }) => {
  const { user } = useSelector((state) => state.auth);
  const socket = useGlobalSocket();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typingStatus, setTypingStatus] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const fileRef = useRef(null);
  const messageListRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Load chat history
  useEffect(() => {
    if (!user || !selectedUser) return;

    axios
      .get(`http://localhost:5000/api/chat/private?user1=${user.id}&user2=${selectedUser.id}`)
      .then((res) => setMessages(res.data))
      .catch(console.error);
  }, [user, selectedUser]);

  // Mark messages as seen
  useEffect(() => {
    if (!user || !selectedUser) return;

    axios.post('http://localhost:5000/api/chat/mark-seen', {
      senderId: selectedUser.id,
      receiverId: user.id,
    }).catch(console.error);
  }, [user, selectedUser]);

  // Socket event handlers
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (msg) => {
  if (!user || !selectedUser) return;

  const msgSenderId = String(msg.senderId);
  const msgToId = String(msg.to);
  const userId = String(user.id);
  const selectedUserId = String(selectedUser.id);

  if (
    (msgSenderId === userId && msgToId === selectedUserId) ||
    (msgSenderId === selectedUserId && msgToId === userId)
  ) {
    setMessages((prev) => [...prev, msg]);
  }
};


    const handleTyping = ({ from, isTyping }) => {
  if (!selectedUser || !selectedUser.id) return; // guard clause
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
  }, [socket, selectedUser, user]);

  // Auto scroll on new message
  useEffect(() => {
    messageListRef.current?.scrollTo({
      top: messageListRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (!socket || !selectedUser) return;

    socket.emit('typing', { to: selectedUser.id, isTyping: true });

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
        const res = await axios.post('http://localhost:5000/api/chat/upload', formData);

        const originalFilename = res.data.original_filename || selectedFile.name;

        attachment = {
          url: res.data.url,
          format: res.data.format,
          original_filename: originalFilename,
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

    socket?.emit('sendMessage', msg);
    setMessages((prev) => [...prev, msg]);
    setInput('');
    setSelectedFile(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  if (!selectedUser) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a user to start chatting
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-[90vh] p-3 bg-white rounded-xl">
      <div className="font-bold text-lg text-center mb-2">
        Chat with {selectedUser.name}
      </div>

      <div
        ref={messageListRef}
        className="overflow-y-auto bg-gray-100 p-3 rounded-lg space-y-2 grow min-h-[60%] max-h-[90%]"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[70%] sm:max-w-[75%] md:max-w-[60%] p-2 rounded-lg break-words ${

              msg.senderId === user.id ? 'ml-auto bg-green-200' : 'mr-auto bg-purple-200'
            }`}
          >
            <div className="font-semibold">{msg.senderName}</div>

            {/* Attachment Display */}
            {msg.attachment?.url && (
              <div className="mt-2">
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
                      className="text-blue-600 text-sm underline"
                    >
                      Download Image
                    </a>
                  </>
                ) : (
                  <div className="flex items-center gap-2 bg-white rounded p-2 shadow-sm border border-gray-300">
                    {renderFileIcon(
                      msg.attachment.format ||
                        msg.attachment.original_filename?.split('.').pop()
                    )}
                    <span className="text-sm font-medium text-gray-800 break-words">
                      {msg.attachment.original_filename || 'Unnamed File'}
                    </span>
                    <a
                      href={msg.attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="ml-auto text-blue-600 text-sm underline"
                    >
                      Download
                    </a>
                  </div>
                )}
              </div>
            )}

            <div className="mt-1 whitespace-pre-wrap">{msg.message}</div>

            {/* Seen status */}
            {msg.senderId === user.id && (
              <div className="text-xs text-gray-600 mt-1">
                {msg.seen ? 'Seen' : 'Sent'}
              </div>
            )}
          </div>
        ))}

        {typingStatus && (
          <div className="text-sm italic text-gray-600">{typingStatus}</div>
        )}
      </div>

      {/* File preview before sending */}
      {selectedFile && (
        <div className="flex items-center space-x-3 bg-gray-200 p-2 rounded-md mt-2 max-w-xs">
          {renderFileIcon(selectedFile.name.split('.').pop())}
          <span className="break-words font-medium">{selectedFile.name}</span>
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

      <form onSubmit={sendMessage} className="mt-2 space-y-2">
        <textarea
          value={input}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
          placeholder="Type a message..."
          rows={3}
        />
        <div className="flex items-center space-x-2">
          <input
            type="file"
            ref={fileRef}
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="bg-yellow-400 px-2 py-1 rounded"
            title="Attach a file"
          >
            📎
          </button>
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-1 rounded"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatRoomPrivate;                           