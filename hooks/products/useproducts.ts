import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, TextInput, View, StyleSheet } from 'react-native';

export default function useProducts() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

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
        let filtered = [...products];

        // if (selectedCategory !== 'All') {
        //     filtered = filtered.filter(product => {
        //         if (selectedCategory === 'Name') {
        //             return product.name.toLowerCase().includes(searchQuery.toLowerCase());
        //         }
        //         if (selectedCategory === 'Price') {
        //             return product.price.toString().includes(searchQuery);
        //         }
        //         if (selectedCategory === 'Type') {
        //             return product.type.toLowerCase().includes(searchQuery.toLowerCase());
        //         }
        //         if (selectedCategory === 'Supplier') {
        //             return product.supplier && product.supplier.toLowerCase().includes(searchQuery.toLowerCase());
        //         }
        //         return true;
        //     });
        // }

        filtered = products.filter(product =>
          product.barcode.includes(searchQuery.toLowerCase())
        );

        if (selectedCategory === 'Name') {
            filtered.sort((a, b) => sortOrder === 'asc' 
                ? a.name.localeCompare(b.name) 
                : b.name.localeCompare(a.name));
        } else if (selectedCategory === 'Price Top') {
            filtered.sort((a, b) => b.price - a.price); 
        } else if (selectedCategory === 'Price Lowest') {
            filtered.sort((a, b) => a.price - b.price);
        }

        setFilteredProducts(filtered);
    }, [selectedCategory, searchQuery, products, sortOrder]);

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
        setSelectedCategory,
    };
}