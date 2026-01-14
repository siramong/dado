import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface HeadingProps {
  text: string;
  level?: 1 | 2 | 3;
}

export const Heading: React.FC<HeadingProps> = ({ text, level = 1 }) => {
  const styles = level === 1 ? headingStyles.h1 : level === 2 ? headingStyles.h2 : headingStyles.h3;
  
  return <Text style={styles}>{text}</Text>;
};

const headingStyles = StyleSheet.create({
  h1: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: 'rgba(255, 107, 107, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  h2: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '800',
    letterSpacing: 2,
    textAlign: 'center',
  },
  h3: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});
