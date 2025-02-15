import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface StatisticsCardProps {
  title: string;
  value: number | string;
  icon: string;
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
  const [stats, setStats] = useState({ totalProducts: 0, outOfStock: 0, totalStockValue: 0, mostAddedProducts: [], mostRemovedProducts: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/products`);
        const products = await response.json();

        const totalProducts = products.length;
        const outOfStock = products.filter(p => p.stocks.reduce((acc, s) => acc + s.quantity, 0) === 0).length;
        const totalStockValue = products.reduce((acc, p) => acc + p.price * p.stocks.reduce((sum, s) => sum + s.quantity, 0), 0);

        const mostAddedProducts = products.sort((a, b) => b.editedBy.length - a.editedBy.length).slice(0, 3);
        const mostRemovedProducts = products.sort((a, b) => a.editedBy.length - b.editedBy.length).slice(0, 3);

        setStats({ totalProducts, outOfStock, totalStockValue, mostAddedProducts, mostRemovedProducts });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        <StatisticsCard title="total Products" value={stats.totalProducts} icon="package" color="#4CAF50" />
        <StatisticsCard title=" Products Not Available " value={stats.outOfStock} icon="alert-circle" color="#FF5252" />
        <StatisticsCard title="Total Value" value={`${stats.totalStockValue} DH`} icon="dollar-sign" color="#2196F3" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#F5F5F5' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', padding: 16, borderRadius: 12, marginBottom: 16, elevation: 3 },
  cardTitle: { fontSize: 16, color: '#FFFFFF', marginTop: 8 },
  cardValue: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginTop: 8 }
});