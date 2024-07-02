import { LandingPage } from "@/components/landing-page"

export default function Home() {
  return (
    <main
      id="root"
      className="flex h-screen min-h-screen w-screen flex-col items-center justify-between"
    >
      <LandingPage />
    </main>
  )
}
