import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';

export const Loader = () => (
  <ContentLoader
    speed={2}
    width={600}
    height={600}
    viewBox="0 0 600 600"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <Rect x="19" y="260" rx="0" ry="0" width="247" height="33" />
    <Rect x="21" y="307" rx="0" ry="0" width="127" height="25" />
    <Rect x="20" y="348" rx="0" ry="0" width="358" height="92" />
    <Rect x="22" y="457" rx="0" ry="0" width="179" height="25" />
    <Rect x="0" y="0" rx="0" ry="0" width="600" height="240" />
  </ContentLoader>
);
