import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Tabs, useRouter } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'


const tabs = [
    {label: 'Home', name: 'home', icon: 'home'},
    {label: 'Card', name: 'card', icon: 'card-giftcard'},
] as const

const DashboardLayout = () => {
    const router = useRouter();
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: "#009432",
            tabBarInactiveTintColor: "#8E8E93",
            tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
            tabBarStyle: {
                height: 80,
                paddingTop: 10,
                paddingBottom: 20,
                backgroundColor: '#ffffff',
                borderTopWidth: 1,
                borderTopColor: '#e5e5e5',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 5
            },
            headerShown: false,
            tabBarShowLabel: true,
            tabBarIconStyle: { marginTop: 5 }
        }}>
            {tabs.map(({name, icon, label}) => (
                <Tabs.Screen
                    key={name}
                    name={name}
                    options={{
                        title: label,
                        tabBarIcon: ({color, size }) => (
                            <MaterialIcons name={icon} color={color} size={size} />
                        )
                    }}
                />
            ))}
        </Tabs>
    )
}

export default DashboardLayout