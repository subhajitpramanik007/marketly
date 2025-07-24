import * as React from 'react';

type DisplayThisWithValueProps<TValue> = {
  value: TValue;
  condition: 'showWithValue';
  children: (value: TValue) => React.ReactNode;
};

type DisplayThisWithoutValueProps = {
  value: boolean;
  condition?: 'showWithoutValue';
  children: React.ReactNode;
};

type DisplayThisProps<TValue> = DisplayThisWithValueProps<TValue> | DisplayThisWithoutValueProps;

export const DisplayThis = <TValue,>(props: DisplayThisProps<TValue>) => {
  const condition = props.condition ?? 'showWithoutValue';

  if (condition === 'showWithValue') {
    const { value, children } = props as DisplayThisWithValueProps<TValue>;

    if (value != null && value !== false) {
      return <>{children(value)}</>;
    }

    return null;
  }

  const { value, children } = props as DisplayThisWithoutValueProps;

  return value ? <>{children}</> : null;
};
