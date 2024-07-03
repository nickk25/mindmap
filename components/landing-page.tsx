"use client"

import {
  OrbitControls,
  Preload,
  PresentationControls,
  Stage,
  Text,
} from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

import { BrainModel } from "@/components/models/brain-model"
import { Navigation } from "@/components/navigation"

export const LandingPage = () => {
  return (
    <div className="relative h-screen w-screen">
      <div className="absolute right-7 top-5 z-50">
        <Navigation />
      </div>
      <Canvas dpr={[1, 2]} camera={{ fov: 45 }}>
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
            <BrainModel />
          </Stage>
        </PresentationControls>

        <color attach="background" args={["#d0d0d0"]} />
        <Preload all />
      </Canvas>
    </div>
  )
}
