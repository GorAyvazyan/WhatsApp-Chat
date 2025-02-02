import { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";

const AuthForm = ({ onAuth }: { onAuth: (id: string, token: string, phoneNumber: string) => void }) => {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const step1Schema = Yup.object().shape({
    idInstance: Yup.string()
      .required("Поле idInstance не может быть пустым.")
      .matches(/^\d+$/, "idInstance должен быть числом."),
    apiTokenInstance: Yup.string()
      .required("Поле apiTokenInstance не может быть пустым.")
      .matches(/^[a-zA-Z0-9]+$/, "apiTokenInstance должен содержать только буквы и цифры."),
  });

  const step2Schema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required("Поле номера телефона не может быть пустым.")
      .matches(/^\d+$/, "Номер телефона должен содержать только цифры.")
      .min(9, "Номер телефона должен быть не менее 9 цифр.")
      .max(15, "Номер телефона должен быть не более 15 цифр."),
  });

  const handleNext = async () => {
    try {
      await step1Schema.validate({ idInstance, apiTokenInstance }, { abortEarly: false });
      setIsLoading(true);
      const response = await axios.get(
        `https://api.green-api.com/waInstance${idInstance}/getSettings/${apiTokenInstance}`
      );
      if (response.data) {
        setError("");
        setStep(2);
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setError(err.errors[0]);
      } else {
        setError("Неверные idInstance или apiTokenInstance.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await step2Schema.validate({ phoneNumber }, { abortEarly: false });
      setError("");
      onAuth(idInstance, apiTokenInstance, phoneNumber);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setError(err.errors[0]);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">WhatsApp Chat</h1>
        {error && <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg">{error}</div>}
        {step === 1 ? (
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="idInstance"
              value={idInstance}
              onChange={(e) => setIdInstance(e.target.value)}
              className="w-full py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Input
              type="text"
              placeholder="apiTokenInstance"
              value={apiTokenInstance}
              onChange={(e) => setApiTokenInstance(e.target.value)}
              className="w-full py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              type="button"
              onClick={handleNext}
              className="w-full font-semibold text-md bg-green-500 text-white p-5 rounded-lg hover:bg-green-600 hover:border-0 focus:outline-0 border-0 transition duration-300"
              disabled={!idInstance.trim() || !apiTokenInstance.trim() || isLoading}
            >
              {isLoading ? "Проверка..." : "Вперед"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Номер телефона (79991234567)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              type="submit"
              className="w-full font-semibold text-md bg-green-500 text-white p-5 rounded-lg hover:bg-green-600 hover:border-0 focus:outline-0 border-0 transition duration-300"
              disabled={!phoneNumber.trim()}
            >
              Войти
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AuthForm;
