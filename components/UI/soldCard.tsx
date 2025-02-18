import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
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

interface ProductCardProps {
    product: Product; 
}

export default function SoldCard({ product }: ProductCardProps ) {



  return (
    <TouchableOpacity style={styles.productCardHorizontal}>
      <Image source={{ uri: product.image }} style={styles.productImageHorizontal} />
      <View style={styles.productDetailsHorizontal}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>💰 {product.solde} $ (was {product.price} $)</Text>
        <Text style={styles.productType}>📦 Category: {product.type}</Text>
        <Text style={styles.productStock}>{product.stocks.reduce((sum, stock) => sum + stock.quantity, 0)} in stock</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    productCardHorizontal: {
      flexDirection: 'row',
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 10,
      marginRight: 10,
      marginVertical: 10,
      width: width - 30,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    productImageHorizontal: {
      width: 100,
      height: 100,
      borderRadius: 10,
      resizeMode: 'cover',
    //   backgroundColor:'yellow'
    },
    productDetailsHorizontal: {
        // backgroundColor: 'green',
      marginLeft: 10,
      justifyContent: 'center',
      flex: 1,
    },
    productName: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#333',
    },
    productPrice: {
      fontSize: 12,
      color: '#888',
    },
    productType: {
      fontSize: 12,
      color: '#666',
    },
    productStock: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#B2A5FF',
    },
  });