import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { login } from "@/services/authService";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const router = useRouter();



    const handleLogin = async () => {
        if (!email || !password) {
            alert("Please enter both email and password");
            return;
        }

        if (isLoading)
            setIsLoading(true);
            await login(email, password)
            .then(() => {
                router.push("/home");
            }).catch((error) => {
                console.log(error);
                Alert.alert("Login failed. Please try again.");
            }).finally(() => {
                setIsLoading(false);
            })
        alert(`Logging in with: ${email}`);
    };

    return (
        <View className="flex-1 justify-center items-center bg-white px-6">
        <Text className="text-3xl font-bold mb-6 text-gray-800">Login</Text>

        <TextInput
            className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-4 text-base text-black"
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
        />

        <TextInput
            className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-6 text-base text-black"
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
        />

        <TouchableOpacity
            className="w-full bg-blue-500 py-3 rounded-lg items-center"
            onPress={handleLogin}
        >
            <Text className="text-white font-bold text-lg">Login</Text>
        </TouchableOpacity>

    
        <TouchableOpacity onPress={() => router.push("/register")}>
            <Text className="text-gray-600 mt-4">
                Don't have an account?{" "}
            <Text className="text-blue-500 font-bold">Register</Text>
            </Text>
        </TouchableOpacity>
    </View>
    );
};

export default Login;
