import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false, animation: 'ios_from_left' }}>
            <Stack.Screen name='register' options={{ title: 'Register' }} />
            <Stack.Screen name='login' options={{ title: 'Login' }} />
        </Stack>
    )
}

export default AuthLayout