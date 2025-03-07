import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface StatisticsCardProps {
  title: string;
  value: number | string;
  icon: keyof typeof Feather.glyphMap;
  color: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ title, value, icon, color }) => (
  <View style={[styles.card, { backgroundColor: color }]}>
    <Feather name={icon} size={24} color="#FFFFFF" />
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
);

export default function Analytics() {
  interface stockProduct {
    productId: string;
    stockId: string;
    stockName: string;
    newQuantity: number;
  }

  const [stats, setStats] = useState<{
    totalProducts: number;
    outOfStock: number;
    totalStockValue: number;
    mostAddedProducts: stockProduct[];
    mostRemovedProducts: stockProduct[];
  }>({
    totalProducts: 0,
    outOfStock: 0,
    totalStockValue: 0,
    mostAddedProducts: [],
    mostRemovedProducts: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/statistics`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        <StatisticsCard title="Total Products" value={stats.totalProducts} icon="package" color="#4CAF50" />
        <StatisticsCard title="Products Not Available" value={stats.outOfStock} icon="alert-circle" color="#FF5252" />
        <StatisticsCard title="Total Value" value={`${stats.totalStockValue} DH`} icon="dollar-sign" color="#2196F3" />
      </View>

      {/* Most Added Products */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Most Added Products</Text>
        {stats.mostAddedProducts.length > 0 ? (
          stats.mostAddedProducts.map((product, index) => (
            <View key={index} style={styles.productItem}>
              <Text style={styles.productName}>Product ID: {product.productId}</Text>
              <Text style={styles.productQuantity}>Stock ID: {product.stockId}</Text>
              <Text style={styles.productQuantity}>Stock Name: {product.stockName}</Text>
              <Text style={styles.productQuantity}>New Quantity: {product.newQuantity}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No data available</Text>
        )}
      </View>

      {/* Most Removed Products */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Most Removed Products</Text>
        {stats.mostRemovedProducts.length > 0 ? (
          stats.mostRemovedProducts.map((product, index) => (
            <View key={index} style={styles.productItem}>
              <Text style={styles.productName}>Product ID: {product.productId}</Text>
              <Text style={styles.productQuantity}>Stock ID: {product.stockId}</Text>
              <Text style={styles.productQuantity}>Stock Name: {product.stockName}</Text>
              <Text style={styles.productQuantity}>New Quantity: {product.newQuantity}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No data available</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 8,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  productItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  productName: {
    fontSize: 16,
    color: '#333333',
  },
  productQuantity: {
    fontSize: 14,
    color: '#757575',
  },
  noDataText: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    marginTop: 8,
  },
});