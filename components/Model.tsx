import modelPath from '@/assets/models/dice2.glb'
import { Gltf } from '@react-three/drei/native'
import { Canvas } from '@react-three/fiber/native'
import { Suspense } from 'react'

export default function LayoutScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] , fov: 50}}>
      <color attach={"background"} args={['#000']} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Suspense fallback={null}>
          <group>
            <Gltf src={modelPath} />
          </group>
      </Suspense>
    </Canvas>
  )
}
