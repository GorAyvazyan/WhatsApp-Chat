import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";

const AuthForm = ({ onAuth }: { onAuth: (id: string, token: string) => void }) => {
  const [idInstance, setIdInstance] = useState("7105184307");
  const [apiTokenInstance, setApiTokenInstance] = useState("1919e63a03854fe797bc69f10ec7b8a636718a034c1b40ac98");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuth(idInstance, apiTokenInstance);
  };

  return (
    <div className="flex items-center  justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">WhatsApp Chat</h1>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="idInstance"
            value={idInstance}
            onChange={(e) => setIdInstance(e.target.value)}
            className="w-full py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
          <Input
            type="text"
            placeholder="apiTokenInstance"
            value={apiTokenInstance}
            onChange={(e) => setApiTokenInstance(e.target.value)}
            className="w-full py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
          <Button
            type="submit"
            className="w-full font-semibold text-md bg-green-500 text-white p-5 rounded-lg hover:bg-green-600 hover:border-0 focus:outline-0 border-0 transition duration-300"
          >
            Войти
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
