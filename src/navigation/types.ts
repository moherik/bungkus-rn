import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  Tab: undefined;
  Detail: {menuId: number};
  Cart: undefined;
};

export type DetailScreenProps = StackScreenProps<RootStackParamList, 'Detail'>;

export type MainTabParamList = {
  Root: NavigatorScreenParams<RootStackParamList>;
  Home: undefined;
  Feed: undefined;
  Profile: undefined;
};

export type HomeScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Home'>,
  StackNavigationProp<RootStackParamList>
>;

export type HomeScreenProps = BottomTabScreenProps<MainTabParamList, 'Home'>;
export type FeedScreenProps = BottomTabScreenProps<MainTabParamList, 'Feed'>;
export type ProfileScreenProps = BottomTabScreenProps<
  MainTabParamList,
  'Profile'
>;
