import { addDoc, collection } from "firebase/firestore";
import api from "./config/api";
import { db } from "@/firebase";
import { Card } from "@/types/card";

export const getCards = async () => {
    const response = await api.get("/Card");
    return response.data;
}

export const cardRef = collection(db, "Card");
export const saveCard = async (card: Card) => {
    const response = await api.post("/Card", card);
    return response.data;
}

export const deleteCard = async (id: string) => {
    await api.delete(`/Card/${id}`);
}

export const updateCard = async (id: string, card: Card) => {
    await api.put(`/Card/${id}`, card);
}

export const getCard = async (id: string) => {
    const response = await api.get(`/Card/${id}`);
    return response.data;
}