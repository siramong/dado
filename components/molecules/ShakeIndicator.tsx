import React from 'react';
import { Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ShakeIndicatorProps {
  pulseAnim: Animated.Value;
}

export const ShakeIndicator: React.FC<ShakeIndicatorProps> = ({ pulseAnim }) => {
  return (
    <Animated.View style={[styles.shakeIndicator, { transform: [{ scale: pulseAnim }] }]}>
      <LinearGradient
        colors={['rgba(255, 107, 107, 0.2)', 'rgba(238, 90, 111, 0.1)']}
        style={styles.shakeGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.shakeIcon}>📱</Text>
        <Text style={styles.shakeText}>Sacude el dispositivo</Text>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  shakeIndicator: {
    alignItems: 'center',
    marginBottom: 35,
    marginHorizontal: 40,
  },
  shakeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.3)',
  },
  shakeIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  shakeText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
