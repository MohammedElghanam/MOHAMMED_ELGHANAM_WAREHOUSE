
import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Image, Alert, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from 'expo-router';

const productCreate = () => {
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
  const [warehousemanId, setWarehousemanId] = useState<number | null>(null);

  const { codeScanned } = useLocalSearchParams();
  console.log(codeScanned);
  

  const warehouseOptions = [
    { id: '1', name: 'Gueliz B2', city: 'Marrakesh' },
    { id: '2', name: 'Lazari H2', city: 'Oujda' }
  ];

  useEffect(() => {

    if (codeScanned && typeof codeScanned === 'string') {
        const codbarData = JSON.parse(codeScanned);
        setBarcode(codbarData); 
    }

    const getTokenData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const warehousemanData = await fetchWarehousemanFromDB(token);
          setWarehousemanId(warehousemanData?.id || null);
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };

    getTokenData();
  }, [codeScanned]);

interface User {
    id: number;
    token: string;
}

const fetchWarehousemanFromDB = async (token: string): Promise<User | null> => {
    try {
        const response = await fetch('http://localhost:3000/users'); // Replace with actual API
        const users: User[] = await response.json();
        return users.find(user => user.token === token) || null;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
};

  const handleSubmit = async () => {
    if (!name || !type || !barcode || !price || !solde || !supplier || !image || !stockName || !quantity || !city) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    const newProduct = {
      name,
      type,
      barcode,
      price: parseFloat(price),
      solde: parseFloat(solde),
      supplier,
      image,
      stocks: [
        {
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
      Alert.alert('Success', 'Product added successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save product.');
    }
  };


  const pickImage = async () => {
    // Ask for permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // If user picked an image, update state
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Create Product</Text>

        <TextInput style={styles.input} placeholder="Product Name" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Barcode" value={barcode} onChangeText={setBarcode} />
        <TextInput style={styles.input} placeholder="Price" value={price} keyboardType="numeric" onChangeText={setPrice} />
        <TextInput style={styles.input} placeholder="Solde" value={solde} keyboardType="numeric" onChangeText={setSolde} />
        <TextInput style={styles.input} placeholder="Supplier" value={supplier} onChangeText={setSupplier} />
        <TextInput style={styles.input} placeholder="Stock Quantity" value={quantity} keyboardType="numeric" onChangeText={setQuantity} />

        <View style={[styles.imageContainer, image && styles.rowLayout]}>
            {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
            <TouchableOpacity style={[styles.button, image && styles.smallButton]} onPress={pickImage}>
                <Text style={[styles.buttonText, image && styles.smallButtonText]}>Pick an image from gallery</Text>
            </TouchableOpacity>
        </View>
      
        <Picker selectedValue={type} onValueChange={setType} style={styles.picker}>
            <Picker.Item label="Select Type" value="" />
            <Picker.Item label="Informatique" value="Informatique" />
            <Picker.Item label="Electronics" value="Electronics" />
        </Picker>

        <Picker selectedValue={stockName} onValueChange={setStockName} style={styles.picker}>
            <Picker.Item label="Select Warehouse" value="" />
            {warehouseOptions.map((wh) => (
            <Picker.Item key={wh.id} label={wh.name} value={wh.name} />
            ))}
        </Picker>
      
        <Picker selectedValue={city} onValueChange={setCity} style={styles.picker}>
            <Picker.Item label="Select City" value="" />
            <Picker.Item label="Marrakesh" value="Marrakesh" />
            <Picker.Item label="Oujda" value="Oujda" />
        </Picker>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Create</Text>
        </TouchableOpacity>

    </ScrollView>
  );
};

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

const insertProduct = async (product: Product): Promise<Product> => {
    try {
        const response = await fetch('http://localhost:3000/products', {
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

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    alignItems: 'center'
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5
  },
  picker: {
    width: '100%',
    height: 50,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc'
  },
  imageContainer: {
    width: '100%',
    flexDirection: 'row',  
    flexWrap: 'wrap',      
    // justifyContent: 'start',
    alignItems: 'center',
    // backgroundColor: 'red',
    gap: 20,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderStyle: 'dashed',
  },
  buttonText: {
    color: 'gray',
    fontSize: 16,
  },
  smallButtonText: {
    color: '#B2A5FF',
    fontSize: 16,
  },
  imagePreview: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginTop: 20
  },
  rowLayout: {
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 10,
  },
  smallButton: {
    width: '84%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#B2A5FF',
    borderStyle: 'dashed',
  },
  submitButton: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#B2A5FF',
  },
  submitButtonText: {
     textAlign: 'center',
     fontSize: 16,
     color: 'white'
  },
});

export default productCreate;
