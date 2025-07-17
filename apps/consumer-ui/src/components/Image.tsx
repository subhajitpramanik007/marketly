import * as React from 'react';

interface _props extends React.ComponentProps<'img'> {}

export const Image: React.FC<_props> = props => {
  return <img {...props} src={props.src ?? 'no-image.png'} loading="lazy" />;
};
