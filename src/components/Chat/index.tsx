import { useState, useEffect } from "react";
import { sendMessage } from "@/api/sendMessages.ts";
import { fetchMessage } from "@/api/fetchMessages.ts";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import UserIcon from "@/assets/images/user.png";

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

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    try {
      await sendMessage(idInstance, apiTokenInstance, phone, message);
      setMessages((prevMessages) => [...prevMessages, { text: message, isMe: true }]);
      setNewMessage("");
    } catch (error) {
      console.error("Ошибка отправки сообщения:", error);
    }
  };

  const handleReceiveMessages = async () => {
    try {
      const message = await fetchMessage(idInstance, apiTokenInstance);
      if (message !== null) {
        setMessages((prevMessages) => [...prevMessages, { text: message, isMe: false }]);
      }
    } catch (error) {
      console.error("Ошибка получения сообщения:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newMessage.trim()) {
      e.preventDefault();
      handleSendMessage(newMessage);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleReceiveMessages();
    }, 5000);

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex items-center bg-white p-4 shadow-md">
        <img src={UserIcon} width={40} height={40} alt="" />
        <p className="text-md md:text-lg text-gray-800 font-bold ml-3">Чат с {phone}</p>
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
            className="flex-1 text-md md:text-lg text-black py-6 border border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus-visible:ring-green-500"
            placeholder="Введите сообщение..."
          />
          <Button
            onClick={() => handleSendMessage(newMessage)}
            disabled={!newMessage.trim()}
            className="bg-green-500 text-white font-semibold text-md md:text-lg p-6 rounded-lg hover:border-none border-0 focus:outline-none focus:ring-1 focus:ring-green-600  hover:bg-green-600 transition duration-300"
          >
            Отправить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
