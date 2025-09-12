import { View, Text, Image } from 'react-native';
import React from 'react';

const TopImage = require("./../../assets/images/AppIcon.jpg");

const Home = () => {
    return (
        <View className="flex-1 items-center justify-center bg-blue-50 p-6">
            <Text className="text-2xl font-semibold text-blue-800 mb-6">Hello User</Text>
            
            <View className="bg-white p-6 rounded-2xl shadow-lg items-center">
                <Image 
                    source={TopImage} 
                    className="w-64 h-64 rounded-xl mb-4"
                    resizeMode="cover"
                />
                <Text className="text-lg text-gray-600 text-center">
                    Welcome to our app! This is your personalized dashboard.
                </Text>
            </View>
            
            <View className="flex-row mt-8">
                <View className="bg-blue-500 px-4 py-2 rounded-lg mr-3">
                    <Text className="text-white font-medium">Profile</Text>
                </View>
                <View className="bg-green-500 px-4 py-2 rounded-lg">
                    <Text className="text-white font-medium">Settings</Text>
                </View>
            </View>
        </View>
    );
};

export default Home;