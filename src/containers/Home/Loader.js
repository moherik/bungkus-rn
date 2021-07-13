import React from 'react';
import {Dimensions} from 'react-native';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {useStyled} from '../../hooks';

export const MenuItemLoader = props => (
  <ContentLoader
    speed={2}
    width={400}
    height={140}
    viewBox="0 0 400 140"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <Rect x="122" y="10" rx="5" ry="5" width="270" height="24" />
    <Rect x="0" y="0" rx="11" ry="11" width="100" height="106" />
    <Rect x="121" y="43" rx="5" ry="5" width="147" height="24" />
    <Rect x="122" y="81" rx="5" ry="5" width="147" height="16" />
  </ContentLoader>
);

export const HorizontalSectionLoader = props => (
  <ContentLoader
    speed={2}
    width={800}
    height={220}
    viewBox="0 0 800 220"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <Rect x="0" y="0" rx="10" ry="10" width="200" height="200" />
    <Rect x="219" y="0" rx="10" ry="10" width="200" height="200" />
    <Rect x="438" y="0" rx="10" ry="10" width="200" height="200" />
  </ContentLoader>
);

export const SearchLoader = props => {
  const theme = useStyled();
  const width = Dimensions.get('window').width - theme.space.m * 2;

  return (
    <ContentLoader
      speed={2}
      width={Dimensions.get('window').width}
      height={100}
      viewBox={`0 0 ${width} 100`}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}>
      <Rect x="0" y="0" rx="5" ry="5" width={width} height="40" />
      <Rect x="0" y="50" rx="20" ry="20" width="100" height="34" />
      <Rect x="104" y="50" rx="20" ry="20" width="100" height="34" />
      <Rect x="211" y="50" rx="20" ry="20" width="100" height="34" />
      <Rect x="319" y="50" rx="20" ry="20" width="100" height="34" />
    </ContentLoader>
  );
};
