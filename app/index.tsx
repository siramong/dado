import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import * as Haptics from 'expo-haptics';
import { DiceGameTemplate } from '../components/templates/DiceGameTemplate';
import { DiceGameContent } from '../components/organisms/DiceGameContent';
import { useShakeDetection } from '../hooks/useShakeDetection';

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
    <DiceGameTemplate>
      <DiceGameContent
        isRolling={isRolling}
        diceValue={diceValue}
        showResult={showResult}
        scaleAnim={scaleAnim}
        fadeAnim={fadeAnim}
        pulseAnim={pulseAnim}
        onRollDice={rollDice}
      />
    </DiceGameTemplate>
  );
}
