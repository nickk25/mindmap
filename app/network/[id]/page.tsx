import { Flow } from "@/components/reactflow/flow"

export default function Network() {
  return (
    <main
      id="network"
      className="flex h-screen min-h-screen w-screen flex-col items-center justify-between"
    >
      <Flow />
    </main>
  )
}
