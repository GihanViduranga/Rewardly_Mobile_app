import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

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
    cvv: '',
    type: 'Visa'
  });

  const cardTypes = [
    { id: 'Ponints Card', name: 'Ponints Card', color: '#1a1f71' },
    { id: 'Gift Card', name: 'Gift Card', color: '#eb001b' },
    { id: 'Lotery Card', name: 'Lotery Card', color: '#006fcf' },
    { id: 'Other', name: 'Other', color: '#ff6000' },
  ];

//   const formatCardNumber = () => {
//     // Remove all non-digit characters
//     const digits = cardData.number.replace(/\D/g, '');
    
//     // Format as XXXX XXXX XXXX XXXX
//     return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
//   };

//   const formatExpiryDate = () => {
//     // // Remove all non-digit characters
//     const digits = cardData.expiry.replace(/\D/g, '');
    
//     // Format as MM/YY
//     if (digits.length <= 2) {
//       return digits;
//     } else {
//       return digits.substring(0, 2) + '/' + digits.substring(2, 4);
//     }
//   };

//   const validateForm = () => {
//     if (!cardData.name.trim()) {
//       Alert.alert('Error', 'Please enter card holder name');
//       return false;
//     }

//     if (cardData.number.replace(/\s/g, '').length < 16) {
//       Alert.alert('Error', 'Please enter a valid card number');
//       return false;
//     }

//     if (!cardData.expiry.includes('/') || cardData.expiry.length !== 5) {
//       Alert.alert('Error', 'Please enter a valid expiry date (MM/YY)');
//       return false;
//     }

//     if (cardData.cvv.length < 3) {
//       Alert.alert('Error', 'Please enter a valid CVV');
//       return false;
//     }

//     return true;
//   };

    const handleSubmit = () => {
        // TODO: Implement actual card saving to storage/API
        // const newCard: Card = {
        //   id: Date.now().toString(),
        //   name: cardData.name,
        //   number: cardData.number,
        //   expiry: cardData.expiry,
        //   type: cardData.type
        // };
        // saveCard(newCard);
        
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
            <View className="w-full h-48 rounded-2xl p-6 mb-8 shadow-lg bg-purple-600">
            <View className="flex-row justify-between items-start">
                <View>
                    <Text className="text-white text-xs opacity-80">Card Name</Text>
                    <Text className="text-white text-xl font-bold mt-1">
                    {cardData.name || 'Your Name'}
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
                <Text className="text-gray-700 mb-2">Card Holder Name</Text>
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
                onChangeText={(text) => setCardData({...cardData, number: text.replace(/\s/g, '')})}
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

                {/* CVV */}
                {/* <View className="w-2/5">
                <Text className="text-gray-700 mb-2">CVV</Text>
                <TextInput
                    className="border border-gray-300 rounded-lg p-4"
                    placeholder="123"
                    keyboardType="numeric"
                    maxLength={4}
                    secureTextEntry={true}
                    value={cardData.cvv}
                    onChangeText={(text) => setCardData({...cardData, cvv: text})}
                />
                </View> */}
            </View>

            {/* Card Type Selection */}
            <View className="mb-5">
                <Text className="text-gray-700 mb-2">Card Type</Text>
                <View className="flex-row flex-wrap">
                {cardTypes.map((type) => (
                    <TouchableOpacity
                    key={type.id}
                    className={`px-4 py-2 rounded-full mr-2 mb-2 ${
                        cardData.type === type.id ? 'bg-purple-600' : 'bg-gray-200'
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
                className="bg-purple-600 p-4 rounded-lg items-center mt-2"
                onPress={handleSubmit}
            >
                <Text className="text-white font-bold text-lg">Add Card</Text>
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