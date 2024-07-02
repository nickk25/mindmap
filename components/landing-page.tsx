"use client"

import { useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@radix-ui/themes"
import {
  Html,
  OrbitControls,
  Preload,
  PresentationControls,
  Stage,
  Text,
  useGLTF,
} from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"

export const LandingPage = () => {
  const { nodes } = useGLTF("/brain2.glb")
  const router = useRouter()

  const handleClick = () => {
    router.push("/network")
  }

  return (
    <Canvas dpr={[1, 2]} camera={{ fov: 45 }} style={{ position: "absolute" }}>
      <Text
        color="black"
        scale={0.3}
        position={[-0.1, 0.25, 0]}
        rotation={[0, 0.21, 0]}
        fontWeight="bold"
      >
        Second
      </Text>
      <Text
        color="black"
        scale={0.3}
        position={[0.2, 0, 0]}
        rotation={[0, -0.6, 0]}
        fontWeight="bold"
      >
        Brain
      </Text>

      <Html position={[0, -0.32, 0]}>
        <Button size="4" className="rounded-full" onClick={handleClick}>
          START
        </Button>
      </Html>

      <ambientLight intensity={0.2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        shadow-mapSize={2048}
        castShadow
      />
      <OrbitControls enablePan={false} enableRotate={false} />
      <PresentationControls
        global
        config={{ mass: 2, tension: 100 }}
        speed={1.5}
        zoom={0.5}
        polar={[0, 0]}
      >
        <Stage environment={"night"} castShadow>
          <Content />
        </Stage>
      </PresentationControls>

      <color attach="background" args={["#f0f0f0"]} />
      <Preload all />
    </Canvas>
  )
}

function Content() {
  const ref = useRef()
  const { nodes } = useGLTF("/brain2.glb")
  useFrame(() => (ref.current.rotation.z += 0.01))
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
