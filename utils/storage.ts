import AsyncStorage from '@react-native-async-storage/async-storage';

export class LocalStorageServiceAsync {

    static async storeData(key: string, value: string): Promise<void> {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error setting item:', error);
        }
    }

    static async getData(key: string): Promise<string | null> {
        try {
            const value = await AsyncStorage.getItem(key);
            return value != null ? JSON.parse(value) : null;
        } catch (error) {
            console.error('Error getting item:', error);
            return null;
        }
    }

    static async removeData(key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing item:', error);
        }
    }

    static async getAllData(): Promise<{[key: string]: any}> {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const items = await AsyncStorage.multiGet(keys);
            return items.reduce((accumulator, [key, value]) => {
                if (value !== null) {
                    accumulator[key] = JSON.parse(value);
                }
                return accumulator;
            }, {} as {[key: string]: any});
        } catch (error) {
            console.error('Error getting all items:', error);
            return {};
        }
    }
}