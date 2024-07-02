import { ReactNode } from "react"
import { Theme } from "@radix-ui/themes"

export function RadixProvider({ children }: { children: ReactNode }) {
  return (
    <Theme
      accentColor="purple"
      panelBackground="solid"
      appearance="dark"
      radius="large"
      scaling="90%"
    >
      {children}
    </Theme>
  )
}