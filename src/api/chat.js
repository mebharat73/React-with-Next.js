import config from "@/config/config";
import authToken from "@/constants/authToken";
import axios from "axios";

// Get messages between two users
async function getPrivateMessages(user1, user2) {
  const token = authToken();
  const response = await axios.get(`${config.apiUrl}/api/chat/private`, {
    params: { user1, user2 },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

// Mark messages as seen from sender to receiver
async function markMessagesAsSeen(senderId, receiverId) {
  const token = authToken();
  await axios.post(
    `${config.apiUrl}/api/chat/mark-seen`,
    { senderId, receiverId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

// Get unseen message count for a user
async function getUnseenMessageCount(userId) {
  const token = authToken();
  const response = await axios.get(`${config.apiUrl}/api/chat/unseen-count/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data; // { senderId1: count, senderId2: count, ... }
}

export {
  getPrivateMessages,
  markMessagesAsSeen,
  getUnseenMessageCount,
};
