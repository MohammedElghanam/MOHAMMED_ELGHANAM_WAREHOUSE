import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { Link, Redirect, useRouter } from 'expo-router';

export default function Index() {
    const router = useRouter();
    useEffect(() => {
        const checkToken = async () => {
            // await AsyncStorage.removeItem('token');
            const token = await AsyncStorage.getItem('token');
            if (token) {
                router.replace('/(home)');
            } else {
                router.replace('/(auth)/login');
            }
        };
        checkToken();
    }, [router]);

//   return (
//     <Redirect href="/(home)" />
//   )
}