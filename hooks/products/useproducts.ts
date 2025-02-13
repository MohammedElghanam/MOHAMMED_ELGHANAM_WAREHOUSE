import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, TextInput, View, StyleSheet } from 'react-native';

export default function useProducts() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

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
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/products`);
                const data = await response.json();
                // console.log(data);
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchProducts();
    }, []);

    useEffect(() => {
        const result = products.filter(product =>
          product.barcode.includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(result);
    }, [searchQuery, products]);

    const handleBarcodeInput = (input: string) => {
        setSearchQuery(input);
    };

    const showDetails = (product: Product) => {
        router.push({
          pathname: "/productDetails",
          params: { barcode: JSON.stringify(product.barcode) }, 
        });
    };

    return {
        products,
        loading,
        searchQuery,
        handleBarcodeInput,
        showDetails,
        filteredProducts,
    };
}