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
  const [isMobileView, setIsMobileView] = useState(false);

  const selectedUserRef = useRef(null);
  const userRef = useRef(null);

  // Detect screen width for responsive layout
  useEffect(() => {
    const checkView = () => {
      setIsMobileView(window.innerWidth < 640); // Tailwind 'sm' breakpoint
    };
    checkView();
    window.addEventListener('resize', checkView);
    return () => window.removeEventListener('resize', checkView);
  }, []);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    selectedUserRef.current = selectedUser;
  }, [selectedUser]);

  // Load unseen message counts
  useEffect(() => {
    if (!user?.id) return;
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/unseen-count/${user.id}`)
      .then((res) => setUnseenMessages(res.data))
      .catch(console.error);
  }, [user?.id]);

  // Handle presence and new messages via socket
  useEffect(() => {
    if (!user?.id || !socket) return;

    localStorage.setItem('userId', user.id);

    const handlePresence = (usersOnline) => {
      setOnlineUsers(usersOnline);
    };

    const handleNewMessage = (msg) => {
      const currentUser = userRef.current;
      const selected = selectedUserRef.current;

      const msgSenderId = String(msg.senderId);
      const currentUserId = String(currentUser?.id);
      const selectedUserId = String(selected?.id);

      const isIncoming = msgSenderId !== currentUserId;
      const isFromSelectedUser = msgSenderId === selectedUserId;

      if (isIncoming && !isFromSelectedUser) {
        setUnseenMessages((prev) => ({
          ...prev,
          [msgSenderId]: (prev[msgSenderId] || 0) + 1,
        }));
      }
    };

    socket.on('presence', handlePresence);
    socket.on('newMessage', handleNewMessage);

    if (socket.connected) {
      socket.emit('getPresence');
    } else {
      socket.once('connect', () => socket.emit('getPresence'));
    }

    return () => {
      socket.off('presence', handlePresence);
      socket.off('newMessage', handleNewMessage);
    };
  }, [user?.id, socket]);

  // Reset unseen count for active chat
  useEffect(() => {
    if (!user?.id || !selectedUser) return;

    setUnseenMessages((prev) => ({
      ...prev,
      [selectedUser.id]: 0,
    }));

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/mark-seen`, {
        senderId: selectedUser.id,
        receiverId: user.id,
      })
      .catch(console.error);
  }, [selectedUser, user?.id]);

  // Responsive layout logic
  const showUserList = isMobileView ? !selectedUser : true;
  const showChatRoom = isMobileView ? !!selectedUser : true;

  if (!user) {
    return <div className="text-center mt-10 text-gray-600">Please log in to use chat.</div>;
  }

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-white dark:bg-gradient-to-tl dark:from-[#b4b0b0] dark:to-[#504e4e] text-gray-900 dark:text-white">
      {/* Sidebar */}
      {showUserList && (
        <div className="w-full sm:w-64 border-b sm:border-b-0 sm:border-r dark:border-gray-600">
          <UserListSidebar
            currentUserId={user.id}
            onSelectUser={setSelectedUser}
            onlineUsers={onlineUsers}
            unseenMessages={unseenMessages}
          />
        </div>
      )}

      {/* Chat Section */}
      {showChatRoom && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <ChatRoomPrivate
            selectedUser={selectedUser}
            onBack={isMobileView ? () => setSelectedUser(null) : null}
          />
        </div>
      )}
    </div>
  );
}
