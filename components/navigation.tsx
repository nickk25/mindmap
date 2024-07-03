"use client"

import { useRouter } from "next/navigation"
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/nextjs"
import { Button, Dialog, Flex } from "@radix-ui/themes"

export function Navigation() {
  const router = useRouter()

  const handleClick = () => {
    router.push("/network")
  }

  return (
    <>
      <SignedOut>
        <Dialog.Root>
          <Dialog.Trigger>
            <Button variant="solid">Sign in</Button>
          </Dialog.Trigger>
          <Dialog.Content className="flex w-fit items-center justify-center bg-transparent !p-0">
            <SignIn />
          </Dialog.Content>
        </Dialog.Root>
      </SignedOut>

      <SignedIn>
        <Flex align="center" gap="3">
          <Button variant="solid" onClick={handleClick}>
            GO TO APP
          </Button>

          <UserButton />
        </Flex>
      </SignedIn>
    </>
  )
}
