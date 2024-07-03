"use client"

import { Suspense } from "react"
import { Bounds, ContactShadows, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

import { Node, useData } from "@/lib/contexts/useData"
import { NodeModel } from "@/components/node-model"
import { SelectToZoom } from "@/components/selecto-to-zoom"

export function Mindmap() {
  const { data } = useData()

  const nodes = data.map((node: Node) => {
    return <NodeModel key={node.name} {...node} />
  })

  return (
    <Canvas camera={{ position: [0, -10, 80], fov: 50 }} dpr={[1, 2]}>
      <spotLight
        name="spot-light"
        position={[-100, -100, -100]}
        intensity={0.2}
        angle={0.3}
        penumbra={1}
      />
      <hemisphereLight
        name="hemisphere-light"
        color="white"
        groundColor="#ff0f00"
        position={[-7, 25, 13]}
        intensity={1}
      />
      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.2} name="bounds">
          <SelectToZoom>{nodes}</SelectToZoom>
        </Bounds>
        <ContactShadows
          name="contact-shadows"
          rotation-x={Math.PI / 2}
          position={[0, -35, 0]}
          opacity={0.2}
          width={200}
          height={200}
          blur={1}
          far={50}
        />
      </Suspense>
      <OrbitControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 1.75}
      />
    </Canvas>
  )
}
