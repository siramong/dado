import { useGLTF } from '@react-three/drei/native'
import { Canvas } from '@react-three/fiber/native'
import { Suspense } from 'react'
import modelPath from '../assets/models/dice.glb'

interface ModelProps {
    [key: string]: any
}

function Model(props: ModelProps) {
    const gltf = useGLTF(modelPath)
    const scene = Array.isArray(gltf) ? gltf[0].scene : gltf.scene
    return <primitive {...props} object={scene} />
}

export default function App() {
  return (
    <Canvas>
      <ambientLight />
      <Suspense>
        <Model />
      </Suspense>
    </Canvas>
  )
}
