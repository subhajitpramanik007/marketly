import * as React from 'react';

interface DisplayMapProps<T> {
  data: T[];
  className: string;
  children: (item: T) => React.ReactNode;
}

export const DisplayMap: React.FC<DisplayMapProps<any>> = ({ data, children, className }) => {
  return (
    <div className={className}>
      {data.map(item => (
        <>{children(item)}</>
      ))}
    </div>
  );
};
