import useProducts from '@/hooks/products/useproducts';
import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

type Stock = {
  quantity: number;
};

type Product = {
    id: number;
    image: string;
    name: string;
    solde: number;
    price: number;
    type: string;
    stocks: Stock[];
};

export default function Index() {

    const {
        products,
        loading,
    } = useProducts();

 

    if (loading) {
        return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#3498db" />
            <Text>Loading products...</Text>
        </View>
        );
    }
  
    

    return (
        <View style={styles.container}>
        <FlatList
            data={products}
            keyExtractor={(item: any) => item.id.toString()}
            renderItem={({ ite }: any) => (
                <View style={styles.container}>
                    {products.map((item: Product, index) => (
                    <View key={index} style={styles.productCard}>
                        <Image source={{ uri: item.image }} style={styles.productImage} />
                        <View style={styles.productDetails}>
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.productPrice}>💰 {item.solde} $ (was {item.price} $)</Text>
                        <Text style={styles.productType}>📦 Category: {item.type}</Text>
                        <Text style={styles.productStock}>
                            {item.stocks.reduce((sum: number, stock: Stock) => sum + stock.quantity, 0)} in stock
                        </Text>
                        </View>
                    </View>
                    ))}
                </View>
            )}
        />
        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
    },
    productCard: {
        width: (width / 2) - 20, // Two products per row with some spacing
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        padding: 10,
    },
    productImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    productDetails: {
        marginTop: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    productPrice: {
        fontSize: 14,
        color: '#888',
    },
    productType: {
        fontSize: 12,
        color: '#666',
    },
    productStock: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
