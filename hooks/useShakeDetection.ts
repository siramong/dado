import { useEffect, useState } from 'react';
import { Accelerometer, AccelerometerMeasurement } from 'expo-sensors';
import type { Subscription } from 'expo-modules-core';

interface ShakeDetectionOptions {
  threshold?: number;
  timeout?: number;
}

export const useShakeDetection = (
  onShake: () => void,
  options: ShakeDetectionOptions = {}
) => {
  const { threshold = 2.5, timeout = 500 } = options;
  const [lastShake, setLastShake] = useState<number>(0);

  useEffect(() => {
    let subscription: Subscription | undefined;

    const startListening = async () => {
      try {
        await Accelerometer.setUpdateInterval(100);
        
        subscription = Accelerometer.addListener((accelerometerData: AccelerometerMeasurement) => {
          const { x, y, z } = accelerometerData;
          const acceleration = Math.sqrt(x * x + y * y + z * z);
          
          const now = Date.now();
          
          if (acceleration > threshold && now - lastShake > timeout) {
            setLastShake(now);
            onShake();
          }
        });
      } catch (error) {
        console.error('Error starting accelerometer:', error);
      }
    };

    startListening();

    return () => {
      subscription?.remove();
    };
  }, [onShake, threshold, timeout, lastShake]);

  return null;
};
