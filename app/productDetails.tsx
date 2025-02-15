import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import useProducts from '@/hooks/products/useProducts';
import axios from 'axios';

const ProductDetailsPage = () => {
    interface Product {
        id: string;
        image: string;
        name: string;
        price: number;
        solde?: number;
        supplier: string;
        barcode: string;
        stocks: {
          id: string;
          name: string;
          quantity: number;
          localisation: {
            city: string;
          };
        }[];
      }
    
      const [product, setProduct] = useState<Product | null>(null);
      const [loading, setLoading] = useState(true);
      const [barId, setBarId] = useState('');
      const [updateQuantity, setUpdateQuantity] = useState('');
      const [selectedStockId, setSelectedStockId] = useState<string | null>(null);
      const [selectedStockName, setSelectedStockName] = useState<string | null>(null);

      const { barcode } = useLocalSearchParams();
      const { products } = useProducts();
    
      useEffect(() => {
        if (barcode && typeof barcode === 'string') {
          try {
            const parsedBarcode = JSON.parse(barcode);
            setBarId(parsedBarcode);
          } catch (error) {
            setBarId(barcode);
          }
        }
      }, [barcode]);
    
      useEffect(() => {
        if (barId) {
          const foundProduct = products.find((item: any) => item.barcode === barId);
          if (foundProduct) {
            setProduct(foundProduct);
          }
          setLoading(false);
        }
      }, [barId, products]);


    const handleUpdate = async () => {
        if (product && selectedStockId) {
            try {
                const updatedStocks = product.stocks.map(stock =>
                    stock.id === selectedStockId ? { ...stock, quantity: parseInt(updateQuantity, 10) } : stock
                );
    
                const oldQuantity = product.stocks.find(stock => stock.id === selectedStockId)?.quantity || 0;
                const newQuantity = parseInt(updateQuantity, 10);
                    
                await axios.patch(`${process.env.EXPO_PUBLIC_API_URL}/products/${product.id}`, { stocks: updatedStocks });
    
                const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/statistics`);
                const statistics = response.data;
    
                const productUpdate = { productId: product.id, stockId: selectedStockId, stockName: selectedStockName, newQuantity };
    
                if (newQuantity > oldQuantity) {
                    const addedProductIndex = statistics.mostAddedProducts.findIndex(
                        (item: any) => item.productId === product.id && item.stockId === selectedStockId
                    );
    
                    if (addedProductIndex !== -1) {
                        statistics.mostAddedProducts[addedProductIndex].newQuantity = newQuantity;
                    } else {
                        statistics.mostAddedProducts.push(productUpdate);
                    }
    
                } else if (newQuantity === 0) {
                    statistics.outOfStock++;
    
                    const removedProductIndex = statistics.mostRemovedProducts.findIndex(
                        (item: any) => item.productId === product.id && item.stockId === selectedStockId
                    );
    
                    if (removedProductIndex !== -1) {
                        statistics.mostRemovedProducts[removedProductIndex].newQuantity = newQuantity;
                    } else {
                        statistics.mostRemovedProducts.push(productUpdate);
                    }

                }else if (newQuantity < oldQuantity ) {
                    const removedProductIndex = statistics.mostRemovedProducts.findIndex(
                        (item: any) => item.productId === product.id && item.stockId === selectedStockId
                    );
    
                    if (removedProductIndex !== -1) {
                        statistics.mostRemovedProducts[removedProductIndex].newQuantity = newQuantity;
                    } else {
                        statistics.mostRemovedProducts.push(productUpdate);
                    }
                }
                await axios.patch(`${process.env.EXPO_PUBLIC_API_URL}/statistics`, statistics);
    
                setProduct({ ...product, stocks: updatedStocks });
                setSelectedStockId(null);
    
            } catch (error) {
                console.error('Error updating stock:', error);
            }
        }
    };

      const handleStockSelect = (stockId: string, stockName: string) => {
        console.log(stockId);
        
        setSelectedStockId(stockId);
        setSelectedStockName(stockName)

        const selectedStock = product?.stocks.find(stock => stock.id === stockId);
        setUpdateQuantity(selectedStock ? selectedStock.quantity.toString() : '');
      };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: 'white' }}>loading</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        {product.solde && (
          <View style={styles.saleBadge}>
            <Text style={styles.saleText}>SALE</Text>
          </View>
        )}
      </View>

      <View style={styles.productDetails}>
        <Text style={styles.productName}>{product.name}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>${product.price}</Text>

          {product.solde && (
            <Text style={styles.productSolde}>${product.solde}</Text>
          )}
        </View>

        <View style={styles.infoRow}>
          <Feather name="package" size={18} color="#A0A0A0" />
          <Text style={styles.productSupplier}>{product.supplier}</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Stock Information</Text>
          <Feather name="box" size={20} color="#A0A0A0" />
        </View>

        {product.stocks.map((stock) => (
          <View key={stock.id} style={styles.stockItem}>
            <Text style={styles.stockName}>{stock.name}</Text>
            <View style={styles.stockInfoRow}>
                {selectedStockId === stock.id ? (
                  <View>
                    <TextInput
                      style={styles.input}
                      value={updateQuantity}
                      onChangeText={setUpdateQuantity}
                      placeholder="Enter quantity"
                      keyboardType="numeric"
                    />
                    <TouchableOpacity onPress={handleUpdate} style={styles.button}>
                      <Text style={{ color: 'white' }}>Update</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <Feather name="database" size={14} color="#4CAF50" />
                    <Text style={styles.stockText}>Quantity: {stock.quantity}</Text>
                    <TouchableOpacity onPress={() => handleStockSelect(stock.id, stock.name)}>
                      <Text style={{ color: 'white' }}>Update Quantity</Text>
                    </TouchableOpacity>
                  </View>
                )}
            </View>
            <View style={styles.stockInfoRow}>
              <Feather name="map-pin" size={14} color="#4CAF50" />
              <Text style={styles.stockText}>{stock.localisation.city}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  errorText: {
    color: '#FF5252',
    fontSize: 18,
  },
  imageContainer: {
    backgroundColor: '#1E1E1E',
    padding: 16,
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 12,
  },
  productDetails: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  productPrice: {
    fontSize: 20,
    color: '#4CAF50',
    fontWeight: '800',
  },
  productSolde: {
    fontSize: 18,
    color: '#757575',
    textDecorationLine: 'line-through',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  productSupplier: {
    fontSize: 16,
    color: '#A0A0A0',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D2D',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  stockItem: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2D2D2D',
  },
  stockName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  stockInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 4,
  },
  stockText: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  saleBadge: {
    position: 'absolute',
    top: 32,
    right: 32,
    backgroundColor: '#FF5252',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  saleText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 10,
    color: 'white',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default ProductDetailsPage;
