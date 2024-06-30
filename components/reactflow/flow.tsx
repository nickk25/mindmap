"use client"

import React, { useRef, useState } from "react"
import { Button } from "@radix-ui/themes"
import {
  DragControls,
  Line,
  OrbitControls,
  OrbitControlsProps,
} from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useDrag } from "@use-gesture/react"

import { CustomNode } from "@/components/reactflow/custom-node"

type Node = {
  id: string
  data: string
  position: [number, number, number]
}

type Edge = {
  source: string
  target: string
}

const initNodes: Node[] = [
  {
    id: "1",
    data: "Jane Doe",
    position: [0, 0, 0],
  },
  {
    id: "2",
    data: "Tyler Weary",
    position: [-5, -5, -0],
  },
  {
    id: "3",
    data: "Kristi Price",
    position: [5, -5, -0],
  },
]

const initEdges: Edge[] = [
  { source: "1", target: "2" },
  { source: "1", target: "3" },
]

export const Flow = () => {
  const [nodes, setNodes] = useState(initNodes)
  const [edges, setEdges] = useState(initEdges)
  const [nodeId, setNodeId] = useState(4)
  const [enableOrbitControls, setEnableOrbitControls] = useState(true)

  const addNode = () => {
    const newNode: Node = {
      id: nodeId.toString(),
      data: "Nuevo Nodo",
      position: [
        Math.random() * 10 - 5,
        Math.random() * 10 - 5,
        Math.random() * 10 - 5,
      ],
    }
    setNodes((nds) => [...nds, newNode])
    setEdges((eds) => [...eds, { source: "1", target: newNode.id }])
    setNodeId((id) => id + 1)
  }

  const onDelete = (id: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== id))
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== id && edge.target !== id)
    )
  }

  const onUpdate = (id: string, name: string) => {
    setNodes((nds) =>
      nds.map((node) => (node.id === id ? { ...node, data: name } : node))
    )
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Button onClick={addNode} style={{ position: "absolute", zIndex: 2 }}>
        Agregar Nodo
      </Button>
      <Canvas style={{ width: "100vw", height: "100vh" }}>
        <ambientLight intensity={0.2} />
        <directionalLight color="gray" position={[0, 0, 5]} />
        <OrbitControls enabled={enableOrbitControls} />

        {nodes.map((node) => (
          <CustomNode
            setEnableOrbitControls={setEnableOrbitControls}
            key={node.id}
            data={node.data}
            position={node.position}
            onDelete={() => onDelete(node.id)}
            onUpdate={(name) => onUpdate(node.id, name)}
          />
        ))}

        {edges.map((edge, index) => {
          const sourceNode = nodes.find((node) => node.id === edge.source)
          const targetNode = nodes.find((node) => node.id === edge.target)
          if (!sourceNode || !targetNode) return null

          return (
            <Line
              key={index}
              points={[sourceNode.position, targetNode.position]}
              color="white"
              lineWidth={1}
            />
          )
        })}
      </Canvas>
    </div>
  )
}
