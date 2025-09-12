import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useRouter } from 'expo-router';

// Import the Card interface
export interface Card {
    id: string;
    name: string;
    number: string;
    expiry: string;
    type: string;
}

    const CardScreen = () => {
    const router = useRouter();
    const isFocused = useIsFocused();
    const [cards, setCards] = useState<Card[]>([]);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [loading, setLoading] = useState(true);

    // Load cards from storage when screen is focused
    React.useEffect(() => {
        if (isFocused) {
        loadCards();
        }
    }, [isFocused]);

    const loadCards = async () => {
        
    };

    const cardTypes = {
        PonintsCard: { color: '#1a1f71', icon: 'card' },
        GiftCard: { color: '#eb001b', icon: 'card' },
        LoteryCard: { color: '#006fcf', icon: 'card' },
        Other: { color: '#5c6bc0', icon: 'card' },
    };

    // const formatCardNumber = (number: string) => {
    //     // Remove all non-digit characters
    //     const digits = number.replace(/\D/g, '');
        
    //     // Format as XXXX XXXX XXXX XXXX
    //     return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    // };

    const handleCardPress = (card: Card) => {
        setSelectedCard(card.id === selectedCard?.id ? null : card);
    };

    const handleAddCard = () => {
        router.push('/(dashboard)/card/new');
    };

    const handleDeleteCard = async (card: Card) => {
        
    };

    const CardItem = ({ card }: { card: Card }) => {
        const cardInfo = cardTypes[card.type as keyof typeof cardTypes] || cardTypes.Other;
        const isSelected = selectedCard?.id === card.id;
        
        return (
        <TouchableOpacity onPress={() => handleCardPress(card)}>
            <View
            style={{ backgroundColor: cardInfo.color }}
            className="w-full h-48 rounded-2xl p-6 mb-4 shadow-lg"
            >
            <View className="flex-row justify-between items-start">
                <View>
                <Text className="text-white text-xs opacity-80">Card Name</Text>
                <Text className="text-white text-xl font-bold mt-1">{card.name}</Text>
                </View>
                <Ionicons name={cardInfo.icon as any} size={32} color="white" />
            </View>
            
            <View className="mt-8">
                <Text className="text-white text-lg font-semibold tracking-wider">
                {}
                </Text>
            </View>
            
            <View className="flex-row justify-between items-center mt-6">
                <View>
                <Text className="text-white text-xs opacity-80">Expiry Date</Text>
                <Text className="text-white text-base">{card.expiry}</Text>
                </View>
                
                <View className="items-end">
                <Text className="text-white text-xs opacity-80">Card Type</Text>
                <Text className="text-white text-base">{card.type}</Text>
                </View>
            </View>
            </View>

            {isSelected && (
            <View className="flex-row justify-between items-center mt-2 mb-6">
                <TouchableOpacity 
                className="flex-row items-center bg-red-100 px-4 py-2 rounded-full"
                onPress={() => handleDeleteCard(card)}
                >
                <Ionicons name="trash" size={16} color="#dc2626" />
                <Text className="text-red-600 ml-2">Delete</Text>
                </TouchableOpacity>
                
                <TouchableOpacity className="flex-row items-center bg-blue-100 px-4 py-2 rounded-full">
                <Ionicons name="pencil" size={16} color="#2563eb" />
                <Text className="text-blue-600 ml-2">Edit</Text>
                </TouchableOpacity>
            </View>
            )}
        </TouchableOpacity>
        );
    };

    if (false) { // TODO: Replace with actual loading state
        return (
        <View className="flex-1 bg-gray-100 justify-center items-center">
            <Text className="text-gray-500">Loading your cards...</Text>
        </View>
        );
    }

    return (
        <View className="flex-1 bg-gray-100">
            {/* Header */}
            <View className="flex-row justify-between items-center p-5 mt-9 bg-white shadow-sm">
                <View>
                <Text className="text-xl font-bold">Card Wallet</Text>
                </View>
                <TouchableOpacity
                className="w-10 h-10 rounded-full bg-purple-100 items-center justify-center"
                onPress={handleAddCard}
                >
                <Ionicons name="add" size={24} color="#9333ea" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                <View className="p-5">
                {cards.length === 0 ? (
                    <View className="items-center justify-center py-20">
                    <View className="w-24 h-24 rounded-full bg-gray-200 items-center justify-center mb-5">
                        <Ionicons name="card" size={40} color="#9ca3af" />
                    </View>
                    <Text className="text-gray-500 text-lg font-medium mb-2">No cards yet</Text>
                    <Text className="text-gray-400 text-center mb-6">
                        Add your first card to get started
                    </Text>
                    <TouchableOpacity 
                        className="bg-purple-600 px-6 py-3 rounded-full"
                        onPress={handleAddCard}
                    >
                        <Text className="text-white font-medium">Add Your First Card</Text>
                    </TouchableOpacity>
                    </View>
                ) : (
                    <>
                    <Text className="text-lg font-bold mb-4">Your Cards ({cards.length})</Text>
                    {cards.map((card) => (
                        <CardItem key={card.id} card={card} />
                    ))}
                    </>
                )}
                </View>
            </ScrollView>
        </View>
    );
};

export default CardScreen;