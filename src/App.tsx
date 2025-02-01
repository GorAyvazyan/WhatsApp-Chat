import { useState } from "react";
import AuthForm from "@/components/AuthForm";
import Chat from "@/components/Chat";
import "./index.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [idInstance, setIdInstance] = useState("7105184307");
  const [apiTokenInstance, setApiTokenInstance] = useState("1919e63a03854fe797bc69f10ec7b8a636718a034c1b40ac98");
  const phone = "37455199924";

  const handleAuth = (id: string, token: string) => {
    setIdInstance(id);
    setApiTokenInstance(token);
    setIsAuthenticated(true);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100">
      {isAuthenticated ? (
        <Chat idInstance={idInstance} apiTokenInstance={apiTokenInstance} phone={phone} />
      ) : (
        <AuthForm onAuth={handleAuth} />
      )}
    </div>
  );
};

export default App;
