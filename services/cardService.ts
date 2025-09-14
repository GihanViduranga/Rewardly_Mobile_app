import api from "./config/api";

export const getCards = async () => {
    const response = await api.get("/Card");
    return response.data;
}