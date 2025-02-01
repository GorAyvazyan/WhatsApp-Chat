import { useState, useEffect } from "react";
import axios from "axios";
import UserIcon from "@/assets/images/user.png";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";

const Chat = ({
  idInstance,
  apiTokenInstance,
  phone,
}: {
  idInstance: string;
  apiTokenInstance: string;
  phone: string;
}) => {
  const [messages, setMessages] = useState<Array<{ text: string; isMe: boolean }>>([]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const url = `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`;
    const data = {
      chatId: `${phone}@c.us`,
      message: message,
    };

    try {
      const response = await axios.post(url, data);
      console.log("Сообщение отправлено:", response.data);
      setMessages([...messages, { text: message, isMe: true }]);
      setNewMessage("");
    } catch (error) {
      console.error("Ошибка отправки сообщения:", error);
    }
  };

  const receiveMessage = async () => {
    const url = `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`;

    try {
      const response = await axios.get(url);
      if (response.data) {
        const message = response.data.body.messageData.textMessageData.textMessage;
        console.log("Новое сообщение:", message);
        setMessages([...messages, { text: message, isMe: false }]);

        await axios.delete(
          `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${response.data.receiptId}`
        );
      }
    } catch (error) {
      console.error("Ошибка получения сообщения:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newMessage.trim()) {
      e.preventDefault();
      sendMessage(newMessage);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      receiveMessage();
    }, 5000);

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex items-center bg-white p-4 shadow-md">
        <img src={UserIcon} width={40} height={40} alt="" />
        <h1 className="text-lg text-gray-800 font-bold ml-3">Чат с {phone}</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                msg.isMe ? "bg-green-200 text-gray-800 font-medium" : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 shadow-md">
        <div className="flex space-x-2">
          <Input
            type="text"
            value={newMessage}
            onKeyDown={handleKeyDown}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 text-black py-6 border border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus-visible:ring-green-500"
            placeholder="Введите сообщение..."
          />
          <Button
            onClick={() => sendMessage(newMessage)}
            disabled={!newMessage.trim()}
            className="bg-green-500 text-white font-semibold text-md lg:text-lg p-6 rounded-lg hover:border-none border-0 focus:outline-none focus:ring-1 focus:ring-green-600  hover:bg-green-600 transition duration-300"
          >
            Отправить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
