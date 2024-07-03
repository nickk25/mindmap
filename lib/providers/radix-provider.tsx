import { ReactNode } from "react"
import { Theme } from "@radix-ui/themes"

export function RadixProvider({ children }: { children: ReactNode }) {
  return (
    <Theme
      accentColor="gray"
      panelBackground="translucent"
      appearance="dark"
      radius="full"
      scaling="90%"
    >
      {children}
    </Theme>
  )
}
