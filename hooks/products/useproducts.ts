import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

export default function useProducts() {

    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

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

    const showDetails = (product: Product) => {
        console.log(JSON.stringify(product.barcode));
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
    showDetails
  }
}