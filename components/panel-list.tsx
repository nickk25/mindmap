"use client"

import { useState } from "react"
import { UserButton } from "@clerk/nextjs"
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  IconButton,
  ScrollArea,
  Text,
  TextField,
  Theme,
} from "@radix-ui/themes"
import { Check, Eye, EyeOff, PenLine, Trash } from "lucide-react"

import { useData } from "@/lib/contexts/useData"

export const PanelList = () => {
  const {
    data,
    handleHide,
    handleDelete,
    handleCreate,
    handleUpdate,
    selectNode,
  } = useData()
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [newNodeName, setNewNodeName] = useState("")

  return (
    <Theme radius="large" className="z-50">
      <Box
        position="absolute"
        top={{ sm: "3" }}
        right={{ initial: "1", sm: "6" }}
        bottom={{ initial: "1", sm: "none" }}
        left={{ initial: "0", sm: "none" }}
      >
        <Card className="h-[30vh] md:h-full md:min-w-60 lg:min-w-80">
          <Flex align="center" justify="between" mb="3">
            <Heading size="4" weight="bold">
              Mindmaps
            </Heading>
            <UserButton />
          </Flex>
          <ScrollArea scrollbars="vertical">
            {data &&
              data?.map((node) => (
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
                          handleUpdate(node.id, { name: newNodeName })
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
                          handleUpdate(node.id, { name: newNodeName })
                        }
                        setIsEditing(null)
                        setNewNodeName("")
                      }}
                    ></TextField.Root>
                  ) : (
                    <Text
                      onClick={() => {
                        selectNode(node.id)
                      }}
                      onDoubleClick={() => setIsEditing(node.id)}
                      className="line-clamp-1 !cursor-pointer !text-ellipsis"
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
                      onClick={() => handleHide(node.id)}
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
                      onClick={() => handleDelete(node.id)}
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
                        handleCreate(newNodeName),
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
              variant="ghost"
              className="mb-8 mt-4 w-full md:mb-0"
              onClick={() => (setIsCreating(!isCreating), setNewNodeName(""))}
            >
              {!isCreating ? "Add New" : "Cancel"}
            </Button>
          </ScrollArea>
        </Card>
      </Box>
    </Theme>
  )
}
