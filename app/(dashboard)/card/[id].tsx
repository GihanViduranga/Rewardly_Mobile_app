import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import { getCards, saveCard, updateCard } from '@/services/cardService';

export interface Card {
    id: string;
    name: string;
    number: string;
    expiry: string;
    type: string;
}

const CardFormScreen = () => {
    const navigation = useNavigation();
    const [cardData, setCardData] = useState({
        name: '',
        number: '',
        expiry: '',
        type: 'Points Card'
    });

    const cardTypes = [
        { id: 'Points Card', name: 'Points Card', color: '#784630' },
        { id: 'Gift Card', name: 'Gift Card', color: '#eb001b' },
        { id: 'Lotery Card', name: 'Lotery Card', color: '#006fcf' },
        { id: 'Other', name: 'Other', color: '#ff6000' },
    ];

    const {id} = useLocalSearchParams<{id?: string}>();
    const {number} = useLocalSearchParams<{number?: string}>();
    const isNew = !id || id === 'new';

    
    React.useEffect(() => {
    const loadCard = async () => {
        if (!isNew && id) {
        const existingCards = await getCards();
        const card = existingCards.find((c: { id: string; }) => c.id === id);
        if (card) {
            setCardData(card);
        }
        }
    };
    loadCard();
    }, [id]);

    const handleSubmit = async () => {
        const newCard: Card = {
            id: Date.now().toString(),
            name: cardData.name,
            number: cardData.number,
            expiry: cardData.expiry,
            type: cardData.type
        };

        if(isNew && cardData.number === newCard.number) {
            const existingCards = await getCards();
            const duplicate = existingCards.find((c: { number: string }) => c.number === newCard.number);

            if (duplicate) {
                Alert.alert('Error', 'Card number already exists!');
                cardData.number = '';
                return;
            }

            await saveCard(newCard);
            Alert.alert(
            'Success',
            'Card added successfully!',
            [
            {
                text: 'OK',
                onPress: () => navigation.goBack()
            }
            ]
        );
        } else {
            await updateCard(id!, newCard);
            Alert.alert( 'Success', 'Card updated successfully!',
                [
                    { text: 'OK', onPress: () => navigation.goBack() }
                ] );
            }
    };

    return (
        <View className="flex-1 bg-gray-100">
        {/* Header */}
        <View className="flex-row items-center p-5 bg-white shadow-sm mt-9">
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="mr-4"
                >
                <Ionicons name="arrow-back" size={24} color="#4b5563" />
            </TouchableOpacity>
            <Text className="text-xl font-bold">Add New Card</Text>
        </View>

        <ScrollView
            className="flex-1 p-5"
            showsVerticalScrollIndicator={false}
        >
            {/* Card Preview */}
            <View className="w-full h-48 rounded-2xl p-6 mb-8 shadow-lg bg-green-900">
            <View className="flex-row justify-between items-start">
                <View>
                    <Text className="text-white text-xs opacity-80">Card Name</Text>
                    <Text className="text-white text-xl font-bold mt-1">
                    {cardData.name || 'Card Name'}
                    </Text>
                </View>
                <Ionicons name="card" size={32} color="white" />
            </View>
            
            <View className="mt-8">
                <Text className="text-white text-lg font-semibold tracking-wider">
                {cardData.number || 'XXXX XXXX XXXX XXXX'}
                </Text>
            </View>
            
            <View className="flex-row justify-between items-center mt-6">
                <View>
                    <Text className="text-white text-xs opacity-80">Expiry Date</Text>
                    <Text className="text-white text-base">
                    {cardData.expiry || 'MM/YY'}
                </Text>
                </View>
                
                <View className="items-end">
                    <Text className="text-white text-xs opacity-80">Card Type</Text>
                    <Text className="text-white text-base">{cardData.type}</Text>
                </View>
            </View>
            </View>

            {/* Form */}
            <View className="bg-white rounded-2xl p-5 shadow-sm">
            <Text className="text-lg font-bold mb-5">Card Details</Text>
            
            {/* Card Holder Name */}
            <View className="mb-5">
                <Text className="text-gray-700 mb-2">Card Name</Text>
                <TextInput
                className="border border-gray-300 rounded-lg p-4"
                placeholder="Enter full name"
                value={cardData.name}
                onChangeText={(text) => setCardData({...cardData, name: text})}
                />
            </View>

            {/* Card Number */}
            <View className="mb-5">
                <Text className="text-gray-700 mb-2">Card Number</Text>
                <TextInput
                className="border border-gray-300 rounded-lg p-4"
                placeholder="1234 5678 9012 3456"
                keyboardType="numeric"
                maxLength={19}
                value={cardData.number}
                onChangeText={(text) => setCardData({...cardData, number: text})}
                />
            </View>

            <View className="flex-row justify-between mb-5">
                {/* Expiry Date */}
                <View className="w-2/5">
                <Text className="text-gray-700 mb-2">Expiry Date</Text>
                <TextInput
                    className="border border-gray-300 rounded-lg p-4"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={cardData.expiry}
                    onChangeText={(text) => setCardData({...cardData, expiry: text})}
                />
                </View>
            </View>

            {/* Card Type Selection */}
            <View className="mb-5">
                <Text className="text-gray-700 mb-2">Card Type</Text>
                <View className="flex-row flex-wrap">
                {cardTypes.map((type) => (
                    <TouchableOpacity
                    key={type.id}
                    className={`px-4 py-2 rounded-full mr-2 mb-2 ${
                        cardData.type === type.id ? 'bg-green-900' : 'bg-gray-200'
                    }`}
                    onPress={() => setCardData({...cardData, type: type.id})}
                    >
                    <Text className={cardData.type === type.id ? 'text-white' : 'text-gray-800'}>
                        {type.name}
                    </Text>
                    </TouchableOpacity>
                ))}
                </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
                className="bg-green-900 p-4 rounded-lg items-center mt-2"
                onPress={handleSubmit}
            >
                <Text className="text-white font-bold text-lg">{isNew ? "Add Card" : "Update Card"}</Text>
            </TouchableOpacity>
            </View>

            {/* Security Note */}
            <View className="mt-5 p-4 bg-blue-50 rounded-lg">
            <View className="flex-row items-start">
                <Ionicons name="lock-closed" size={20} color="#3b82f6" className="mr-2 mt-0.5" />
                <Text className="text-blue-800 text-sm">
                Your card details are encrypted and securely stored. We never share your information with third parties.
                </Text>
            </View>
            </View>
        </ScrollView>
        </View>
    );
}

export default CardFormScreen;