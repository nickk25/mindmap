"use client"

import React from "react"
import { DragControls, Sphere } from "@react-three/drei"
import { Container, Root, Text } from "@react-three/uikit"
import * as THREE from "three"

export function NodeModel({
  data,
  position,
  onPositionChange,
  onClick,
}: {
  data: string
  position: [number, number, number]
  onPositionChange: (position: THREE.Vector3) => void
  onClick: () => void
}) {
  const handleDrag = (e: { elements: number[] }) => {
    const matrix = new THREE.Matrix4().fromArray(e.elements)
    const vec = new THREE.Vector3().setFromMatrixPosition(matrix)
    onPositionChange(vec)
  }

  return (
    <DragControls onDrag={handleDrag}>
      <mesh position={position} onClick={onClick}>
        <Sphere scale={0.5}>
          <meshPhongMaterial wireframe={true} color="hotpink" opacity={0.3} />
        </Sphere>
        <Root anchorX="center" anchorY="center">
          <Container>
            <Text color="white">{data}</Text>
          </Container>
        </Root>
      </mesh>
    </DragControls>
  )
}
