import { useState } from "react";
import AuthForm from "@/components/AuthForm";
import Chat from "@/components/Chat";
import "./index.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleAuth = (id: string, token: string, phoneNumber: string) => {
    setIdInstance(id);
    setApiTokenInstance(token);
    setPhoneNumber(phoneNumber);
    setIsAuthenticated(true);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100">
      {isAuthenticated ? (
        <Chat idInstance={idInstance} apiTokenInstance={apiTokenInstance} phone={phoneNumber} />
      ) : (
        <AuthForm onAuth={handleAuth} />
      )}
    </div>
  );
};

export default App;
