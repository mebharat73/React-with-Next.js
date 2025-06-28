'use client';

import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useGlobalSocket } from '@/context/SocketContext';
import UserListSidebar from '@/app/chat/UserListSidebar';
import ChatRoomPrivate from '@/app/chat/ChatRoomPrivate';

export default function ChatPage() {
  const { user } = useSelector((state) => state.auth);
  const socket = useGlobalSocket();

  const [selectedUser, setSelectedUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [unseenMessages, setUnseenMessages] = useState({});

  const selectedUserRef = useRef(null);
  const userRef = useRef(null);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    selectedUserRef.current = selectedUser;
  }, [selectedUser]);

  // 1. Fetch unseen message counts on load
  useEffect(() => {
    if (!user?.id) return;

    axios
      .get(`http://localhost:5000/api/chat/unseen-count/${user.id}`)
      .then((res) => {
        setUnseenMessages(res.data); // {senderId: count, ...}
      })
      .catch(console.error);
  }, [user?.id]);

  // 2. Socket listeners for presence and new messages
  useEffect(() => {
    if (!user?.id || !socket) return;

    localStorage.setItem('userId', user.id);

    const handlePresence = (usersOnline) => {
      setOnlineUsers(usersOnline);
    };

    const handleNewMessage = (msg) => {
      const currentUser = userRef.current;
      const selected = selectedUserRef.current;

      const isIncoming = msg.senderId !== currentUser?.id;
      const isFromSelectedUser = selected?.id === msg.senderId;

      if (isIncoming && !isFromSelectedUser) {
        setUnseenMessages((prev) => ({
          ...prev,
          [msg.senderId]: (prev[msg.senderId] || 0) + 1,
        }));
      }
    };

    socket.on('presence', handlePresence);
    socket.on('newMessage', handleNewMessage);
    if (socket.connected) {
      socket.emit('getPresence');
    } else {
      socket.once('connect', () => {
        socket.emit('getPresence');
      });
    }

    return () => {
      socket.off('presence', handlePresence);
      socket.off('newMessage', handleNewMessage);
    };
  }, [user?.id, socket]);

  // 3. Mark selected chat as seen
  useEffect(() => {
    if (!user?.id || !selectedUser) return;

    setUnseenMessages((prev) => ({
      ...prev,
      [selectedUser.id]: 0,
    }));

    axios
      .post('http://localhost:5000/api/chat/mark-seen', {
        senderId: selectedUser.id,
        receiverId: user.id,
      })
      .catch(console.error);
  }, [selectedUser, user?.id]);

  if (!user) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Please log in to use chat.
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <UserListSidebar
        currentUserId={user.id}
        onSelectUser={setSelectedUser}
        onlineUsers={onlineUsers}
        unseenMessages={unseenMessages}
      />
      <div className="flex-1">
        <ChatRoomPrivate selectedUser={selectedUser} />
      </div>
    </div>
  );
}
