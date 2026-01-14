import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { DiceScene } from '../DiceScene';

interface DiceContainerProps {
  isRolling: boolean;
  finalValue: number;
  scaleAnim: Animated.Value;
}

export const DiceContainer: React.FC<DiceContainerProps> = ({ isRolling, finalValue, scaleAnim }) => {
  return (
    <Animated.View style={[styles.diceContainer, { transform: [{ scale: scaleAnim }] }]}>
      <View style={styles.glassCard}>
        <DiceScene isRolling={isRolling} finalValue={finalValue} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  diceContainer: {
    flex: 1,
    marginVertical: 15,
    marginHorizontal: 20,
  },
  glassCard: {
    flex: 1,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
});
