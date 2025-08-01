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
      <ul className="overflow-y-auto h-[calc(100%-60px)] px-2 py-3 space-y-2">
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
            onCloseSidebar();
          }}
          className="flex items-center px-3 rounded-xl cursor-pointer bg-sky-300 dark:bg-gray-800 hover:bg-lime-200 dark:hover:bg-gray-700 shadow-sm transition-all relative"
        >
          {/* Avatar + Status */}
          <div className="relative">
            <img
              src={user.profileImageUrl || '/default.jpg'}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-purple-600 dark:border-gray-600"
            />
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-white dark:ring-gray-900 ${
                isOnline ? 'bg-green-500' : 'bg-gray-400'
              }`}
              title={isOnline ? 'Online' : 'Offline'}
            />
          </div>

          {/* Name */}
          <div className="flex flex-col flex-grow">
            <span className="text-gray-900 ml-2 dark:text-white font-medium truncate">
              {user.name}
            </span>
            <span className="text-sm ml-4 text-gray-500 dark:text-gray-400">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>

          {/* Unseen Message Badge */}
          {unseenCount > 0 && (
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg">
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
