import axios from "axios";

export const sendMessage = async (idInstance: string, apiTokenInstance: string, phone: string, message: string) => {
  const url = `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`;
  const data = {
    chatId: `${phone}@c.us`,
    message: message,
  };

  try {
    const response = await axios.post(url, data);
    console.log("Сообщение отправлено:", response.data);
  } catch (error) {
    console.error("Ошибка отправки сообщения:", error);
  }
};
