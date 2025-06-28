'use client';

import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useGlobalSocket } from '@/context/SocketContext';

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

  // Mark messages as seen when selectedUser is opened
  useEffect(() => {
    if (!user || !selectedUser) return;

    const markAsSeen = async () => {
      try {
        await axios.post('http://localhost:5000/api/chat/mark-seen', {
          senderId: selectedUser.id,
          receiverId: user.id,
        });
      } catch (err) {
        console.error('Failed to mark messages as seen', err);
      }
    };

    markAsSeen();
  }, [user, selectedUser]);

  // Handle socket events
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (msg) => {
      if (!user || !selectedUser) return;

      const isRelevant =
        (msg.senderId === user.id && msg.to === selectedUser.id) ||
        (msg.senderId === selectedUser.id && msg.to === user.id);

      if (isRelevant) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    const handleTyping = ({ from, isTyping }) => {
      if (!selectedUser) return;
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

  // Scroll to bottom when messages update
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
        attachment = res.data.url;
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
        className="flex-1 overflow-y-auto bg-gray-100 p-3 rounded-lg space-y-2"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-xs p-2 rounded-lg ${
              msg.senderId === user.id ? 'ml-auto bg-green-200' : 'mr-auto bg-purple-200'
            }`}
          >
            <div className="font-semibold">{msg.senderName}</div>
            {msg.attachment && (
              <img
                src={msg.attachment}
                alt="attachment"
                className="w-40 h-auto rounded-md mt-1"
              />
            )}
            <div>{msg.message}</div>
            {msg.senderId === user.id && (
              <div className="text-xs text-gray-600 mt-1">{msg.seen ? 'Seen' : 'Sent'}</div>
            )}
          </div>
        ))}

        {typingStatus && (
          <div className="text-sm italic text-gray-600">{typingStatus}</div>
        )}
      </div>

      <form onSubmit={sendMessage} className="mt-2 space-y-2">
        <textarea
          value={input}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
          placeholder="Type a message..."
        />
        {selectedFile && (
          <div className="flex items-center justify-between bg-gray-200 p-2 rounded">
            <span>{selectedFile.name}</span>
            <button type="button" onClick={() => setSelectedFile(null)}>
              ❌
            </button>
          </div>
        )}
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
          >
            📎
          </button>
          <button type="submit" className="bg-purple-600 text-white px-4 py-1 rounded">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatRoomPrivate;
