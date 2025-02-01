import axios from "axios";

export const receiveMessage = async (idInstance: string, apiTokenInstance: string) => {
    const url = `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`;

    try {
        const response = await axios.get(url);
        if (response.data) {
            console.log("Новое сообщение:", response.data);
                    await axios.delete(
                `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${response.data.receiptId}`
            );
        }
    } catch (error) {
        console.error("Ошибка получения сообщения:", error);
    }
};
