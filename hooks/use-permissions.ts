import { useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export type PermissionStatus = 'loading' | 'granted' | 'denied';

export function useLocationPermissions() {
    const [status, setStatus] = useState<PermissionStatus>('loading');
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const requestPermission = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setStatus('denied');
                setErrorMsg('Permission to access location was denied');
                return false;
            }
            setStatus('granted');
            return true;
        } catch (error) {
            setStatus('denied');
            setErrorMsg('Error requesting location permission');
            return false;
        }
    };

    const getCurrentLocation = async () => {
        if (status === 'granted') {
            try {
                const location = await Location.getCurrentPositionAsync({});
                setLocation(location);
                return location;
            } catch (error) {
                setErrorMsg('Error getting current location');
                return null;
            }
        }
        return null;
    };

    useEffect(() => {
        requestPermission().then(granted => {
            if (granted) {
                getCurrentLocation();
            }
        });
    }, [status]);

    return {
        status,
        location,
        errorMsg,
        requestPermission,
        getCurrentLocation
    };
}

export function useCameraPermissionsWrapper() {
    const [permission, requestPermission] = useCameraPermissions();

    const getStatus = (): PermissionStatus => {
        if (!permission) return 'loading';
        return permission.granted ? 'granted' : 'denied';
    };

    return {
        status: getStatus(),
        permission,
        requestPermission
    };
}