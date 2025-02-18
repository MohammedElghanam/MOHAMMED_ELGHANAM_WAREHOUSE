
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
        warehouseOptions,
        errors
    } = useCreate({codeScanned: scannedCode});

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Create Product</Text>

            <View style={styles.inputContainer}>
                <TextInput style={[styles.input, errors.name ? { borderColor: 'red' } : null ]} placeholder="Product Name" placeholderTextColor={errors.name ? 'red' : 'gray'} value={name} onChangeText={setName} />
                {errors.name && <Text style={styles.error}>{errors.name}</Text>}
            </View>

            <View style={styles.inputContainer}>
                <TextInput style={[styles.input, errors.barcode ? { borderColor: 'red' } : null ]} placeholder="Barcode" placeholderTextColor={errors.barcode ? 'red' : 'gray'} value={barcode} onChangeText={setBarcode} />
                {errors.barcode && <Text style={styles.error}>{errors.barcode}</Text>}
            </View>

            <View style={styles.inputContainer}>
                <TextInput style={[styles.input, errors.price ? { borderColor: 'red' } : null ]} placeholder="Price" placeholderTextColor={errors.price ? 'red' : 'gray'} value={price} keyboardType="numeric" onChangeText={setPrice} />
                {errors.price && <Text style={styles.error}>{errors.price}</Text>}
            </View>

            <View style={styles.inputContainer}>
                <TextInput style={[styles.input, errors.solde ? { borderColor: 'red' } : null ]} placeholder="Solde" placeholderTextColor={errors.solde ? 'red' : 'gray'} value={solde} keyboardType="numeric" onChangeText={setSolde} />
                {errors.solde && <Text style={styles.error}>{errors.solde}</Text>}
            </View>

            <View style={styles.inputContainer}>
                <TextInput style={[styles.input, errors.supplier ? { borderColor: 'red' } : null ]} placeholder="Supplier" placeholderTextColor={errors.supplier ? 'red' : 'gray'} value={supplier} onChangeText={setSupplier} />
                {errors.supplier && <Text style={styles.error}>{errors.supplier}</Text>}
            </View>

            <View style={styles.inputContainer}>
                <TextInput style={[styles.input, errors.quantity ? { borderColor: 'red' } : null ]} placeholder="Stock Quantity" placeholderTextColor={errors.quantity ? 'red' : 'gray'} value={quantity} keyboardType="numeric" onChangeText={setQuantity} />
                {errors.quantity && <Text style={styles.error}>{errors.quantity}</Text>}
            </View>
            <View style={styles.inputContainer}>
                <View style={[styles.imageContainer, image && styles.rowLayout]}>
                    {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
                    <TouchableOpacity style={[styles.button, errors.image ? { borderColor: 'red' } : null , image && styles.smallButton]} onPress={pickImage}>
                        <Text style={[styles.buttonText, image && styles.smallButtonText]}>Pick an image from gallery</Text>
                    </TouchableOpacity>
                </View>
                {errors.image && <Text style={styles.error}>{errors.image}</Text>}
            </View>

            <View style={styles.inputContainer}>
                <Picker selectedValue={type} onValueChange={setType} style={styles.picker}>
                    <Picker.Item label="Select Type" value="" />
                    <Picker.Item label="Informatique" value="Informatique" />
                    <Picker.Item label="Electronics" value="Electronics" />
                </Picker>
                {errors.type && <Text style={styles.error}>{errors.type}</Text>}
            </View>
            
            <View style={styles.inputContainer}>
                <Picker selectedValue={stockName} onValueChange={setStockName} style={styles.picker}>
                    <Picker.Item label="Select Warehouse" value="" />
                    {warehouseOptions.map((wh) => (
                        <Picker.Item key={wh.id} label={wh.name} value={wh.name} />
                    ))}
                </Picker>
                {errors.stockName && <Text style={styles.error}>{errors.stockName}</Text>}
            </View>

            <View style={styles.inputContainer}>
                <Picker selectedValue={city} onValueChange={setCity} style={styles.picker}>
                    <Picker.Item label="Select City" value="" />
                    <Picker.Item label="Marrakesh" value="Marrakesh" />
                    <Picker.Item label="Oujda" value="Oujda" />
                </Picker>
                {errors.city && <Text style={styles.error}>{errors.city}</Text>}
            </View>

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
        alignItems: 'center',
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 15,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    error: {
        color: 'red',
        fontSize: 12,
        // marginTop: 5,
        // paddingLeft: 10,
    },
    picker: {
        width: '100%',
        height: 50,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
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
        color: 'white',
    },
    imageContainer: {
        width: '100%',
        flexDirection: 'row',  
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 20,
      },
      rowLayout: {
        flexDirection: 'row', 
        alignItems: 'center',
        gap: 10,
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
      smallButton: {
        width: '84%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#B2A5FF',
        borderStyle: 'dashed',
      },
});
export default productCreate;