"use client"

import React, { useRef, useState } from "react"
import { Flex, IconButton, Text, TextField } from "@radix-ui/themes"
import { DragControls, Html, Sphere } from "@react-three/drei"
import { Eye, X } from "lucide-react"
import * as THREE from "three"

export function CustomNode({
  data,
  position,
  onDelete,
  onUpdate,
  onPositionChange,
  onHide,
}: {
  data: string
  position: [number, number, number]
  onDelete: () => void
  onUpdate: (name: string) => void
  onPositionChange: (position: THREE.Vector3) => void
  onHide: () => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(data)
  const ref = useRef(null)

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
    onUpdate(event.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsEditing(false)
    }
    if (event.key === "Escape") {
      setIsEditing(false)
    }
  }

  const handleDrag = (e: { elements: number[] }) => {
    const matrix = new THREE.Matrix4().fromArray(e.elements)
    const vec = new THREE.Vector3().setFromMatrixPosition(matrix)
    onPositionChange(vec)
  }

  return (
    <DragControls onDrag={handleDrag} ref={ref} axisLock="z">
      <mesh position={position}>
        <Sphere>
          <meshPhongMaterial isMaterial wireframe={true} color="hotpink" />
        </Sphere>
        <Html center distanceFactor={5}>
          <Flex
            className="group relative"
            minWidth="100px"
            minHeight="100px"
            align="center"
            justify="center"
          >
            {isEditing ? (
              <TextField.Root
                value={name}
                onKeyDown={handleKeyDown}
                onChange={handleValueChange}
                onBlur={() => setIsEditing(false)}
                style={{ fontWeight: "bold" }}
              />
            ) : (
              <Text
                size="8"
                weight="bold"
                className="hover:cursor-text"
                onClick={() => setIsEditing(true)}
              >
                {name}
              </Text>
            )}
            <IconButton
              size="1"
              variant="ghost"
              className="absolute -right-5 top-0 hidden group-hover:block"
              onClick={onDelete}
            >
              <X size={16} />
            </IconButton>
            <IconButton
              size="1"
              variant="ghost"
              className="absolute -left-5 top-0 hidden group-hover:block"
              onClick={onHide}
            >
              <Eye size={16} />
            </IconButton>
          </Flex>
        </Html>
      </mesh>
    </DragControls>
  )
}
