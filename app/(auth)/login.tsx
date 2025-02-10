
import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
 

const Login = () => {  

  return (
    
    <View style={styles.container}>
        <Image
            source={require('../../assets/images/imageLogin.jpg')}
            style={{ width: 200, height: 200, alignSelf: 'center' , marginBottom: 1}}
        />        

        <View style={[ styles.inputContainer, errors.password ? { borderColor: 'red' } : null ]}>
            <Ionicons 
                name="lock-closed-outline" 
                size={20} 
                color={ errors.password ? 'red' : "gray" } 
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={errors.password ? 'red' : 'gray'}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
        </View>
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

        <View style={styles.btn}>
            <Text style={styles.text} onPress={handleSubmit} >Login</Text>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
    backgroundColor: '#6d1fad',
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
  user: {
    color: '#333',
  },
  error: {
    paddingHorizontal: 10,
    color: 'red',
    fontSize: 12,
  }
});

export default Login;