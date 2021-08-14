import React from 'react';
import {TouchableOpacity} from 'react-native';
import {HStack, Icon, Input, Text, VStack} from 'native-base';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {SearchLoader} from './Loader';
import {Category} from './Category';
import {MenuCategory} from 'models/menu.model';

type Props = {
  loading: boolean;
  categories: MenuCategory[];
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
      borderTopWidth={1}
      borderBottomWidth={1}
      borderColor="gray.100">
      <HStack mx={4} space={1}>
        <Input
          flex={1}
          variant="filled"
          placeholder="Cari makan apa hari ini?"
          InputLeftElement={
            <Icon
              as={<MIcons name="magnify" />}
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
              as={<MIcons name="filter-menu-outline" />}
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
