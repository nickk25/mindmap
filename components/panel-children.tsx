"use client"

import { useEffect, useState } from "react"
import {
  Box,
  Button,
  Card,
  Flex,
  IconButton,
  Text,
  TextField,
  Theme,
} from "@radix-ui/themes"
import { Check, Eye, EyeOff, PenLine, Trash } from "lucide-react"

import { Node, useData } from "@/lib/contexts/useData"

export const PanelChildren = () => {
  const {
    data,
    handleHideChild,
    handleDeleteChild,
    handleCreateChild,
    handleUpdateChild,
    selectedNodeId,
  } = useData()
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [newNodeName, setNewNodeName] = useState<string>("")
  const [currentNode, setCurrentNode] = useState<Node | null>(null)

  useEffect(() => {
    if (selectedNodeId) {
      const node: Node | null =
        data.find((node) => node.id === selectedNodeId) ?? null
      setCurrentNode(node)
    } else {
      setCurrentNode(null)
    }
  }, [selectedNodeId, data])

  if (!currentNode) return null

  return (
    <Theme
      accentColor="gray"
      panelBackground="translucent"
      radius="medium"
      className="z-50"
    >
      <Box
        position="absolute"
        top={{ initial: "1", sm: "3" }}
        left={{ initial: "1", sm: "4" }}
      >
        <Card className="min-w-60 max-w-80">
          <Text size="2" weight="bold" color="gray">
            {currentNode.name}
          </Text>

          {currentNode.children &&
            currentNode.children.map((node) => (
              <div
                key={node.id}
                className="mt-2 flex w-full items-center justify-between"
              >
                {isEditing === node.id ? (
                  <TextField.Root
                    variant="surface"
                    autoFocus
                    value={newNodeName}
                    onChange={(e) => setNewNodeName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newNodeName !== "") {
                        handleUpdateChild(currentNode.id, node.id, {
                          name: newNodeName,
                        })
                        setNewNodeName("")
                        setIsEditing(null)
                      }
                      if (e.key === "Escape") {
                        setIsEditing(null)
                        setNewNodeName("")
                      }
                    }}
                    onBlur={() => {
                      if (newNodeName !== "") {
                        handleUpdateChild(currentNode.id, node.id, {
                          name: newNodeName,
                        })
                      }
                      setIsEditing(null)
                      setNewNodeName("")
                    }}
                  ></TextField.Root>
                ) : (
                  <Text
                    color="gray"
                    onDoubleClick={() => setIsEditing(node.id)}
                    className="line-clamp-1 !text-ellipsis"
                  >
                    {node.name}
                  </Text>
                )}
                <Flex gap="2" ml="2">
                  <IconButton
                    variant="ghost"
                    size="1"
                    onClick={() => setIsEditing(node.id)}
                  >
                    {isEditing === node.id ? (
                      <Check className="size-4" />
                    ) : (
                      <PenLine className="size-4" />
                    )}
                  </IconButton>
                  <IconButton
                    variant="ghost"
                    size="1"
                    onClick={() => handleHideChild(currentNode.id, node.id)}
                  >
                    {node.visible ? (
                      <Eye className="size-4" />
                    ) : (
                      <EyeOff className="size-4" />
                    )}
                  </IconButton>
                  <IconButton
                    variant="ghost"
                    size="1"
                    onClick={() => handleDeleteChild(currentNode.id, node.id)}
                  >
                    <Trash className="size-4" />
                  </IconButton>
                </Flex>
              </div>
            ))}
          {isCreating && (
            <div className="mt-2 flex w-full items-center justify-between">
              <TextField.Root
                variant="surface"
                value={newNodeName}
                onChange={(e) => setNewNodeName(e.target.value)}
                className="w-full"
              >
                <TextField.Slot side="right" pr="1">
                  <IconButton
                    variant="soft"
                    size="1"
                    className="w-10"
                    onClick={() => (
                      handleCreateChild(currentNode.id, newNodeName),
                      setNewNodeName(""),
                      setIsCreating(false)
                    )}
                  >
                    <Check className="size-4" />
                  </IconButton>
                </TextField.Slot>
              </TextField.Root>
            </div>
          )}

          <Button
            color="gray"
            variant="ghost"
            className="mt-4 w-full"
            onClick={() => (setIsCreating(!isCreating), setNewNodeName(""))}
          >
            {!isCreating ? "Add New" : "Cancel"}
          </Button>
        </Card>
      </Box>
    </Theme>
  )
}
