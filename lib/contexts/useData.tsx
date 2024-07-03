import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { nanoid } from "nanoid"

export interface Node {
  id: string
  name: string
  position: [number, number, number]
  rotation: [number, number, number]
  visible: boolean
  scale?: number
  children?: Node[]
  parentId?: string
}

const initialData: Node[] = [
  {
    id: nanoid(),
    name: "Curly",
    position: [1, -11, -20],
    rotation: [2, 0, -0],
    visible: true,
  },
  {
    id: nanoid(),
    name: "DNA",
    position: [20, 0, -17],
    rotation: [1, 1, -2],
    visible: true,
  },
  {
    id: nanoid(),
    name: "Headphones",
    position: [20, 2, 4],
    rotation: [1, 0, -1],
    visible: true,
  },
  {
    id: nanoid(),
    name: "Notebook",
    position: [-21, -15, -13],
    rotation: [2, 0, 1],
    visible: true,
  },
  {
    id: nanoid(),
    name: "Rocket003",
    position: [18, 15, -25],
    rotation: [1, 1, 0],
    visible: false,
  },
  {
    id: nanoid(),
    name: "Roundcube001",
    position: [-25, -4, 5],
    rotation: [1, 0, 0],
    visible: true,
  },
  {
    id: nanoid(),
    name: "Table",
    position: [1, -4, -28],
    rotation: [1, 0, -1],
    visible: true,
  },
  {
    id: nanoid(),
    name: "VR_Headset",
    position: [7, -15, 28],
    rotation: [1, 0, -1],
    visible: false,
  },
  {
    id: nanoid(),
    name: "Zeppelin",
    position: [-20, 10, 10],
    rotation: [3, -1, 3],
    scale: 1.5,
    visible: true,
  },
]

const DataContext = createContext<{
  data: Node[]
  selectedNodeId: string | null
  setData: React.Dispatch<React.SetStateAction<Node[]>>
  selectNode: (id: string | null) => void
  handleHide: (id: string) => void
  handleDelete: (id: string) => void
  handleCreate: (name: string) => void
  handleUpdate: (id: string, data: Partial<Node>) => void
  handleCreateChild: (id: string, name: string) => void
  handleUpdateChild: (parentId: string, id: string, data: Partial<Node>) => void
  handleDeleteChild: (parentId: string, id: string) => void
  handleHideChild: (parentId: string, id: string) => void
}>({
  data: [],
  selectedNodeId: null,
  setData: () => {},
  selectNode: () => {},
  handleHide: () => {},
  handleDelete: () => {},
  handleCreate: () => {},
  handleUpdate: () => {},
  handleCreateChild: () => {},
  handleUpdateChild: () => {},
  handleDeleteChild: () => {},
  handleHideChild: () => {},
})

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Data
  const [data, setData] = useState<Node[]>([])

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "secondbrain-data" && event.newValue) {
        setData(JSON.parse(event.newValue))
      }
    }

    // Add event listener to handle storage changes
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Retrieve data from localStorage
      const savedData = window.localStorage.getItem("secondbrain-data")
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        if (parsedData && parsedData.length > 0) {
          setData(parsedData)
          console.log("parsedData", parsedData)
        }
      } else {
        console.log("No data found in localStorage, using initialData")
        setData(initialData)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Save data to localStorage when it changes
      window.localStorage.setItem("secondbrain-data", JSON.stringify(data))
    }
  }, [data])

  // Selector
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)

  const selectNode = (id: string | null) => {
    setSelectedNodeId(id)
  }

  // Handlers
  const handleHide = (id: string) => {
    setData((prev) =>
      prev.map((node) =>
        node.id === id ? { ...node, visible: !node.visible } : node
      )
    )
  }

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((node) => node.id !== id))
  }

  const handleCreate = (name: string) => {
    setData((prev) => [
      ...prev,
      {
        id: nanoid(),
        name,
        position: [
          Math.random() * 6 - 3,
          Math.random() * 6 - 3,
          Math.random() * 6 - 3,
        ],
        rotation: [
          Math.random() * 360,
          Math.random() * 360,
          Math.random() * 360,
        ],
        visible: true,
      },
    ])
  }

  const handleUpdate = (id: string, data: Partial<Node>) => {
    setData((prev) =>
      prev.map((node) => (node.id === id ? { ...node, ...data } : node))
    )
  }

  // Children handlers
  const handleCreateChild = (parentId: string, name: string) => {
    setData((prev) => {
      // Map through the existing nodes to find the parent node
      const newData: Node[] = prev.map((node: Node) => {
        if (node.id === parentId) {
          // Create a new child node with a unique id and random position close to parent
          const newNode: Node = {
            id: nanoid(),
            name,
            position: [
              node.position[0] + Math.random() * 4 - 2,
              node.position[1] + Math.random() * 4 - 2,
              node.position[2] + Math.random() * 4 - 2,
            ],
            rotation: node.rotation,
            visible: true,
          }
          // Add the new child node to the parent node's children array
          return {
            ...node,
            children: [...(node.children || []), newNode],
          }
        }
        // If the current node is not the parent, return it as is
        return node
      })
      // Return the updated state with the new child node
      return newData
    })
  }

  const handleUpdateChild = (
    parentId: string,
    id: string,
    data: Partial<Node>
  ) => {
    setData((prev) => {
      return prev.map((node) => {
        // Check if the current node is the parent node and has children
        if (node.id === parentId && node.children) {
          // Update the specific child node
          const updatedChildren = node.children.map((child) =>
            child.id === id ? { ...child, ...data } : child
          )
          // Return the parent node with updated children
          return { ...node, children: updatedChildren }
        }
        // Return the node as is if it's not the parent node
        return node
      })
    })
  }

  const handleDeleteChild = (parentId: string, id: string) => {
    setData((prev) => {
      return prev.map((node) => {
        // Check if the current node is the parent node and has children
        if (node.id === parentId && node.children) {
          // Filter out the child node to be deleted
          const updatedChildren = node.children.filter(
            (child) => child.id !== id
          )
          // Return the parent node with updated children
          return { ...node, children: updatedChildren }
        }
        // Return the node as is if it's not the parent node
        return node
      })
    })
  }

  const handleHideChild = (parentId: string, id: string) => {
    setData((prev) => {
      return prev.map((node) => {
        // Check if the current node is the parent node and has children
        if (node.id === parentId && node.children) {
          // Toggle the visibility of the specific child node
          const updatedChildren = node.children.map((child) =>
            child.id === id ? { ...child, visible: !child.visible } : child
          )
          // Return the parent node with updated children
          return { ...node, children: updatedChildren }
        }
        // Return the node as is if it's not the parent node
        return node
      })
    })
  }

  return (
    <DataContext.Provider
      value={{
        data,
        selectedNodeId,
        setData,
        selectNode,
        handleHide,
        handleDelete,
        handleCreate,
        handleUpdate,
        handleCreateChild,
        handleUpdateChild,
        handleDeleteChild,
        handleHideChild,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)
