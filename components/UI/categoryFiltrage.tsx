import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categories = [
    { label: 'All', icon: null },
    { label: 'Name', icon: null },
    { label: 'Price Top', icon: 'arrow-up' },
    { label: 'Price Lowest', icon: 'arrow-down' }
];

interface CategoryFiltrageProps {
    setSelectedCategory: (category: string) => void;
}

const CategoryFiltrage = ({ setSelectedCategory }: CategoryFiltrageProps) => {
    const [activeCategory, setActiveCategory] = useState('All');

    const handleCategoryPress = (category: string) => {
        setActiveCategory(category);
        setSelectedCategory(category);
    };

    return (
        <View style={styles.container}>
            <View style={styles.filterContainer}>
                <Ionicons name="options-outline" size={24} color='#B2A5FF' />
                <Text style={styles.filterText}>Filter</Text>
            </View>

            <FlatList
                horizontal
                data={categories}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.categoryButton,
                            activeCategory === item.label && styles.selectedCategory
                        ]}
                        onPress={() => handleCategoryPress(item.label)}
                    >
                        {item.icon && <Ionicons name={item.icon} size={20} color='#B2A5FF' style={{ marginRight: 5 }} />}
                        <Text style={[
                            styles.categoryText,
                            activeCategory === item.label && styles.selectedText
                        ]}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.label}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        borderWidth: 0.5,
        borderRadius: 50,
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    filterText: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: '300',
        color: '#374151',
    },
    categoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderWidth: 0.5,
        borderRadius: 50,
    },
    selectedCategory: {
        backgroundColor: '#B2A5FF',
        borderWidth: 0,
    },
    categoryText: {
        color: '#374151',
        fontSize: 16,
        fontWeight: '300',
    },
    selectedText: {
        color: '#FFFFFF',
    },
});

export default CategoryFiltrage;