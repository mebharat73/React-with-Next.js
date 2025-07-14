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

  return (
    <aside
      className={`fixed md:static top-0 left-0 z-40 w-[80vw] sm:w-[60vw] md:w-64 h-full bg-white dark:bg-gray-900 border-r dark:border-gray-700 transform ${
        showSidebar ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out md:translate-x-0`}
    >
      {/* Header with Close Button */}
      <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Users</h2>
        <button
          onClick={onCloseSidebar}
          className="text-gray-800 dark:text-white text-xl md:hidden"
          title="Close"
        >
          ✕
        </button>
      </div>

      {/* User List */}
      <ul className="overflow-y-auto h-[calc(100%-60px)] px-2 py-3 space-y-1">
        {users
          .filter((user) => user.id !== currentUserId)
          .map((user) => {
            const isOnline = !!onlineUsers[user.id];
            const unseenCount = unseenMessages[user.id] || 0;

            return (
              <li
                key={user.id}
                onClick={() => {
                  onSelectUser(user);
                  onCloseSidebar(); // auto-close on mobile
                }}
                className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-all relative"
              >
                {/* Online/Offline Dot */}
                <div
                  className={`w-3 h-3 rounded-full ${
                    isOnline ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                  title={isOnline ? 'Online' : 'Offline'}
                />

                {/* Avatar */}
                <img
                  src={user.profileImageUrl || '/default.jpg'}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                />

                {/* Name */}
                <span className="text-gray-800 dark:text-white truncate flex-grow">
                  {user.name}
                </span>

                {/* Unseen Badge */}
                {unseenCount > 0 && (
                  <span className="absolute top-1 right-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                    {unseenCount}
                  </span>
                )}
              </li>
            );
          })}
      </ul>
    </aside>
  );
};

export default UserListSidebar;
