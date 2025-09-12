import { register } from "@/services/authService";
import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!email || !password || !confirmPassword) {
        alert("Please fill all fields");
        return;
        }
        if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
        }

        if (loading)
            setLoading(true);
        await register(email, password)
        .then(() => {
            router.back(); //login ekata back wenna oni
        }).catch((error) => {
            console.log(error);
            Alert.alert("Registration failed. Please try again.");
        }).finally(() => {
            setLoading(false);
        })

        alert(`Registered with: ${email}`);
    };

    return (
        <View className="flex-1 justify-center items-center bg-white px-6">
        <Text className="text-3xl font-bold mb-6 text-gray-800">Create Account</Text>

        <TextInput
            className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-4 text-base text-black"
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
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
            className="w-full bg-blue-500 py-3 rounded-lg items-center"
            onPress={handleRegister}
        >
            <Text className="text-white font-bold text-lg">Register</Text>
        </TouchableOpacity>

        <TouchableOpacity className="mt-4" onPress={() => router.push("/login")}>
            <Text className="text-blue-500 font-semibold">Already have an account? Login</Text>
        </TouchableOpacity>
        </View>
    );
};

export default Register;
