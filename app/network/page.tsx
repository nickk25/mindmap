import { PanelChildren } from "@/components/panel-children"
import { PanelList } from "@/components/panel-list"
import { Flow } from "@/components/reactflow/flow"

export default function Network() {
  return (
    <main
      id="network"
      className="relative flex h-screen min-h-screen w-screen flex-col items-center justify-between"
    >
      <PanelList />
      <PanelChildren />
      <Flow />
    </main>
  )
}
