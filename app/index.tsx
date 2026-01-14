import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';
import { DiceScene } from '../components/DiceScene';
import { useShakeDetection } from '../hooks/useShakeDetection';

export default function Index() {
  const [isRolling, setIsRolling] = useState(false);
  const [diceValue, setDiceValue] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const scaleAnim = useMemo(() => new Animated.Value(1), []);

  const rollDice = useCallback(() => {
    if (isRolling) return;

    // Haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    setIsRolling(true);
    setShowResult(false);

    // Generar valor aleatorio
    const newValue = Math.floor(Math.random() * 6) + 1;
    
    // Animación de escala
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Después de 2 segundos, mostrar el resultado
    setTimeout(() => {
      setDiceValue(newValue);
      setIsRolling(false);
      setShowResult(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 2000);
  }, [isRolling, scaleAnim]);

  // Detectar sacudida del teléfono
  useShakeDetection(rollDice, { threshold: 2.5, timeout: 1000 });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Fondo degradado moderno */}
      <LinearGradient
        colors={['#0f0c29', '#302b63', '#24243e']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🎲 Lanza el Dado</Text>
        <Text style={styles.subtitle}>Sacude tu teléfono o toca el botón</Text>
      </View>

      {/* Área del dado 3D */}
      <Animated.View style={[styles.diceContainer, { transform: [{ scale: scaleAnim }] }]}>
        <DiceScene isRolling={isRolling} finalValue={diceValue} />
      </Animated.View>

      {/* Resultado */}
      {showResult && !isRolling && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Resultado</Text>
          <View style={styles.resultValueContainer}>
            <Text style={styles.resultValue}>{diceValue}</Text>
          </View>
        </View>
      )}

      {/* Botón de lanzar */}
      <TouchableOpacity
        style={[styles.button, isRolling && styles.buttonDisabled]}
        onPress={rollDice}
        disabled={isRolling}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={isRolling ? ['#666', '#888'] : ['#667eea', '#764ba2']}
          style={styles.buttonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.buttonText}>
            {isRolling ? '🎲 Lanzando...' : '🎯 Lanzar Dado'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Indicador de shake */}
      <View style={styles.shakeIndicator}>
        <Text style={styles.shakeText}>📱 Sacude para lanzar</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  diceContainer: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  resultContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  resultLabel: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 8,
    fontWeight: '600',
  },
  resultValueContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(102, 126, 234, 0.3)',
    borderWidth: 3,
    borderColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultValue: {
    fontSize: 48,
    fontWeight: '900',
    color: '#fff',
    textShadowColor: 'rgba(102, 126, 234, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  button: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  shakeIndicator: {
    alignItems: 'center',
    marginBottom: 30,
  },
  shakeText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '500',
  },
});
