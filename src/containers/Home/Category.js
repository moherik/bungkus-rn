import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {useStyled} from '../../hooks';
import {Box, Text, TouchableOpacity} from '../../themes/styled';

export const Category = ({data}) => {
  const [selectedId, setSelectedId] = useState(1);
  const theme = useStyled();

  const handleOnClick = id => setSelectedId(id);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => handleOnClick(item.id)}>
        <Box
          bg={selectedId === item.id ? theme.colors.primary : theme.colors.gray}
          borderRadius={theme.radius.full}
          px={theme.space.m}
          py={theme.space.s}
          ml={index === 0 ? theme.space.m : 5}
          mr={index === data.length - 1 ? theme.space.m : 0}>
          <Text
            variant="caption1"
            color={
              selectedId === item.id
                ? theme.colors.light
                : theme.colors.foreground
            }>
            {item.name}
          </Text>
        </Box>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      horizontal={true}
      data={data}
      renderItem={({item, index}) => renderItem({item, index})}
      keyExtractor={item => item.id.toString()}
      showsHorizontalScrollIndicator={false}
    />
  );
};
