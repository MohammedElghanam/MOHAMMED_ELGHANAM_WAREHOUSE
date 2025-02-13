import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet, View } from 'react-native';

const categories = ['All', 'Name', 'Type', 'Price', 'Supplier'];

interface Product {
    name: string;
    type: string;
    price: number;
    supplier: string;
    quantity: number;
}

const CategoryFiltrage = () => {

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const handleCategoryPress = (category: string) => {
        setSelectedCategory(category);
        filterAndSortProducts(searchQuery, category);
    };

    interface FilterAndSortProductsProps {
        query: string;
        category: string;
    }

    const products: Product[] = [
        { name: 'Product1', type: 'Type1', price: 100, supplier: 'Supplier1', quantity: 10 },
        { name: 'Product2', type: 'Type2', price: 200, supplier: 'Supplier2', quantity: 20 },
        // Add more products as needed
    ];

    const filterAndSortProducts = (query: string, category: string) => {
        let filtered = products.filter((product: Product) => 
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.type.toLowerCase().includes(query.toLowerCase()) ||
          product.supplier.toLowerCase().includes(query.toLowerCase())
        );

        if (category === 'Price') {
          filtered.sort((a, b) => a.price - b.price);
        } else if (category === 'Name') {
          filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (category === 'Quantity') {
          filtered.sort((a, b) => a.quantity - b.quantity);
        }

        setSortedProducts(filtered);
    };
  
    return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.categoryButton, selectedCategory === item && styles.selectedCategory]}
            onPress={() => handleCategoryPress(item)}
          >
            <Text style={styles.categoryText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: { padding: 10 },
  categoryButton: { margin: 5, padding: 10, backgroundColor: '#eee', borderRadius: 5 },
  selectedCategory: { backgroundColor: '#3498db' },
  categoryText: { color: '#333' },
  searchInput: { margin: 10, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
  productItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' }
});

export default CategoryFiltrage;
function setSortedProducts(filtered: Product[]) {
    throw new Error('Function not implemented.');
}

