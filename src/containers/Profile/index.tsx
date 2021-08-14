import React from 'react';
import {FlatList, Heading, HStack, Icon, Text, VStack} from 'native-base';

import {ProfileScreenProps} from 'navigation/types';
import {IProfileMenu, menuItems} from './Menu';
import {
  ListRenderItem,
  ListRenderItemInfo,
  TouchableOpacity,
} from 'react-native';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Separator} from 'components';
import {Header} from './Header';

type Props = {} & ProfileScreenProps;

const Profile: React.FC<Props> = ({}) => {
  const renderItem: ListRenderItem<IProfileMenu> = ({item}) => {
    if (item.type === 'item') {
      return (
        <TouchableOpacity onPress={item.onPress}>
          <HStack
            alignItems="center"
            space={4}
            px={4}
            py={3}
            borderBottomWidth={1}
            borderColor="muted.100">
            {item.iconComponent}
            <HStack flex={1} alignItems="center" justifyContent="space-between">
              <VStack>
                <Text>{item.label}</Text>
                {item.subText && (
                  <Text fontSize="sm" color="muted.400" isTruncated>
                    {item.subText}
                  </Text>
                )}
              </VStack>
              {!item.iconRightName ? (
                <Icon as={<MIcons name="chevron-right" />} size={5} />
              ) : (
                <Icon as={<MIcons name={item.iconRightName} />} size={5} />
              )}
            </HStack>
          </HStack>
        </TouchableOpacity>
      );
    } else if (item.type === 'separator') {
      return (
        <Separator bg="muted.100" py={2} px={4}>
          <Heading size="xs" color="muted.500">
            {item.label}
          </Heading>
        </Separator>
      );
    }

    return null;
  };

  return (
    <>
      <Header />
      <FlatList
        data={menuItems}
        renderItem={(item: ListRenderItemInfo<IProfileMenu>) =>
          renderItem(item)
        }
        keyExtractor={(_item, index) => index.toString()}
        bg="white"
        flex={1}
      />
    </>
  );
};

export default Profile;
