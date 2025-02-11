import React, { useState, useEffect  } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const Create = () => {
    
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [stock, setStock] = useState('');
    const [barId, setBarId] = useState('');
    const [error, setError] = useState('');
    
    const { barcode } = useLocalSearchParams();

    useEffect(() => {
        if (barcode && typeof barcode === 'string') {
            const codbarData = JSON.parse(barcode);
            setBarId(codbarData); 
        }
    }, [barcode]); 


  const handleSubmit = () => {
    if (!name || !price || !image || !stock) {
      setError('All fields are required');
      return;
    }

    const newProduct = {
      name,
      price,
      image,
      stock: parseInt(stock),
    };

    // Log the new product (you can modify this to call an API)
    console.log('Product Created:', newProduct);

    // Clear form after submission
    setName('');
    setPrice('');
    setImage('');
    setStock('');
    setError('');
  };

  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Create Product</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TextInput
            style={styles.input}
            placeholder="Product Name"
            value={name}
            onChangeText={setName}
        />

        <TextInput
            style={styles.input}
            placeholder="Price"
            value={price}
            keyboardType="numeric"
            onChangeText={setPrice}
        />

        <TextInput
            style={styles.input}
            placeholder="Image URL"
            value={image}
            onChangeText={setImage}
        />

        <TextInput
            style={styles.input}
            placeholder="Bar Code"
            value={barId}
            onChangeText={setBarId}
        />

        <TextInput
            style={styles.input}
            placeholder="Stock Quantity"
            value={stock}
            keyboardType="numeric"
            onChangeText={setStock}
        />

        <Button title="Submit" onPress={handleSubmit} />

        <View style={styles.preview}>
            {image ? <Image source={{ uri: image }} style={styles.imagePreview} /> : null}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  preview: {
    marginTop: 20,
    alignItems: 'center',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
});

export default Create;
