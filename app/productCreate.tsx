
import { View, TextInput, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams } from 'expo-router';
import useCreate from '@/hooks/products/useCreate';

const productCreate = () => {

    const { codeScanned } = useLocalSearchParams();
    const scannedCode = typeof codeScanned === 'string' ? codeScanned : '';

    const {
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
        warehouseOptions
    } = useCreate({codeScanned: scannedCode});

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
    alignItems: 'center',
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
