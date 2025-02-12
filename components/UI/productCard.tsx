import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
const { width } = Dimensions.get('window');

interface Stock {
  quantity: number;
}

interface Product {
    id: number;
    image: string;
    name: string;
    solde: number;
    price: number;
    type: string;
    stocks: Stock[];
}

export default function ProductCard({ product, showD }: { product: Product; showD: (product: Product) => void }) {
  return (
    <TouchableOpacity style={styles.productCard} onPress={() => showD(product)}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>💰 {product.solde} $ (was {product.price} $)</Text>
                  <Text style={styles.productType}>📦 Category: {product.type}</Text>
                  <Text style={styles.productStock}>
                    {product.stocks.reduce((sum: number, stock: Stock) => sum + stock.quantity, 0)} in stock
                  </Text>
                </View>
              </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    productCard: {
        width: (width / 2) - 15, 
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
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
})