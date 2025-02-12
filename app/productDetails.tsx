import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import useProducts from '@/hooks/products/useProducts';

const ProductDetailsPage = () => {
    interface Product {
        image: string;
        name: string;
        price: number;
        solde?: number;
        supplier: string;
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
    
      const { barcode } = useLocalSearchParams();
      const { products } = useProducts();
    
      useEffect(() => {
        if (barcode && typeof barcode === 'string') {
          console.log('Barcode from params:', barcode);
          
          try {
            const parsedBarcode = JSON.parse(barcode);
            setBarId(parsedBarcode);
          } catch (error) {
            console.error('Error parsing barcode:', error);
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
 

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        {/* <ActivityIndicator size="large" color="#4CAF50" /> */}
        <Text style={{ color: 'white'}}>loading</Text>
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

        { product ? product.stocks.map((stock) => (
          <View key={stock.id} style={styles.stockItem}>
            <Text style={styles.stockName}>{stock.name}</Text>
            <View style={styles.stockInfoRow}>
              <Feather name="database" size={14} color="#4CAF50" />
              <Text style={styles.stockText}>Quantity: {stock.quantity}</Text>
            </View>
            <View style={styles.stockInfoRow}>
              <Feather name="map-pin" size={14} color="#4CAF50" />
              <Text style={styles.stockText}>{stock.localisation.city}</Text>
            </View>
          </View>
        )) : 

        <View style={styles.stockInfoRow}>
        <Text style={styles.stockText}>No product details yeet</Text>
       </View>
        
        }
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
});

export default ProductDetailsPage;