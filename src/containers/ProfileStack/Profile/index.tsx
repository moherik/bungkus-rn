import React from 'react';
import {FlatList, Heading, HStack, Icon, Text, VStack} from 'native-base';

import {IProfileMenu, menuItems} from './Menu';
import {ListRenderItem, ListRenderItemInfo} from 'react-native';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {AppBar, Ripple, Separator} from 'components';
import {Header} from './Header';
import {ProfileScreenProps} from 'navigation/ProfileStack';

type Props = {} & ProfileScreenProps;

const Profile: React.FC<Props> = ({navigation}) => {
  const handleOnPress = ({route}: {route?: string; isUri?: boolean}) => {
    if (route) {
      navigation.navigate(route as any);
    }
  };

  const renderItem: ListRenderItem<IProfileMenu> = ({item}) => {
    if (item.type === 'item') {
      return (
        <Ripple
          onPress={() => handleOnPress({route: item.route, isUri: item.isUri})}>
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
        </Ripple>
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
      <AppBar
        title="Akun"
        showBack={false}
        rightComp={
          <HStack mr={3} space={1}>
            <Ripple borderRadius={100} onPress={() => {}}>
              <Icon m={1} as={<MIcons name="cog-outline" />} size={6} />
            </Ripple>
            <Ripple borderRadius={100} onPress={() => {}}>
              <Icon m={1} as={<MIcons name="help-circle-outline" />} size={6} />
            </Ripple>
          </HStack>
        }
      />
      <FlatList
        data={menuItems}
        renderItem={(item: ListRenderItemInfo<IProfileMenu>) =>
          renderItem(item)
        }
        ListHeaderComponent={Header}
        keyExtractor={(_item, index) => index.toString()}
        bg="white"
        flex={1}
      />
    </>
  );
};

export default Profile;
