import React from 'react';
import { View, StyleSheet } from 'react-native';

interface DecorativeCircleProps {
  size: number;
  color: string;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

export const DecorativeCircle: React.FC<DecorativeCircleProps> = ({
  size,
  color,
  top,
  bottom,
  left,
  right,
}) => {
  return (
    <View
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          top,
          bottom,
          left,
          right,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    opacity: 0.6,
  },
});
