import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Heading } from '../atoms/Heading';

export const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <Heading text="🎲" level={1} />
      <Heading text="LANZA EL DADO" level={1} />
      <Heading text="Sacude o toca para empezar" level={3} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 70,
    paddingHorizontal: 30,
    alignItems: 'center',
    zIndex: 1,
    marginBottom: 10,
  },
});
