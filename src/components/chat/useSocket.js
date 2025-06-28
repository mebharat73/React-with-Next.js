import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

let socketInstance = null;

export default function useSocket(userId) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!userId) return;

    // Prevent duplicate connections
    if (!socketInstance) {
      socketInstance = io('http://localhost:5000', {
        query: { userId }, // ✅ This makes `socket.handshake.query.userId` work
      });
    }

    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
        socketInstance = null;
      }
    };
  }, [userId]);

  return socket;
}
