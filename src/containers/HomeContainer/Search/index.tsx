import React, {useState} from 'react';
import {
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useRoute} from '@react-navigation/native';

import {Ripple} from 'components';
import {MerchantCategory} from 'models/merchant.model';

type Props = {};

type Item = {
  name: string;
};

const history: Item[] = [{name: 'Halo'}, {name: 'Mie ayam'}];

const popular: Item[] = [
  {name: 'Gorengan'},
  {name: 'Kopi Pahit'},
  {name: 'Mie Ayam'},
  {name: 'Pecel Lele'},
  {name: 'Ayam Geprek'},
];

const RenderItem = ({label, items}: {label: string; items: Item[]}) => {
  return (
    <VStack space={2}>
      <Heading size="sm" color="muted.500">
        {label}
      </Heading>
      <HStack space={1} flexWrap="wrap">
        {items.map((item, index) => (
          <Ripple
            bg="muted.100"
            borderRadius={100}
            onPress={() => {}}
            key={index}
            mb={2}>
            <Box py={2} px={3}>
              <Text fontSize="sm">{item.name}</Text>
            </Box>
          </Ripple>
        ))}
      </HStack>
    </VStack>
  );
};

const Search: React.FC<Props> = ({}) => {
  const navigation = useNavigation();
  const params = useRoute().params as any;

  const [keyword, setKeyword] = useState<string>();

  const handleOnChnagetText = (text: string) => setKeyword(text);

  return (
    <>
      <HStack
        bg="white"
        alignItems="center"
        justifyContent="flex-start"
        shadow={2}
        overflow="hidden">
        <Ripple onPress={() => navigation.goBack()}>
          <Box p={3}>
            <Icon as={<MIcons name="arrow-left" />} size={6} />
          </Box>
        </Ripple>
        <Box bg="white" borderRadius="lg" alignItems="center" pr={4} py={1}>
          <Input
            color="muted.400"
            p={0}
            variant="unstyled"
            placeholder="Cari menu apa hari ini?"
            autoFocus
            onChangeText={handleOnChnagetText}
          />
        </Box>
      </HStack>

      <ScrollView bg="white" flex={1}>
        {keyword ? (
          <VStack p={4}>
            <Text>Suggestion</Text>
          </VStack>
        ) : (
          <>
            <VStack space={4} p={4}>
              <RenderItem label="Riwayat Pencarian" items={history} />
              <RenderItem label="Pencarian Populer" items={popular} />
            </VStack>
            <VStack>
              <Heading px={4} mb={2} size="sm" color="muted.500">
                Semua kategori
              </Heading>
              {(params.categories as MerchantCategory[]).map(
                (category, index) => (
                  <Ripple onPress={() => {}} key={index}>
                    <HStack
                      borderBottomWidth={1}
                      borderBottomColor="muted.200"
                      px={4}
                      py={2}
                      space={2}
                      alignItems="center">
                      <Image
                        source={{uri: category.image}}
                        alt={category.name}
                        width={8}
                        height={8}
                        borderRadius="lg"
                      />
                      <Text fontSize="sm">{category.name}</Text>
                    </HStack>
                  </Ripple>
                ),
              )}
            </VStack>
          </>
        )}
      </ScrollView>
    </>
  );
};

export default Search;
