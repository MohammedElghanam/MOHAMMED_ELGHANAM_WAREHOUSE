import { CameraType, useCameraPermissions } from "expo-camera";
import { useState } from 'react';

export default function useScanner() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
        setScanned(true);
        alert(`Barcode scanned! Type: ${type}, Data: ${data}`);
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