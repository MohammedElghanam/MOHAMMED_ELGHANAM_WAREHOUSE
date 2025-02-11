import { View, Text } from 'react-native'
import React, { useState, useEffect  } from 'react';
import { useLocalSearchParams } from 'expo-router';

export default function ProductDetails() {

    const [barId, setBarId] = useState('');

    const { barcode } = useLocalSearchParams();
    
    useEffect(() => {
        if (barcode && typeof barcode === 'string') {
            console.log(barcode);
            
            const codbarData = JSON.parse(barcode);
            setBarId(codbarData); 
        }
    }, [barcode]); 

    console.log(barId);
    

  return (
    <View>
      <Text>productDetails</Text>
    </View>
  )
}