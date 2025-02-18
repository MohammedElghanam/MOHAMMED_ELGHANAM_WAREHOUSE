import CategoryFiltrage from '@/components/UI/categoryFiltrage';
import Header from '@/components/UI/header';
import ProductCard from '@/components/UI/productCard';
import SoldCard from '@/components/UI/soldCard';
import useProducts from '@/hooks/products/useProducts';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, Dimensions, TextInput, ScrollView } from 'react-native';
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
  barcode: string;
};

export default function Index() {

    const { products, filteredProducts, loading, searchQuery, handleBarcodeInput, showDetails, setSelectedCategory } = useProducts();

    const soldProducts = products.filter(product => product.solde > 0);
  
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

        <Header searchQuery={searchQuery} handleBarcodeInput={handleBarcodeInput} />

        <CategoryFiltrage setSelectedCategory={setSelectedCategory} />

        

    <ScrollView style={styles.productContainer}>

        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🔥 Sold</Text>
            <Text style={styles.viewAll}>View All</Text>
        </View>

        <FlatList
            data={soldProducts}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }: { item: Product }) => <SoldCard product={item} /> }
            keyExtractor={item => item.id}
        />

        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🛒 Products</Text>
            <Text style={styles.viewAll}>View All</Text>
        </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item: Product, index) => index.toString()}
        numColumns={2} 
        columnWrapperStyle={styles.row} 
        renderItem={({ item }: { item: Product }) => <ProductCard product={item} showD={showDetails} /> }
      />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    backgroundColor: '#f5f5f5',
  },
  productContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAll: {
    fontSize: 14,
    color: '#B2A5FF',
    fontWeight: '600',
  },
});