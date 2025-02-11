import { useEffect, useState } from 'react';

export default function useProducts() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/products`);
            const data = await response.json();
            setProducts(data);
            } catch (error) {
            console.error('Error fetching products:', error);
            } finally {
            setLoading(false);
            }
        };
        
        fetchProducts();
    }, []);

    const handleBarcodeInput = (input: string) => {
        setSearchQuery(input);
    };

  return {
    products,
    loading,
    searchQuery,
    handleBarcodeInput
  }
}