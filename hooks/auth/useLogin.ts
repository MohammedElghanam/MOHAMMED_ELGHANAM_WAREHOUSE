import { useState } from 'react'
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

const useLogin = () => {
    const router = useRouter();
    const [errors, setErrors] = useState('');
    const [secretKey, setSecretKey] = useState('');


    const handleSubmit = async () => {
        console.log(secretKey);
        

        if (!secretKey) {
            setErrors("Please enter a secret key.");
            return;
        }
        
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/warehousemans`);
            const users = await response.json();
            console.log(users);
            

            const user = users.find((user: any) => user.secretKey === secretKey);

            if (user) {
                router.replace('/(home)');
            } else {
                setErrors("The secret key entered is incorrect.");
            }

        } catch (error) {
            console.error("Error fetching users:", error);
            Alert.alert("Error", "Could not fetch user data.");
        }
    }

  return {
    errors,
    secretKey,
    setSecretKey,
    handleSubmit
  }
}

export default useLogin;