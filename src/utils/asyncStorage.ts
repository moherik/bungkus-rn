import AsyncStorage from '@react-native-async-storage/async-storage';

export const LOGIN_TOKEN = '@login-token';

export const storeLocalData = async ({
  key,
  value,
}: {
  key: string;
  value: any;
}) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

export const getLocalData = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.log(e);
  }
};
