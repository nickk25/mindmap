"use client"

import React, { Suspense, useState } from "react"
import { Button } from "@radix-ui/themes"
import { CameraControls, Line, OrbitControls, Preload } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import * as THREE from "three"

import { CustomNode } from "@/components/reactflow/custom-node"

type Node = {
  id: string
  data: string
  position: [number, number, number]
  parentId?: string
  hidden?: boolean
}

const initNodes: Node[] = [
  {
    id: "1",
    data: "Jane Doe",
    position: [0, 0, 0],
  },
]

export const Flow = () => {
  const [nodes, setNodes] = useState(initNodes)
  const [nodeId, setNodeId] = useState(2)

  const addNode = (parentId?: string) => {
    let position: [number, number, number] = [
      Math.random() * 6 - 3,
      Math.random() * 6 - 3,
      Math.random() * 6 - 3,
    ]

    if (parentId) {
      const parentNode = nodes.find((node) => node.id === parentId)
      if (parentNode) {
        position = [
          parentNode.position[0] + position[0],
          parentNode.position[1] + position[1],
          parentNode.position[2] + position[2],
        ]
      }
    }
    const newNode: Node = {
      id: nodeId.toString(),
      data: "Nuevo Nodo " + nodeId,
      position: position,
      ...(parentId ? { parentId } : {}),
    }
    setNodes((nds) => [...nds, newNode])
    setNodeId((id) => id + 1)
  }

  const onDelete = (id: string) => {
    const deleteNodeAndChildren = (nodeId: string, nodes: Node[]): Node[] => {
      const childNodes = nodes.filter((node) => node.parentId === nodeId)
      let updatedNodes = nodes.filter((node) => node.id !== nodeId)

      childNodes.forEach((child) => {
        updatedNodes = deleteNodeAndChildren(child.id, updatedNodes)
      })

      return updatedNodes
    }

    const updatedNodes = deleteNodeAndChildren(id, nodes)
    setNodes(updatedNodes)
  }

  const onUpdate = (id: string, name: string) => {
    setNodes((nds) =>
      nds.map((node) => (node.id === id ? { ...node, data: name } : node))
    )
  }

  const onHide = (id: string) => {
    const hideNodeAndChildren = (nodeId: string, nodes: Node[]): Node[] => {
      const childNodes = nodes.filter((node) => node.parentId === nodeId)
      let updatedNodes = nodes.map((node) =>
        node.id === nodeId ? { ...node, hidden: true } : node
      )

      childNodes.forEach((child) => {
        updatedNodes = hideNodeAndChildren(child.id, updatedNodes)
      })

      return updatedNodes
    }

    const updatedNodes = hideNodeAndChildren(id, nodes)
    setNodes(updatedNodes)
  }

  const onPositionChange = (id: string, newPosition: THREE.Vector3) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? { ...node, position: [newPosition.x, newPosition.y, newPosition.z] }
          : node
      )
    )
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Button
        onClick={() => addNode("1")}
        style={{ position: "absolute", zIndex: 2, left: 10 }}
      >
        Agregar Nodo Hijo
      </Button>

      <Button
        onClick={() => addNode()}
        style={{ position: "absolute", right: 20, zIndex: 2 }}
      >
        Agregar Nodo Padre
      </Button>

      <Canvas
        style={{ width: "100vw", height: "100vh" }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 20], fov: 50 }}
      >
        <Suspense fallback={null}>
          <Preload all />
          <ambientLight intensity={0.4} />
          <directionalLight color="yellow" position={[0, 0, 5]} />

          <CameraControls makeDefault />

          {nodes.map(
            (node) =>
              !node.hidden && (
                <CustomNode
                  key={node.id}
                  data={node.data}
                  position={node.position}
                  onDelete={() => onDelete(node.id)}
                  onUpdate={(name) => onUpdate(node.id, name)}
                  onPositionChange={(newPosition) =>
                    onPositionChange(node.id, newPosition)
                  }
                  onHide={() => onHide(node.id)}
                />
              )
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}
