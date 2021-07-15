import React from 'react';
import {HStack, Icon, Input, Text, VStack} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SearchLoader} from './Loader';
import {Category} from './Category';
import {MenuCategoryType} from 'models/menu/type';
import {TouchableOpacity} from 'react-native';

type Props = {
  loading: boolean;
  categories: MenuCategoryType[];
};

export const Panel: React.FC<Props> = ({loading, categories}) => {
  if (loading) {
    return <SearchLoader />;
  }

  return (
    <VStack
      space={2}
      py={2}
      bg="white"
      borderBottomWidth={2}
      borderColor="gray.100">
      <HStack mx={4} space={1}>
        <Input
          flex={1}
          variant="filled"
          placeholder="Cari makan apa hari ini?"
          InputLeftElement={
            <Icon
              as={<Ionicons name="search" />}
              size={4}
              color="gray.400"
              ml={4}
            />
          }
          borderRadius={20}
          size="sm"
          height={44}
        />
        <TouchableOpacity onPress={() => {}}>
          <HStack
            bg="gray.200"
            borderRadius={20}
            alignItems="center"
            px={4}
            height={44}
            space={1}>
            <Icon
              as={<Ionicons name="filter-outline" />}
              size={4}
              color="gray.500"
            />
            <Text color="gray.500" fontSize="xs">
              Filter
            </Text>
          </HStack>
        </TouchableOpacity>
      </HStack>
      <Category data={categories} />
    </VStack>
  );
};
