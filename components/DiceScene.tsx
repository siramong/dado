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

  // Crear materiales una sola vez y limpiarlos al desmontar
  useEffect(() => {
    materialsRef.current = [
      new THREE.MeshStandardMaterial({ 
        color: '#667eea',
        metalness: 0.3,
        roughness: 0.4,
      }),
      new THREE.MeshStandardMaterial({ 
        color: '#764ba2',
        metalness: 0.3,
        roughness: 0.4,
      }),
      new THREE.MeshStandardMaterial({ 
        color: '#f093fb',
        metalness: 0.3,
        roughness: 0.4,
      }),
      new THREE.MeshStandardMaterial({ 
        color: '#4facfe',
        metalness: 0.3,
        roughness: 0.4,
      }),
      new THREE.MeshStandardMaterial({ 
        color: '#00f2fe',
        metalness: 0.3,
        roughness: 0.4,
      }),
      new THREE.MeshStandardMaterial({ 
        color: '#43e97b',
        metalness: 0.3,
        roughness: 0.4,
      }),
    ];

    return () => {
      // Limpiar materiales al desmontar
      materialsRef.current.forEach(material => material.dispose());
    };
  }, []);

  useEffect(() => {
    if (isRolling) {
      // Velocidad de rotación aleatoria cuando se lanza
      rotationSpeed.current = {
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5,
        z: (Math.random() - 0.5) * 0.5,
      };
      rollingTime.current = 2; // 2 segundos de rotación
      
      // Calcular rotación final basada en el valor
      const rotations = getFinalRotation(finalValue);
      targetRotation.current = rotations;
    }
  }, [isRolling, finalValue]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    if (isRolling && rollingTime.current > 0) {
      // Rotación mientras se está lanzando
      meshRef.current.rotation.x += rotationSpeed.current.x;
      meshRef.current.rotation.y += rotationSpeed.current.y;
      meshRef.current.rotation.z += rotationSpeed.current.z;
      
      // Reducir el tiempo de rotación
      rollingTime.current -= delta;
      
      // Desacelerar gradualmente
      const decelerationFactor = Math.max(0, rollingTime.current / 2);
      rotationSpeed.current.x *= decelerationFactor;
      rotationSpeed.current.y *= decelerationFactor;
      rotationSpeed.current.z *= decelerationFactor;
    } else if (rollingTime.current <= 0) {
      // Interpolación suave hacia la rotación final
      meshRef.current.rotation.x += (targetRotation.current.x - meshRef.current.rotation.x) * 0.1;
      meshRef.current.rotation.y += (targetRotation.current.y - meshRef.current.rotation.y) * 0.1;
      meshRef.current.rotation.z += (targetRotation.current.z - meshRef.current.rotation.z) * 0.1;
    }
  });

  const getFinalRotation = (value: number): { x: number; y: number; z: number } => {
    // Rotaciones para mostrar cada cara del dado
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
    <mesh ref={meshRef} material={materialsRef.current}>
      <boxGeometry args={[2.5, 2.5, 2.5]} />
    </mesh>
  );
};

export const DiceScene: React.FC<DiceProps> = ({ isRolling, finalValue }) => {
  return (
    <View style={styles.container}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#667eea" />
        <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.3} penumbra={1} />
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
