'use client';

import { useEffect, useState } from 'react';
import { getAllUsers } from '@/api/user';
import { useGlobalSocket } from '@/context/SocketContext'; // or your socket hook/context

const UserListSidebar = ({ currentUserId, onSelectUser, unseenMessages = {} }) => {
  const [users, setUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState({}); // local state for online users

  const socket = useGlobalSocket();

  useEffect(() => {
    getAllUsers()
      .then(setUsers)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handlePresence = (onlineUsers) => {
      setOnlineUsers(onlineUsers);
    };

    socket.on('presence', handlePresence);

    // Cleanup listener on unmount or socket change
    return () => {
      socket.off('presence', handlePresence);
    };
  }, [socket]);

  return (
    <div className="w-60 p-3 border-r h-screen overflow-y-auto bg-white">
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <ul className="space-y-2">
        {users
          .filter(user => user.id !== currentUserId)
          .map(user => {
            const isOnline = !!onlineUsers[user.id]; // true if online
            const newMsgCount = unseenMessages[user.id] || 0;

            return (
              <li
                key={user.id}
                onClick={() => onSelectUser(user)}
                className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-2 rounded relative"
              >
                <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                <img
                  src={user.profileImageUrl || '/default.jpg'}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span>{user.name}</span>
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
