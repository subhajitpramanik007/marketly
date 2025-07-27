import * as React from 'react';

interface _props extends React.ComponentProps<'img'> {
  href?: string | null;
}

export const Image: React.FC<_props> = props => {
  return <img {...props} src={props.src || props.href || 'no-image.png'} loading="lazy" />;
};
