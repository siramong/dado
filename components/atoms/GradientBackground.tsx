import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientBackgroundProps {
  colors?: string[];
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  colors = ['#1a1a2e', '#16213e', '#0f3460', '#533483'],
}) => {
  return (
    <LinearGradient
      colors={colors}
      style={styles.background}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    />
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
