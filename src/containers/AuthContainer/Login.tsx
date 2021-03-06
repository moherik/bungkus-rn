import React, {useEffect, useState} from 'react';
import {
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  useToast,
  VStack,
} from 'native-base';
import {Alert, BackHandler, StyleSheet} from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {Button, LoadingModal} from 'components';
import {APPBAR_TITLE} from 'utils/constants';
import {useSignInMutation} from 'services/user.service';
import {useAppDispatch} from 'hooks';
import {setToken} from 'stores/auth.store';
import {LoginScreenProps} from 'navigation/AuthStack';

type Props = {} & LoginScreenProps;

const LoginContainer: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();

  const [phone, setPhone] = useState<string>('');
  const [formatedPhone, setFormatedPhone] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [formatedCode, setFormatedCode] = useState<string>('');
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const [signIn] = useSignInMutation();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackAction);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackAction);
    };
  });

  const handlePhoneChange = (formated: string, extracted?: string) => {
    setPhone(extracted || '');
    setFormatedPhone(formated);
  };

  const handleCodeChange = (formated: string, extracted?: string) => {
    setCode(extracted || '');
    setFormatedCode(formated);
  };

  const handleResetConfirm = () => setConfirm(null);

  const signInWithGoogle = async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  };

  const signInWithPhoneNumber = async () => {
    setLoading(true);
    await auth()
      .signInWithPhoneNumber(`+62${phone}`)
      .then(value => setConfirm(value))
      .catch(() =>
        showToast('Terjadi Kesalahan, pastikan format nomor telepon benar.'),
      )
      .finally(() => setLoading(false));
  };

  const confirmCode = async () => {
    setLoading(true);
    await confirm
      ?.confirm(code)
      .then(async result => {
        const name = result?.user.displayName;
        const token = await result?.user.getIdToken();
        signIn({phone, name, token})
          .unwrap()
          .then(fulfilled => {
            const {jwtToken, name: resultName} = fulfilled.data;
            if (resultName === null) {
              navigation.navigate('Complete', {phone, jwtToken});
            } else {
              dispatch(setToken(jwtToken));
            }
          })
          .catch(rejected => console.log(rejected));
      })
      .catch(() =>
        showToast('Terjadi Kesalahan, pastikan kode konfirmasi benar.'),
      )
      .finally(() => setLoading(false));
  };

  const showToast = (label: string) =>
    toast.show({
      description: label,
    });

  const handleBackAction = (): boolean => {
    if (confirm) {
      setConfirm(null);
    } else {
      Alert.alert('Keluar!', 'Kamu akan keluar dari aplikasi', [
        {text: 'Batal', onPress: () => null, style: 'cancel'},
        {text: 'Ya', onPress: () => BackHandler.exitApp()},
      ]);
    }

    return true;
  };

  return (
    <>
      <Image
        source={require('../../assets/login-bg.jpg')}
        style={styles.imageBg}
        alt="BG"
      />
      <Box flex={1} bg="#1e1e1ebf" px={8} py={8}>
        {!confirm ? (
          <VStack space={4} justifyContent="space-between" flex={1}>
            <VStack space={4}>
              <VStack space={2} mb={4}>
                <Heading color="white">{APPBAR_TITLE}</Heading>
                <Text color="gray.300" lineHeight={6}>
                  Temukan makanan dan minuman favorit di sekitarmu
                </Text>
              </VStack>
              <Heading size="lg" color="white">
                Masuk
              </Heading>
              <TextInputMask
                style={styles.textBox}
                keyboardType="phone-pad"
                value={formatedPhone}
                onChangeText={handlePhoneChange}
                mask={'+62 [000]-[0000]-[00000]'}
                placeholder="+62 8XX-XXXX-XXXX"
                placeholderTextColor="white"
              />
              <Button
                disabled={phone.length > 8 ? false : true}
                py={4}
                borderRadius="lg"
                onPress={signInWithPhoneNumber}>
                Kirim Kode Verifikasi
              </Button>
            </VStack>
            <VStack space={4}>
              <Button
                py={3}
                bg="white"
                color="black"
                borderRadius="lg"
                rippleBg="#ccc"
                onPress={signInWithGoogle}>
                <HStack alignItems="center" space={4}>
                  <Icon as={<Ionicons name="logo-google" />} size={6} />
                  <Text fontSize="md" fontWeight={700}>
                    Masuk Dengan Google
                  </Text>
                </HStack>
              </Button>
            </VStack>
          </VStack>
        ) : (
          <VStack space={8}>
            <Icon
              as={<Ionicons name="arrow-back-outline" />}
              color="white"
              size="md"
              onPress={handleResetConfirm}
            />
            <VStack space={2}>
              <Heading color="white">Konfirmasi</Heading>
              <Text color="gray.300" lineHeight={6}>
                Masukan kode yang dikirimkan ke nomor kamu.
              </Text>
            </VStack>
            <VStack space={4}>
              <TextInputMask
                style={styles.textBox}
                keyboardType="number-pad"
                value={formatedCode?.toString()}
                onChangeText={handleCodeChange}
                mask={'[0]  [0]  [0]  [0]  [0]  [0]'}
                placeholderTextColor="white"
              />
              <Button py={4} borderRadius="lg" onPress={confirmCode}>
                Lanjutkan
              </Button>
            </VStack>
          </VStack>
        )}
      </Box>
      <LoadingModal loading={loading} />
    </>
  );
};

const styles = StyleSheet.create({
  imageBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'contain',
  },
  textBox: {
    borderRadius: 5,
    backgroundColor: '#ffffff50',
    textTransform: 'uppercase',
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    paddingHorizontal: 15,
  },
});

export default LoginContainer;
