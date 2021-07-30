import auth from '@react-native-firebase/auth';

const useAuth = async () => {
  const token = await auth().currentUser?.getIdToken();
};
