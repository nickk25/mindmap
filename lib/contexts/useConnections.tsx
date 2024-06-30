import React, { createContext, ReactNode, useContext, useState } from "react" // Añadir ReactNode

interface Connection {
  from: string
  to: string
}

const ConnectionsContext = createContext<{
  connections: Connection[]
  addConnection: (from: string, to: string) => void
  removeConnectionsByNode: (nodeId: string) => void
}>({
  connections: [],
  addConnection: () => {},
  removeConnectionsByNode: () => {},
})

export const ConnectionsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [connections, setConnections] = useState<Connection[]>([])

  const addConnection = (from: string, to: string) => {
    setConnections([...connections, { from, to }])
  }

  const removeConnectionsByNode = (nodeId: string) => {
    setConnections(
      connections.filter((conn) => conn.from !== nodeId && conn.to !== nodeId)
    )
  }

  return (
    <ConnectionsContext.Provider
      value={{ connections, addConnection, removeConnectionsByNode }}
    >
      {children}
    </ConnectionsContext.Provider>
  )
}

export const useConnections = () => useContext(ConnectionsContext)
