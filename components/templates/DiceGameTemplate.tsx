import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Background } from '../organisms/Background';

interface DiceGameTemplateProps {
  children: React.ReactNode;
}

export const DiceGameTemplate: React.FC<DiceGameTemplateProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Background />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
