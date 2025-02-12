import { CameraType, useCameraPermissions } from "expo-camera";
import { useState } from 'react';
import { useRouter } from 'expo-router';


export default function useScanner() {
    const router = useRouter();
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
        setScanned(true);

        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/products`);
        const products = await response.json();
        // console.log(products);

        const product = products.find((product: any) => product.barcode === data);

        if (product) {
            console.log("fo", data);
            router.push({
                pathname: "/productDetails",
                params: { barcode: JSON.stringify(data) }, 
            });
            setScanned(false);
        } else {
            console.log("bar", data);
            
            router.push({
                pathname: "/productCreate",
                params: { codeScanned: JSON.stringify(data) }, 
            });
            setScanned(false);
        }
    };
    
    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return {
        facing,
        permission,
        scanned,
        requestPermission,
        handleBarCodeScanned,
        toggleCameraFacing,
    }
}