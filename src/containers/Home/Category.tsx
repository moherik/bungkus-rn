import React, {useState} from 'react';
import {Badge, Text} from 'native-base';
import {FlatList, ListRenderItem, TouchableOpacity} from 'react-native';

import {MenuCategory} from 'models/menu.model';

type Props = {
  data: MenuCategory[];
};

export const Category: React.FC<Props> = ({data}) => {
  const [selectedId, setSelectedId] = useState(0);

  const handleOnClick = (id: number | string) => setSelectedId(+id);

  const renderItem: ListRenderItem<MenuCategory> = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => handleOnClick(item.id)}>
        <Badge
          bg={item.id === selectedId ? 'red.600' : 'gray.200'}
          borderRadius={100}
          ml={index === 0 ? 4 : 0}
          mr={index === data.length - 1 ? 4 : 0}
          py={2}
          px={4}>
          <Text
            fontSize="xs"
            fontWeight={item.id === selectedId ? '700' : '500'}
            color={item.id === selectedId ? 'white' : 'gray.500'}>
            {item.name}
          </Text>
        </Badge>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      horizontal={true}
      data={data}
      renderItem={item => renderItem(item)}
      keyExtractor={item => item.id.toString()}
      showsHorizontalScrollIndicator={false}
    />
  );
};
