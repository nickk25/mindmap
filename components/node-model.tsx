"use client"

import React from "react"
import { Text } from "@radix-ui/themes"
import { DragControls, Html } from "@react-three/drei"

export function NodeModel({
  name,
  position,
  rotation,
  scale,
  ...props
}: {
  name: string
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  props?: any
}) {
  return (
    <DragControls>
      <mesh {...props} position={position} rotation={rotation} scale={scale}>
        <dodecahedronGeometry />
        <meshStandardMaterial roughness={0.75} emissive="#404057" />
        <Html distanceFactor={10}>
          <Text>{name}</Text>
        </Html>
      </mesh>
    </DragControls>
  )
}
