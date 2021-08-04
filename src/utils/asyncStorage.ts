import AsyncStorage from '@react-native-async-storage/async-storage';

export const LOGIN_KEY = '@login';

export const storeData = async ({key, value}: {key: string; value: any}) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};
