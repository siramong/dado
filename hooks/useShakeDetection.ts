import { useEffect, useState } from 'react';
import { Accelerometer } from 'expo-sensors';

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
    let subscription: any;

    const startListening = async () => {
      try {
        await Accelerometer.setUpdateInterval(100);
        
        subscription = Accelerometer.addListener((accelerometerData) => {
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
