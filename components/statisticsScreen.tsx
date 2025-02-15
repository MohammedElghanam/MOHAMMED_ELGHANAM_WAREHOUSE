import React, { useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import * as Print from 'expo-print';

const StatisticsScreen = ({ stats }) => {

  const generatePDF = async () => {
    // Prepare the HTML content for the PDF
    const htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <h1 style="text-align: center;">Inventory Statistics</h1>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            <div style="flex: 1; background-color: #4CAF50; color: white; padding: 10px; text-align: center;">
              <h3>Total Products</h3>
              <p>${stats.totalProducts}</p>
            </div>
            <div style="flex: 1; background-color: #FF5252; color: white; padding: 10px; text-align: center;">
              <h3>Products Not Available</h3>
              <p>${stats.outOfStock}</p>
            </div>
            <div style="flex: 1; background-color: #2196F3; color: white; padding: 10px; text-align: center;">
              <h3>Total Value</h3>
              <p>${stats.totalStockValue} DH</p>
            </div>
          </div>
          
          <h2>Most Added Products</h2>
          <ul>
            ${stats.mostAddedProducts.length > 0
              ? stats.mostAddedProducts.map(product => `
                <li>
                  <strong>Product ID:</strong> ${product.productId}<br />
                  <strong>Stock ID:</strong> ${product.stockId}<br />
                  <strong>Stock Name:</strong> ${product.stockName}<br />
                  <strong>New Quantity:</strong> ${product.newQuantity}
                </li>
              `).join('')
              : '<p>No data available</p>'
            }
          </ul>
          
          <h2>Most Removed Products</h2>
          <ul>
            ${stats.mostRemovedProducts.length > 0
              ? stats.mostRemovedProducts.map(product => `
                <li>
                  <strong>Product ID:</strong> ${product.productId}<br />
                  <strong>Stock ID:</strong> ${product.stockId}<br />
                  <strong>Stock Name:</strong> ${product.stockName}<br />
                  <strong>New Quantity:</strong> ${product.newQuantity}
                </li>
              `).join('')
              : '<p>No data available</p>'
            }
          </ul>
        </body>
      </html>
    `;

    try {
      // Generate the PDF
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      console.log('PDF generated at: ', uri);
      // Optionally, you can share the URI or use it in your app
    } catch (error) {
      console.error('Error generating PDF:', error);
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

      <Button title="Generate PDF" onPress={generatePDF} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productItem: {
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productQuantity: {
    fontSize: 14,
  },
  noDataText: {
    fontSize: 14,
    color: 'gray',
  },
});

export default StatisticsScreen;
