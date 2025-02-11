
import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useLogin from '@/hooks/auth/useLogin';
 

const Login = () => { 
    
    const {  
        errors,
        secretKey,
        setSecretKey,
        handleSubmit
    } = useLogin();

  return (
    
    <View style={styles.container}>
        <Image
            source={require('../../assets/images/imageLogin.jpg')}
            style={{ width: 200, height: 200, alignSelf: 'center' , marginBottom: 10, borderRadius: 500}}
        />        

        <View style={[ styles.inputContainer, errors ? { borderColor: 'red' } : null ]}>
            <Ionicons 
                name="lock-closed-outline" 
                size={20} 
                color={ errors ? 'red' : "gray" } 
            />
            <TextInput
                style={styles.input}
                placeholder="Enter secret key"
                placeholderTextColor={errors ? 'red' : 'gray'}
                secureTextEntry
                value={secretKey}
                onChangeText={setSecretKey}
            />
        </View>
        {errors && <Text style={styles.error}>{errors}</Text>}

        <View style={styles.btn}>
            <Text style={styles.text} 
                onPress={handleSubmit} 
            >Login</Text>
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 6,
  },
  input: {
    height: 40,
    flex: 1,
    marginLeft: 10,
    paddingVertical: 8,
  },
  btn: {
    height: 50,
    backgroundColor: '#B2A5FF',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginBlockStart: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  link: {
    color: '#3b82f6', 
    textDecorationLine: 'underline',
  },
  error: {
    paddingHorizontal: 10,
    color: 'red',
    fontSize: 12,
  }
});

export default Login;