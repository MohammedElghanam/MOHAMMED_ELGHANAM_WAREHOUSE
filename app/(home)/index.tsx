import ProductCard from '@/components/UI/productCard';
import useProducts from '@/hooks/products/useProducts';
import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, Dimensions, TextInput } from 'react-native';
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
    searchQuery,
    handleBarcodeInput,
    showDetails
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
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Entrez le code barre"
          value={searchQuery}
          onChangeText={handleBarcodeInput}
        />
      </View>

      <FlatList
        data={products}
        keyExtractor={(item: Product) => item.id.toString()}
        numColumns={2} 
        columnWrapperStyle={styles.row} 
        renderItem={({ item }: { item: Product }) => <ProductCard product={item} showD={showDetails} /> }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  searchInput: {
    height: 40,
    paddingLeft: 10,
    fontSize: 16,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  row: {
    justifyContent: 'space-between',
  },
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});