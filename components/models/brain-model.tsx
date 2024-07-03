"use client"

import { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

export function BrainModel() {
  const ref = useRef<any | null>(null)
  const { nodes } = useGLTF("/brain2.glb")
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z += 0.01
    }
  })
  return (
    <mesh
      ref={ref}
      geometry={(nodes as any).mesh.geometry}
      material={(nodes as any).mesh.material}
      rotation={[Math.PI / 2, 0, 2.4]}
    >
      <meshNormalMaterial wireframe={true} opacity={0.5} />
    </mesh>
  )
}
