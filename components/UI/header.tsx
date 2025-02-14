import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, StyleSheet, TextInput, Animated, Dimensions, Image } from 'react-native';
import React, { useState, useRef  } from 'react';

interface HeaderProps {
  searchQuery: string;
  handleBarcodeInput: (text: string) => void;
}

export default function Header({ searchQuery, handleBarcodeInput }: HeaderProps) {

    const animation = useRef(new Animated.Value(0)).current;
    
    const handleSearchToggle = () => {
      Animated.timing(animation, {
        toValue: animation._value === 0 ? 0.5 * Dimensions.get('window').width : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    };

    return (
        <View style={styles.header}>

            <Image
                source={require('../../assets/images/download.png')}
                style={styles.logo}
            />
            
            <Animated.View style={[styles.searchWrapper, { width: animation }]}>
                <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={handleBarcodeInput}
                />
            </Animated.View>

            <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.headerIcon} onPress={handleSearchToggle}>
                <Ionicons name="search-outline" size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerIcon}>
                <Ionicons name="notifications-outline" size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerIcon}>
                <Ionicons name="person-circle-outline" size={24} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 8,
        height: 60
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 10, 
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto',
    },
    headerIcon: {
        marginHorizontal: 8,
        marginLeft: 5,
    },
    searchWrapper: {
        overflow: 'hidden',
        position: 'absolute',
        right: 120,
    },
    searchInput: {
        padding: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        height: 36,
    },
});