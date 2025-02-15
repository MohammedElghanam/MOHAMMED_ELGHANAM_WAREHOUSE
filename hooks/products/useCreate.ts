import { useEffect, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import useValidation from "../validation/useValidation";
import { useRouter } from "expo-router";
import axios from 'axios'

export default function useCreate({codeScanned}: { codeScanned: string }) {
    const router = useRouter();
    const { validateFields } = useValidation();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [barcode, setBarcode] = useState('');
    const [price, setPrice] = useState('');
    const [solde, setSolde] = useState('');
    const [supplier, setSupplier] = useState('');
    const [image, setImage] = useState('');
    const [stockName, setStockName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [city, setCity] = useState('');
    const [errors,setErrors] = useState<{ [key: string]: string }>({});

    const warehouseOptions = [
        { id: '1', name: 'Gueliz B2', city: 'Marrakesh' },
        { id: '2', name: 'Lazari H2', city: 'Oujda' }
    ];

    interface User {
        id: number,
        secretKey: string;
    }

    interface Product {
        name: string;
        type: string;
        barcode: string;
        price: number;
        solde: number;
        supplier: string;
        image: string;
        stocks: Stock[];
        editedBy: EditedBy[];
    }
    
    interface Stock {
        name: string;
        quantity: number;
        localisation: {
            city: string;
        };
    }
    
    interface EditedBy {
        warehousemanId: number;
        at: string;
    }

    useEffect(() => {
        if (codeScanned && typeof codeScanned === 'string') {
            const codbarData = JSON.parse(codeScanned);
            setBarcode(codbarData); 
        }
    }, [codeScanned]);

    const handleSubmit = async () => {

        const errorMessage = validateFields({ name, type, barcode, price: parseFloat(price), solde: parseFloat(solde), supplier, image, stockName, quantity: parseInt(quantity), city });
        setErrors(errorMessage);

        if (Object.keys(errorMessage).length != 0) {
            return;
        }

        const warehousemanId = await getTokenData();
        
        const newProduct = {
            id: Math.floor(Math.random() * 1000),
            name,
            type,
            barcode,
            price: parseFloat(price),
            solde: parseFloat(solde),
            supplier,
            image,
            stocks: [
                {
                    id: Math.floor(Math.random() * 500),
                    name: stockName,
                    quantity: parseInt(quantity),
                    localisation: {
                        city
                    }
                }
            ],
            editedBy: warehousemanId ? [{ warehousemanId, at: new Date().toISOString().split('T')[0] }] : []
        };

        try {
            
            await insertProduct(newProduct);
            await updateStatistqueStock(newProduct);
            Alert.alert('Success', 'Product added successfully!');

            setName('');
            setType('');
            setBarcode('');
            setPrice('');
            setSolde('');
            setSupplier('');
            setImage('');
            setStockName('');
            setQuantity('');
            setCity('');

            router.replace('/(home)');

        } catch (error) {
            console.log(error);
            
            Alert.alert('Error', 'Failed to save product.');
        }
    }

    const insertProduct = async (product: Product): Promise<Product> => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            });
    
            if (!response.ok) throw new Error('Failed to save product');
            
            return await response.json();
        } catch (error) {
            console.error('Error inserting product:', error);
            throw error;
        }
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Permission to access media library is required!");
            return;
        }
    
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const fetchWarehousemanFromDB = async (token: string): Promise<User | null> => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/warehousemans`); 
            const users: User[] = await response.json();                        
            return users.find(user => user.secretKey === token) || null;
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    };

    const getTokenData = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          if (token) {
            const warehousemanData = await fetchWarehousemanFromDB(token);            
            return warehousemanData?.id;
          }
        } catch (error) {
          console.error('Error retrieving token:', error);
        }
    };

    const updateStatistqueStock = async (product: Product) => {

        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/statistics`);
        const statistics = response.data;

        statistics.totalProducts += 1;
        product.stocks.forEach(stock => {
            statistics.totalStockValue += product.price * stock.quantity;
        });

        if (product.stocks.some(stock => stock.quantity === 0)) {
            statistics.outOfStock += 1; 
        }

        await axios.patch(`${process.env.EXPO_PUBLIC_API_URL}/statistics`, statistics);

    }


    return {
        name,
        type,
        price,
        image,
        stockName,
        barcode,
        quantity,
        city,
        supplier,
        solde,
        setName,
        setType,
        setPrice,
        setStockName,
        setBarcode,
        setQuantity,
        setCity,
        setSupplier,
        setSolde,
        handleSubmit,
        pickImage,
        warehouseOptions,
        errors
    }
}