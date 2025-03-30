"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Maximize2 } from "lucide-react"
import Link from "next/link"

// Game data structure
interface Game {
  id: string
  title: string
  thumbnail: string
  url: string
  category: string
}

// Sample game data
const gamesData: Game[] = [
  {
    id: "1",
    title: "1v1.LOL",
    thumbnail: "/placeholder.svg?height=200&width=350",
    url: "https://1v1.lol/",
    category: "action",
  },
  {
    id: "2",
    title: "2048",
    thumbnail: "/placeholder.svg?height=200&width=350",
    url: "https://play2048.co/",
    category: "puzzle",
  },
  {
    id: "3",
    title: "Slope",
    thumbnail: "/placeholder.svg?height=200&width=350",
    url: "https://slope-game.com/",
    category: "arcade",
  },
  {
    id: "4",
    title: "Tetris",
    thumbnail: "/placeholder.svg?height=200&width=350",
    url: "https://tetris.com/play-tetris",
    category: "puzzle",
  },
  {
    id: "5",
    title: "Wordle",
    thumbnail: "/placeholder.svg?height=200&width=350",
    url: "https://www.nytimes.com/games/wordle/index.html",
    category: "word",
  },
  {
    id: "6",
    title: "Chess",
    thumbnail: "/placeholder.svg?height=200&width=350",
    url: "https://www.chess.com/play/online",
    category: "board",
  },
  {
    id: "7",
    title: "Sudoku",
    thumbnail: "/placeholder.svg?height=200&width=350",
    url: "https://sudoku.com/",
    category: "puzzle",
  },
  {
    id: "8",
    title: "Crossword",
    thumbnail: "/placeholder.svg?height=200&width=350",
    url: "https://www.nytimes.com/crosswords",
    category: "word",
  },
]

export default function GamePage() {
  const { id } = useParams()
  const [game, setGame] = useState<Game | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const foundGame = gamesData.find((g) => g.id === id)
    if (foundGame) {
      setGame(foundGame)
    }
  }, [id])

  const toggleFullscreen = () => {
    const iframe = document.getElementById("game-iframe") as HTMLIFrameElement
    if (!isFullscreen) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }

  if (!game) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Game not found</h1>
            <Link href="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Games
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Games
            </Link>
            <h1 className="text-2xl font-bold">{game.title}</h1>
          </div>
          <Button variant="outline" size="sm" onClick={toggleFullscreen}>
            <Maximize2 className="mr-2 h-4 w-4" />
            Fullscreen
          </Button>
        </div>
        <div className="relative w-full rounded-lg overflow-hidden border aspect-[16/9] bg-muted">
          <iframe
            id="game-iframe"
            src={game.url}
            title={game.title}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </main>
      <Footer />
    </div>
  )
}

