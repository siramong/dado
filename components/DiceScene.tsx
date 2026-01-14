import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DiceProps {
  isRolling: boolean;
  finalValue: number;
}

const DiceMesh: React.FC<DiceProps> = ({ isRolling, finalValue }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const rotationSpeed = useRef({ x: 0, y: 0, z: 0 });
  const targetRotation = useRef({ x: 0, y: 0, z: 0 });
  const rollingTime = useRef(0);

  // Crear materiales modernos con colores vibrantes
  useEffect(() => {
    materialsRef.current = [
      new THREE.MeshStandardMaterial({ 
        color: '#ff6b6b',
        metalness: 0.5,
        roughness: 0.3,
        emissive: '#ff6b6b',
        emissiveIntensity: 0.2,
      }),
      new THREE.MeshStandardMaterial({ 
        color: '#ee5a6f',
        metalness: 0.5,
        roughness: 0.3,
        emissive: '#ee5a6f',
        emissiveIntensity: 0.2,
      }),
      new THREE.MeshStandardMaterial({ 
        color: '#c44569',
        metalness: 0.5,
        roughness: 0.3,
        emissive: '#c44569',
        emissiveIntensity: 0.2,
      }),
      new THREE.MeshStandardMaterial({ 
        color: '#f8b500',
        metalness: 0.5,
        roughness: 0.3,
        emissive: '#f8b500',
        emissiveIntensity: 0.2,
      }),
      new THREE.MeshStandardMaterial({ 
        color: '#4ecdc4',
        metalness: 0.5,
        roughness: 0.3,
        emissive: '#4ecdc4',
        emissiveIntensity: 0.2,
      }),
      new THREE.MeshStandardMaterial({ 
        color: '#95e1d3',
        metalness: 0.5,
        roughness: 0.3,
        emissive: '#95e1d3',
        emissiveIntensity: 0.2,
      }),
    ];

    return () => {
      // Limpiar materiales al desmontar
      materialsRef.current.forEach(material => material.dispose());
    };
  }, []);

  useEffect(() => {
    if (isRolling) {
      // Velocidad de rotación más dramática
      rotationSpeed.current = {
        x: (Math.random() - 0.5) * 0.6,
        y: (Math.random() - 0.5) * 0.6,
        z: (Math.random() - 0.5) * 0.6,
      };
      rollingTime.current = 2;
      
      const rotations = getFinalRotation(finalValue);
      targetRotation.current = rotations;
    }
  }, [isRolling, finalValue]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    if (isRolling && rollingTime.current > 0) {
      // Rotación dramática mientras se está lanzando
      meshRef.current.rotation.x += rotationSpeed.current.x;
      meshRef.current.rotation.y += rotationSpeed.current.y;
      meshRef.current.rotation.z += rotationSpeed.current.z;
      
      rollingTime.current -= delta;
      
      // Desacelerar con efecto más suave
      const decelerationFactor = Math.max(0, rollingTime.current / 2);
      rotationSpeed.current.x *= (0.95 + decelerationFactor * 0.05);
      rotationSpeed.current.y *= (0.95 + decelerationFactor * 0.05);
      rotationSpeed.current.z *= (0.95 + decelerationFactor * 0.05);
    } else if (rollingTime.current <= 0) {
      // Interpolación suave hacia la rotación final
      meshRef.current.rotation.x += (targetRotation.current.x - meshRef.current.rotation.x) * 0.1;
      meshRef.current.rotation.y += (targetRotation.current.y - meshRef.current.rotation.y) * 0.1;
      meshRef.current.rotation.z += (targetRotation.current.z - meshRef.current.rotation.z) * 0.1;
    }

    // Rotación suave constante cuando no está rodando
    if (!isRolling && rollingTime.current <= 0) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  const getFinalRotation = (value: number): { x: number; y: number; z: number } => {
    switch (value) {
      case 1: return { x: 0, y: 0, z: 0 };
      case 2: return { x: 0, y: Math.PI / 2, z: 0 };
      case 3: return { x: 0, y: 0, z: -Math.PI / 2 };
      case 4: return { x: 0, y: 0, z: Math.PI / 2 };
      case 5: return { x: 0, y: -Math.PI / 2, z: 0 };
      case 6: return { x: Math.PI, y: 0, z: 0 };
      default: return { x: 0, y: 0, z: 0 };
    }
  };

  return (
    <mesh ref={meshRef} material={materialsRef.current} castShadow receiveShadow>
      <boxGeometry args={[2.5, 2.5, 2.5]} />
    </mesh>
  );
};

export const DiceScene: React.FC<DiceProps> = ({ isRolling, finalValue }) => {
  return (
    <View style={styles.container}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        shadows
      >
        {/* Iluminación moderna y dramática */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ff6b6b" castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#4ecdc4" />
        <spotLight 
          position={[0, 15, 0]} 
          intensity={1.2} 
          angle={0.4} 
          penumbra={1} 
          color="#ffffff"
          castShadow 
        />
        <DiceMesh isRolling={isRolling} finalValue={finalValue} />
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
