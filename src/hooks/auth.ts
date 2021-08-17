import auth from '@react-native-firebase/auth';

export const useAuth = async () => {
  return await auth().currentUser?.getIdToken();
};
