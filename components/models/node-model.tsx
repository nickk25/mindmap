"use client"

import React from "react"
import { Text } from "@radix-ui/themes"
import { DragControls, Html } from "@react-three/drei"

export function NodeModel({
  name,
  position,
  rotation,
  scale,
  id,
  visible,
  ...props
}: {
  id: string
  name: string
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  props?: any
  visible: boolean
}) {
  return (
    <DragControls>
      <mesh
        {...props}
        position={position}
        rotation={rotation}
        scale={scale}
        visible={visible}
        name={id}
      >
        <dodecahedronGeometry />
        <meshStandardMaterial roughness={0.75} emissive="#404057" />
        {visible && (
          <Html distanceFactor={10}>
            <Text>{name}</Text>
          </Html>
        )}
      </mesh>
    </DragControls>
  )
}
