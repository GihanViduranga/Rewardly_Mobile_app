import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router';
import { changePassword } from '@/services/authService';

const SettingScreen = () => {
    const [password, setPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async () => {
        try{
            if (loading)
                setLoading(true);
            await changePassword(currentPassword, password)
            .then(() => {
                router.back();
            }).catch((error) => {
                console.log(error);
                Alert.alert("Change password failed. Please try again.");
            }).finally(() => {
                setLoading(false);
            })
        }catch(error){
            console.log(error);
            Alert.alert("Change password failed. Please try again.");
        }
    }
    return (
        <View className="flex-1 justify-center items-center bg-white px-6">
            <Text className="text-4xl font-bold mb-6 text-green-800">Change Password</Text>

                <TextInput
                    className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-4 text-base text-black"
                    placeholder="Current Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                />
        
                <TextInput
                    className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-4 text-base text-black"
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
        
                <TextInput
                    className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-6 text-base text-black"
                    placeholder="Confirm Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
        
                <TouchableOpacity
                    className="w-full bg-green-500 py-3 rounded-lg items-center"
                    onPress={handleChangePassword}
                >
                    <Text className="text-white font-bold text-lg">Change Password</Text>
                </TouchableOpacity>
        </View>
    )
}

export default SettingScreen