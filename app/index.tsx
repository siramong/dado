import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';
import { DiceScene } from '../components/DiceScene';
import { useShakeDetection } from '../hooks/useShakeDetection';

const { width } = Dimensions.get('window');

export default function Index() {
  const [isRolling, setIsRolling] = useState(false);
  const [diceValue, setDiceValue] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const scaleAnim = useMemo(() => new Animated.Value(1), []);
  const fadeAnim = useMemo(() => new Animated.Value(0), []);
  const pulseAnim = useMemo(() => new Animated.Value(1), []);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Animación de pulso para el indicador de shake
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    return () => {
      pulse.stop();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pulseAnim]);

  const rollDice = useCallback(() => {
    if (isRolling) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    setIsRolling(true);
    setShowResult(false);

    const newValue = Math.floor(Math.random() * 6) + 1;
    
    // Animación más dramática
    Animated.parallel([
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1.2,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDiceValue(newValue);
      setIsRolling(false);
      setShowResult(true);
      
      Animated.spring(fadeAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }).start();
      
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 2000);
  }, [isRolling, scaleAnim, fadeAnim]);

  useShakeDetection(rollDice, { threshold: 2.5, timeout: 1000 });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Fondo degradado vibrante y moderno */}
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460', '#533483']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Círculos decorativos de fondo */}
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />

      {/* Header con estilo moderno */}
      <View style={styles.header}>
        <Text style={styles.title}>🎲</Text>
        <Text style={styles.subtitle}>LANZA EL DADO</Text>
        <Text style={styles.hint}>Sacude o toca para empezar</Text>
      </View>

      {/* Área del dado 3D con efecto glassmorphism */}
      <Animated.View style={[styles.diceContainer, { transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.glassCard}>
          <DiceScene isRolling={isRolling} finalValue={diceValue} />
        </View>
      </Animated.View>

      {/* Resultado con animación */}
      {showResult && !isRolling && (
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
                <Text style={styles.resultValue}>{diceValue}</Text>
              </LinearGradient>
            </View>
          </LinearGradient>
        </Animated.View>
      )}

      {/* Botón moderno con gradiente neón */}
      <TouchableOpacity
        style={[styles.button, isRolling && styles.buttonDisabled]}
        onPress={rollDice}
        disabled={isRolling}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={isRolling ? ['#535353', '#7a7a7a'] : ['#ff6b6b', '#ee5a6f', '#c44569']}
          style={styles.buttonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.buttonText}>
            {isRolling ? '🎲 LANZANDO...' : '🎯 LANZAR DADO'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Indicador de shake con animación de pulso */}
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
  decorativeCircle1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    top: -100,
    right: -100,
    opacity: 0.6,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(238, 90, 111, 0.1)',
    bottom: -50,
    left: -80,
    opacity: 0.6,
  },
  header: {
    paddingTop: 70,
    paddingHorizontal: 30,
    alignItems: 'center',
    zIndex: 1,
    marginBottom: 10,
  },
  title: {
    fontSize: 64,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: 2,
    textShadowColor: 'rgba(255, 107, 107, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  hint: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
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
  button: {
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 12,
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonGradient: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
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
