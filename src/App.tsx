import { lazy, useState, Suspense } from "react";
import Loader from "@/components/Loader";
import "./index.css";

const AuthForm = lazy(() => import("@/components/AuthForm"));
const Chat = lazy(() => import("@/components/Chat"));

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
      <Suspense fallback={<Loader />}>
        {isAuthenticated ? (
          <Chat idInstance={idInstance} apiTokenInstance={apiTokenInstance} phone={phoneNumber} />
        ) : (
          <AuthForm onAuth={handleAuth} />
        )}
      </Suspense>
    </div>
  );
};

export default App;
