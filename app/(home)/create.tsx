// import React, { useState, useEffect  } from 'react';
// import { View, TextInput, Text, Button, StyleSheet, Image } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';

// const Create = () => {
    
//     const [name, setName] = useState('');
//     const [price, setPrice] = useState('');
//     const [image, setImage] = useState('');
//     const [stock, setStock] = useState('');
//     const [barId, setBarId] = useState('');
//     const [error, setError] = useState('');
    
//     const { barcode } = useLocalSearchParams();

//     useEffect(() => {
//         if (barcode && typeof barcode === 'string') {
//             const codbarData = JSON.parse(barcode);
//             setBarId(codbarData); 
//         }
//     }, [barcode]); 


//   const handleSubmit = () => {
//     if (!name || !price || !image || !stock) {
//       setError('All fields are required');
//       return;
//     }

//     const newProduct = {
//       name,
//       price,
//       image,
//       stock: parseInt(stock),
//     };

//     // Log the new product (you can modify this to call an API)
//     console.log('Product Created:', newProduct);

//     // Clear form after submission
//     setName('');
//     setPrice('');
//     setImage('');
//     setStock('');
//     setError('');
//   };

//   return (
//     <View style={styles.container}>
//         <Text style={styles.heading}>Create Product</Text>

//         {error ? <Text style={styles.error}>{error}</Text> : null}

//         <TextInput
//             style={styles.input}
//             placeholder="Product Name"
//             value={name}
//             onChangeText={setName}
//         />

//         <TextInput
//             style={styles.input}
//             placeholder="Price"
//             value={price}
//             keyboardType="numeric"
//             onChangeText={setPrice}
//         />

//         <TextInput
//             style={styles.input}
//             placeholder="Image URL"
//             value={image}
//             onChangeText={setImage}
//         />

//         <TextInput
//             style={styles.input}
//             placeholder="Bar Code"
//             value={barId}
//             onChangeText={setBarId}
//         />

//         <TextInput
//             style={styles.input}
//             placeholder="Stock Quantity"
//             value={stock}
//             keyboardType="numeric"
//             onChangeText={setStock}
//         />

//         <Button title="Submit" onPress={handleSubmit} />

//         <View style={styles.preview}>
//             {image ? <Image source={{ uri: image }} style={styles.imagePreview} /> : null}
//         </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//     backgroundColor: '#f9f9f9',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingLeft: 10,
//     borderRadius: 5,
//   },
//   error: {
//     color: 'red',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   preview: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   imagePreview: {
//     width: 100,
//     height: 100,
//     borderRadius: 5,
//   },
// });

// export default Create;



import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const CreateProduct = () => {
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
  const [warehousemanId, setWarehousemanId] = useState<number | null>(null); // Store ID from token

  // Simulated warehouse stock locations
  const warehouseOptions = [
    { id: '1', name: 'Gueliz B2', city: 'Marrakesh' },
    { id: '2', name: 'Lazari H2', city: 'Oujda' }
  ];

  // Fetch warehouseman ID from AsyncStorage
  useEffect(() => {
    const getTokenData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          // Simulate fetching warehousemanId from db.json using token
          const warehousemanData = await fetchWarehousemanFromDB(token);
          setWarehousemanId(warehousemanData?.id || null);
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };

    getTokenData();
  }, []);

  // Function to fetch warehousemanId from db.json (Mocked)
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

  // Handle form submission
  const handleSubmit = async () => {
    if (!name || !type || !barcode || !price || !solde || !supplier || !image || !stockName || !quantity || !city) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    // Create product object
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create Product</Text>

      <TextInput style={styles.input} placeholder="Product Name" value={name} onChangeText={setName} />
      
      <Picker selectedValue={type} onValueChange={setType} style={styles.picker}>
        <Picker.Item label="Select Type" value="" />
        <Picker.Item label="Informatique" value="Informatique" />
        <Picker.Item label="Electronics" value="Electronics" />
      </Picker>

      <TextInput style={styles.input} placeholder="Barcode" value={barcode} onChangeText={setBarcode} />
      <TextInput style={styles.input} placeholder="Price" value={price} keyboardType="numeric" onChangeText={setPrice} />
      <TextInput style={styles.input} placeholder="Solde" value={solde} keyboardType="numeric" onChangeText={setSolde} />
      <TextInput style={styles.input} placeholder="Supplier" value={supplier} onChangeText={setSupplier} />
      <TextInput style={styles.input} placeholder="Image URL" value={image} onChangeText={setImage} />

      <Picker selectedValue={stockName} onValueChange={setStockName} style={styles.picker}>
        <Picker.Item label="Select Warehouse" value="" />
        {warehouseOptions.map((wh) => (
          <Picker.Item key={wh.id} label={wh.name} value={wh.name} />
        ))}
      </Picker>

      <TextInput style={styles.input} placeholder="Stock Quantity" value={quantity} keyboardType="numeric" onChangeText={setQuantity} />
      
      <Picker selectedValue={city} onValueChange={setCity} style={styles.picker}>
        <Picker.Item label="Select City" value="" />
        <Picker.Item label="Marrakesh" value="Marrakesh" />
        <Picker.Item label="Oujda" value="Oujda" />
      </Picker>

      <Button title="Submit" onPress={handleSubmit} />
      
      {image ? <Image source={{ uri: image }} style={styles.imagePreview} /> : null}
    </ScrollView>
  );
};

// Function to insert product into db.json
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
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginTop: 20
  }
});

export default CreateProduct;
