import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons, Octicons  } from '@expo/vector-icons';

export default function _layout() {
  return (
    <Tabs
        screenOptions={{
            tabBarActiveTintColor: 'red',
            tabBarInactiveTintColor: 'green',
            tabBarStyle: {
                backgroundColor: 'yellow',
                borderTopWidth: 1,
                borderTopColor: 'yellow',
                height: 60,
                paddingBottom: 8,
                paddingTop: 6,
            }
        }}
    >
        <Tabs.Screen 
            name="index" 
            options={{ 
                title: 'Index',
                tabBarShowLabel: true,
                tabBarIcon: () => <Ionicons  name="home" size={24} color="blue" />,
            }}
        />
        <Tabs.Screen 
            name="productScanner" 
            options={{ 
                title: 'Scanner',
                tabBarShowLabel: true,
                tabBarIcon: () => <Ionicons name="barcode" size={30} color="blue" />,
                headerShown: true,
            }}
        />
    </Tabs>
  )
}