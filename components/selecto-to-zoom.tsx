"use client"

import { useEffect, useRef } from "react"
import { Preload, useBounds } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"

import { useData } from "@/lib/contexts/useData"

export function SelectToZoom({ children }: { children: React.ReactNode }) {
  const api = useBounds()
  const { selectNode, selectedNodeId } = useData()
  const state = useThree((state) => state.scene.children)
  const ref = useRef<any | null>(null)

  useEffect(() => {
    const node = state
      .find((node) => node.name === "")
      ?.children[0]?.children?.find((node) => {
        if (node?.children[0]?.name === selectedNodeId) {
          return node?.children[0]
        }
      })

    if (node) {
      api.refresh(node).fit()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNodeId])

  useFrame(() => {
    if (ref.current && !selectedNodeId) {
      ref.current.rotation.z += 0.005
    }
  })

  return (
    <group
      ref={ref}
      name="select-to-zoom"
      onClick={(e) => (
        selectNode(e.object.name),
        e.stopPropagation(),
        e.delta <= 2 && api.refresh(e.object).fit()
      )}
      onPointerMissed={(e) => (
        selectNode(null), e.button === 0 && api.refresh().fit()
      )}
    >
      {children}
      <Preload all />
    </group>
  )
}
