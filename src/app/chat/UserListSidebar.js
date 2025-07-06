'use client';

import { useEffect, useState } from 'react';
import { getAllUsers } from '@/api/user';
import { useGlobalSocket } from '@/context/SocketContext';

const UserListSidebar = ({
  currentUserId,
  onSelectUser,
  onlineUsers = {},
  unseenMessages = {},
  showSidebar = true,
  onCloseSidebar = () => {},
}) => {
  const [users, setUsers] = useState([]);
  const socket = useGlobalSocket();

  useEffect(() => {
    getAllUsers()
      .then(setUsers)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handlePresence = () => {
      console.log('Presence event received in sidebar');
    };

    socket.on('presence', handlePresence);
    return () => socket.off('presence', handlePresence);
  }, [socket]);

  return (
    <div
      className={`w-full md:w-64 p-3 border-r dark:border-gray-600 h-screen overflow-y-auto bg-white dark:bg-gray-800 ${
        showSidebar ? 'block' : 'hidden'
      } md:block`}
    >
      {/* Close button for small screens */}
      <div className="flex justify-end md:hidden mb-2">
        <button
          onClick={onCloseSidebar}
          className="text-gray-800 dark:text-white text-xl font-bold"
          title="Close sidebar"
        >
          ✕
        </button>
      </div>

      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Users</h2>
      <ul className="space-y-1">
        {users
          .filter((user) => user.id !== currentUserId)
          .map((user) => {
            const isOnline = !!onlineUsers[user.id];
            const newMsgCount = unseenMessages[user.id] || 0;

            return (
              <li
                key={user.id}
                onClick={() => onSelectUser(user)}
                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded relative transition-colors"
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    isOnline ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                />
                <img
                  src={
                    user.profileImageUrl
                      ? user.profileImageUrl.replace(/^http:\/\//, 'https://')
                      : '/default.jpg'
                  }
                  alt="avatar"
                  className="w-6 h-6 rounded-full object-cover"
                />

                <span className="text-gray-800 dark:text-white truncate">{user.name}</span>

                {newMsgCount > 0 && (
                  <span className="absolute top-1 right-1 px-2 text-xs font-bold text-white bg-red-600 rounded-full">
                    {newMsgCount}
                  </span>
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default UserListSidebar;
