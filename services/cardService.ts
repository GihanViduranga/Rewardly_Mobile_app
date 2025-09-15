import api from "./config/api";
import { Card } from "@/types/card";
import { auth } from '@/firebase';

export const getCards = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");
    const response = await api.get(`/Card?userId=${user.uid}`);
    return response.data;
}

export const saveCard = async (card: Card) => {
    try{
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");
    const response = await api.post("/Card", { ...card, userId: user.uid });
    return response.data;
    } catch (error) {
        console.log("Error saving card", error);
    }
    
}

export const deleteCard = async (id: string) => {
    await api.delete(`/Card/${id}`);
}

export const updateCard = async (id: string, card: Card) => {
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");
    await api.put(`/Card/${id}`, { ...card, userId: user.uid });
}

export const getCard = async (id: string) => {
    const response = await api.get(`/Card/${id}`);
    return response.data;
}
