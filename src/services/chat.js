import chatHttp from "./chat-http";

export const chatURI = "http://localhost:8085/ws";

export const getMutualFollows = async () => {
  return await chatHttp.post("/mutual-followed");
};

export const getMessages = async (senderName, receiverName) => {
  try {
    const response = await chatHttp.post("/messages", {
      senderName,
      receiverName,
    });
    return response.data;
  } catch (error) {
    console.error("Error getting messages:", error);
    return [];
  }
};
