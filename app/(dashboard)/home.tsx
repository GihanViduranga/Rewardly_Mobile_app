import { getCards } from '@/services/cardService';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Card } from '../../types/card';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native';

const cardTypes = {
    PonintsCard: { color: '#1a1f71', icon: 'card' },
    GiftCard: { color: '#009432', icon: 'card' },
    LoteryCard: { color: '#006fcf', icon: 'card' },
    Other: { color: '#5c6bc0', icon: 'card' },
};

const Home = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (!isFocused) return;
        const loadCards = async () => {
        try {
            const data = await getCards();
            setCards(data);
        } catch (error) {
            console.log('Error loading cards', error);
        } finally {
            setLoading(false);
        }
        };
        loadCards();
    }, [isFocused]);

    if (loading) {
    return (
        <View className="flex-1 justify-center items-center bg-white">
            <LottieView
            source={require('../../assets/loading/loading.json')}
            autoPlay
            loop
            style={{ width: 200, height: 200 }}
            />
            <Text className="mt-4 text-lg text-gray-700">Loading cards...</Text>
        </View>
        );
    }

    const CardItem = ({ card }: { card: Card }) => {
        const cardInfo = cardTypes[card.type as keyof typeof cardTypes] || cardTypes.Other;

        return (
        <View
            style={{ backgroundColor: cardInfo.color }}
            className="w-64 h-44 rounded-2xl p-4 shadow-lg mt-6 ml-4"
        >
            <View className="flex-row justify-between items-start">
            <View>
                <Text className="text-white text-xs opacity-80">Card Name</Text>
                <Text className="text-white text-xl font-bold mt-1">{card.name}</Text>
            </View>
            <Ionicons name={cardInfo.icon as any} size={32} color="white" />
            </View>

            <View className="mt-8">
            <Text className="text-white text-lg font-semibold tracking-wider">{card.number}</Text>
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
        );
    };

    return (
        <View className="flex-1 bg-blue-50">
        {/* Decorative Circle */}
            <View className="absolute -top-24 -right-24 w-[600px] h-[250px] bg-green-700 rounded-full shadow-lg z-0" />

        
            {/* Header */}
            <TouchableOpacity onPress={() => {router.push("/login")}}>
                <Ionicons className="text-1xl font-bold text-white top-16 ml-[90%]" name="log-out" size={35} color="white" />
            </TouchableOpacity>
            <Text className="text-3xl font-bold text-white mt-12 ml-4">Welcome to Rewardly 👋</Text>
            <Text className="text-center text-4xl font-bold text-white mt-9">REWARDLY</Text>

        <ScrollView className="p-4" showsVerticalScrollIndicator={false}>
            {/* Overview Card */}
                <Text className="text-2xl font-bold text-black mt-10 mb-4">Your Overview</Text>
                <View className="bg-white rounded-2xl p-6 shadow-lg">
                <Text className="text-lg font-semibold text-blue-800">Total Cards</Text>
                <Text className="text-3xl font-bold text-green-700 mt-2">{cards.length}</Text>
                <Text className="text-gray-500 mt-1">You have saved</Text>
            </View>

            {/* Why Use This App Section */}
            <View className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 mt-4 mb-6">
            <View className="flex-row items-center mb-4">
                <View className="bg-indigo-500 p-2 rounded-lg mr-3">
                <Ionicons name="sparkles" size={24} color="white" />
                </View>
                <Text className="text-2xl font-bold text-gray-900">Why choose Rewardly?</Text>
            </View>

            <View className="space-y-3">
                <View className="flex-row items-start">
                <View className="bg-indigo-100 p-2 rounded-full mt-1 mr-3">
                    <Ionicons name="card" size={16} color="#4f46e5" />
                </View>
                <View className="flex-1">
                    <Text className="text-lg font-semibold text-gray-800">Earn on every transaction</Text>
                    <Text className="text-gray-600 text-sm">
                    Get points for all your card purchases, no matter where you shop
                    </Text>
                </View>
                </View>

                <View className="flex-row items-start">
                <View className="bg-indigo-100 p-2 rounded-full mt-1 mr-3">
                    <Ionicons name="wallet" size={16} color="#4f46e5" />
                </View>
                <View className="flex-1">
                    <Text className="text-lg font-semibold text-gray-800">All cards in one place</Text>
                    <Text className="text-gray-600 text-sm">
                    Organize all your payment cards and track their rewards in a single app
                    </Text>
                </View>
                </View>

                <View className="flex-row items-start">
                <View className="bg-indigo-100 p-2 rounded-full mt-1 mr-3">
                    <Ionicons name="gift" size={16} color="#4f46e5" />
                </View>
                <View className="flex-1">
                    <Text className="text-lg font-semibold text-gray-800">Easy redemption</Text>
                    <Text className="text-gray-600 text-sm">
                    Redeem rewards instantly with our one-tap redemption system
                    </Text>
                </View>
                </View>

                <View className="flex-row items-start">
                <View className="bg-indigo-100 p-2 rounded-full mt-1 mr-3">
                    <Ionicons name="trending-up" size={16} color="#4f46e5" />
                </View>
                <View className="flex-1">
                    <Text className="text-lg font-semibold text-gray-800">Smart insights</Text>
                    <Text className="text-gray-600 text-sm">
                    Get personalized recommendations to maximize your rewards potential
                    </Text>
                </View>
                </View>
            </View>
            </View>

            {/* User Cards Section */}
            <Text className="text-2xl font-bold text-black mb-4">Your Cards</Text>
            {cards.length === 0 ? (
            <View className="items-center justify-center py-20">
                <View className="w-24 h-24 rounded-full bg-gray-200 items-center justify-center mb-5">
                <Ionicons name="card" size={40} color="#9ca3af" />
                </View>
            </View>
            ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                {cards.map((card) => (
                <CardItem key={card.number} card={card} />
                ))}
            </ScrollView>
            )}
        </ScrollView>
        </View>
    );
};

export default Home;
