import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const CardLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='[id]' options={{ headerShown: false}} />
        </Stack>
    )
}

export default CardLayout