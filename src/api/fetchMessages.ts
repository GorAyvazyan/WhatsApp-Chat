import axios from "axios";

export const fetchMessage = async (idInstance: string, apiTokenInstance: string): Promise<string | null> => {
  const url = `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`;

  try {
    const response = await axios.get(url);
    if (response.data && response.data.body && response.data.body.messageData) {
      const message = response.data.body.messageData.textMessageData?.textMessage;
      const receiptId = response.data.receiptId;

      if (message) {
        await axios.delete(
          `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`
        );
        return message;
      }
    }
  } catch (error) {
    console.error("Ошибка получения сообщения:", error);
  }

  return null;
};
