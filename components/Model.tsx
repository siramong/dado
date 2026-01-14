import { useGLTF } from '@react-three/drei/native'
import { Canvas } from '@react-three/fiber/native'
import { Suspense } from 'react'

function DiceModel() {
  const { scene } = useGLTF('/assets/models/dice2.glb')
  return <primitive object={scene} scale={1} />
}

export default function LayoutScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] , fov: 50}}>
      <color attach="background" args={['#000']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      <Suspense fallback={null}>
          <DiceModel />
      </Suspense>
    </Canvas>
  )
}
