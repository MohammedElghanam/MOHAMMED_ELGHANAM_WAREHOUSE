import React from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categories = ['All', 'Name', 'Price Top', 'Price Lowest'];

interface CategoryFiltrageProps {
    setSelectedCategory: (category: string) => void;
}

const CategoryFiltrage = ({ setSelectedCategory}: CategoryFiltrageProps) => {

    const handleCategoryPress = (category: string) => {
        setSelectedCategory(category);
    };

    return (
        <View style={styles.container}>
            <View>
                <Ionicons name="home" size={24} color='#B2A5FF' />
                <Text>Filter</Text>
            </View>
            <FlatList
                horizontal
                data={categories}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.categoryButton, styles.selectedCategory]}
                        onPress={() => handleCategoryPress(item)}
                    >
                        <Text style={styles.categoryText}>{item}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
            />
            {/* <TouchableOpacity onPress={toggleSortOrder} style={styles.sortButton}>
                <Text style={styles.sortText}>Toggle Sort Order</Text> 
            </TouchableOpacity> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 10 },
    categoryButton: { margin: 5, padding: 10, backgroundColor: '#eee', borderRadius: 5 },
    selectedCategory: { backgroundColor: '#B2A5FF' },
    categoryText: { color: '#333' }
    
});

export default CategoryFiltrage;
