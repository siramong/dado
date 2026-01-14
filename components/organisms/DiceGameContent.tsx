import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Header } from '../molecules/Header';
import { DiceContainer } from '../molecules/DiceContainer';
import { ResultDisplay } from '../molecules/ResultDisplay';
import { Button } from '../atoms/Button';
import { ShakeIndicator } from '../molecules/ShakeIndicator';

interface DiceGameContentProps {
  isRolling: boolean;
  diceValue: number;
  showResult: boolean;
  scaleAnim: Animated.Value;
  fadeAnim: Animated.Value;
  pulseAnim: Animated.Value;
  onRollDice: () => void;
}

export const DiceGameContent: React.FC<DiceGameContentProps> = ({
  isRolling,
  diceValue,
  showResult,
  scaleAnim,
  fadeAnim,
  pulseAnim,
  onRollDice,
}) => {
  return (
    <>
      <Header />
      
      <DiceContainer isRolling={isRolling} finalValue={diceValue} scaleAnim={scaleAnim} />
      
      {showResult && !isRolling && (
        <ResultDisplay value={diceValue} fadeAnim={fadeAnim} />
      )}
      
      <View style={styles.buttonContainer}>
        <Button
          onPress={onRollDice}
          disabled={isRolling}
          text={isRolling ? 'LANZANDO...' : 'LANZAR DADO'}
          icon={isRolling ? '🎲' : '🎯'}
        />
      </View>
      
      <ShakeIndicator pulseAnim={pulseAnim} />
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
});
