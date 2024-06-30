"use client"

import React, { useState } from "react"
import { Flex, IconButton, Text, TextField } from "@radix-ui/themes"
import { DragControls, Html, Sphere } from "@react-three/drei"
import { X } from "lucide-react"

export function CustomNode({
  data,
  position,
  onDelete,
  onUpdate,

  setEnableOrbitControls,
}: {
  data: string
  position: [number, number, number]
  onDelete: () => void
  onUpdate: (name: string) => void

  setEnableOrbitControls: (enable: boolean) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(data)
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
    onUpdate(event.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsEditing(false)
    }
  }

  return (
    <DragControls
      onDragStart={() => setEnableOrbitControls(false)}
      onDragEnd={() => setEnableOrbitControls(true)}
    >
      <mesh position={position}>
        <Sphere>
          <meshPhongMaterial
            isMaterial
            polygonOffset
            polygonOffsetFactor={100}
            color="hotpink"
          />
        </Sphere>
        <Html center distanceFactor={5}>
          <Flex
            className="relative group"
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
              <Text size="8" onClick={() => setIsEditing(true)}>
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
          </Flex>
        </Html>
      </mesh>
    </DragControls>
  )
}
