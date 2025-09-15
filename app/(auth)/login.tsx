import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { login, sendResetPassword } from "@/services/authService";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const router = useRouter();

    const handleForgotPassword = async () => {
        if (!email) {
            alert("Please enter your email");
            return;
        }

        try {
            await sendResetPassword(email);
            Alert.alert("Success", "Password reset link has been sent to your email");
        } catch (error: any) {
            console.error(error);
            Alert.alert("Error", error.message || "Something went wrong");
        }
    };

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
        <View className="flex-1 justify-center bg-white px-6">
        <Text className="text-4xl font-bold mb-6 text-center text-green-800">Login</Text>

        <TextInput
            className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-4 text-base text-black"
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
        />

        <TextInput
            className="w-full h-12 border border-gray-300 rounded-lg px-4 text-base text-black"
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
        />

        <TouchableOpacity onPress={() => handleForgotPassword()}>
            <Text className="text-gray-600 m-4 right-0">
                <Text className="text-blue-500 font-bold text-right">Forgot Password ?</Text>
            </Text>
        </TouchableOpacity>

        <TouchableOpacity
            className="w-full bg-green-500 py-3 rounded-lg items-center"
            onPress={handleLogin}
        >
            <Text className="text-white font-bold text-lg">Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/register")}>
            <Text className="text-gray-600 mt-4 text-center">
                Don't have an account?{" "}
            <Text className="text-blue-500 font-bold">Register</Text>
            </Text>
        </TouchableOpacity>
        
    </View>
    );
};

export default Login;
