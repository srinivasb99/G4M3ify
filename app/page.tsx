import { GameLibrary } from "@/components/game-library"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <GameLibrary />
      </main>
      <Footer />
    </div>
  )
}

