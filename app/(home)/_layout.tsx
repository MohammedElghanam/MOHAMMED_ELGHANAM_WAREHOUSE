import { Tabs } from 'expo-router'
import { StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import Header from '@/components/UI/header';

export default function _layout() {

  return (
    <>
        <StatusBar backgroundColor="#B2A5FF" style="light" />
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#B2A5FF',
                tabBarInactiveTintColor: '#ADA991',
                tabBarStyle: {
                    backgroundColor: 'white',
                    borderTopWidth: 1,
                    borderTopColor: '#B2A5FF',
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 6,
                }
            }}
        >
            <Tabs.Screen 
                name="index" 
                options={{
                    headerShown: false, 
                    title: 'Index',
                    tabBarShowLabel: true,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                    // headerRight: () => (
                    //     <Header />
                    // ),
                    // headerTitle: () => (
                    //     <Ionicons name="home" size={24} color={'red'} />
                    // ),
                }}
            />            
            <Tabs.Screen 
                name="favorties" 
                options={{ 
                    title: 'favorties',
                    tabBarShowLabel: true,
                    tabBarIcon: ({ color, size }) => <Ionicons name="heart-outline" size={size} color={color} />,
                    headerShown: false,
                }}
            />
            <Tabs.Screen 
                name="productScanner" 
                options={{ 
                    title: 'Scanner',
                    tabBarShowLabel: true,
                    tabBarIcon: ({ color, size }) => <Ionicons name="qr-code-outline" size={size} color={color} />,
                    headerShown: false,
                }}
            />
            <Tabs.Screen 
                name="analytics" 
                options={{ 
                    title: 'analytics',
                    tabBarShowLabel: true,
                    tabBarIcon: ({ color, size }) => <Ionicons name="analytics" size={size} color={color} />,
                    headerShown: false,
                }}
            />
        </Tabs>
    </>
  )
}