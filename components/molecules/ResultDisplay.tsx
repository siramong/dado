import React from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface ResultDisplayProps {
  value: number;
  fadeAnim: Animated.Value;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ value, fadeAnim }) => {
  return (
    <Animated.View style={[styles.resultContainer, { opacity: fadeAnim, transform: [{ scale: fadeAnim }] }]}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.resultCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.resultLabel}>RESULTADO</Text>
        <View style={styles.resultValueContainer}>
          <LinearGradient
            colors={['#ff6b6b', '#ee5a6f', '#c44569']}
            style={styles.resultValueGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.resultValue}>{value}</Text>
          </LinearGradient>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  resultContainer: {
    alignItems: 'center',
    marginBottom: 15,
    marginHorizontal: 20,
  },
  resultCard: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    minWidth: width - 80,
  },
  resultLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 12,
    fontWeight: '800',
    letterSpacing: 2,
  },
  resultValueContainer: {
    borderRadius: 50,
    overflow: 'hidden',
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 12,
  },
  resultValueGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  resultValue: {
    fontSize: 56,
    fontWeight: '900',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
});
