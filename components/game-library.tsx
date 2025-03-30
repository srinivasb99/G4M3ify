"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { GameCard } from "@/components/game-card"
import { Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Game data structure
interface Game {
  id: string
  title: string
  thumbnail: string
  url: string
  category: string
  embedAllowed: boolean
}

// Updated game data with games that typically allow embedding
const gamesData: Game[] = [
  {
    id: "1",
    title: "1v1.LOL",
    thumbnail: "/placeholder.svg?height=200&width=350",
    url: "https://1v1.lol/",
    category: "action",
    embedAllowed: true,
  },
  {
    id: "2",
    title: "2048",
    thumbnail: "/placeholder.svg?height=200&width=350",
    url: "https://play2048.co/",
    category: "puzzle",
    embedAllowed: true,
  },
  {
    id: "3",
    title: "Slope",
    thumbnail: "/placeholder.svg?height=200&width=350",
    url: "https://slope-game.com/",
    category: "arcade",
    embedAllowed: true,
  },
  {
    id: "4",
    title: "Cookie Clicker",
    thumbnail: "/placeholder.svg?height=200&width=350",
    url: "https://orteil.dashnet.org/cookieclicker/",
    category: "idle",
    embedAllowed: true,
  },
  {
    id: "5",
    title: "Flappy Bird",
    thumbnail: "/placeholder.svg?height=200&width=350",
    url: "https://flappybird.io/",
    category: "arcade",
    embedAllowed: true,
  },
  {
    id: "6",
    title: "Retro Bowl",
    thumbnail: "/placeholder.svg?height=200&width=350",
    url: "https://retro-bowl.com/",
    category: "sports",
    embedAllowed: true,
  },
  {
    id: "7",
    title: "Shell Shockers",
    thumbnail: "/placeholder.svg?height=200&width=350",
    url: "https://shellshock.io/",
    category: "shooter",
    embedAllowed: true,
  },
  {
    id: "8",
    title: "Krunker.io",
    thumbnail: "/placeholder.svg?height=200&width=350",
    url: "https://krunker.io/",
    category: "shooter",
    embedAllowed: true,
  },
  {
    id: "9",
    title: "Subway Surfers",
    thumbnail: "/placeholder.svg?height=200&width=350",
    url: "https://poki.com/en/g/subway-surfers",
    category: "runner",
    embedAllowed: true,
  },
  {
    id: "10",
    title: "Paper.io",
    thumbnail: "/placeholder.svg?height=200&width=350",
    url: "https://paper-io.com/",
    category: "io",
    embedAllowed: true,
  },
  {
    id: "11",
    title: "Agar.io",
    thumbnail: "/placeholder.svg?height=200&width=350",
    url: "https://agar.io/",
    category: "io",
    embedAllowed: true,
  },
  {
    id: "12",
    title: "Wordle (Clone)",
    thumbnail: "/placeholder.svg?height=200&width=350",
    url: "https://wordlegame.org/",
    category: "word",
    embedAllowed: true,
  },
]

// Get unique categories from games
const categories = ["all", ...Array.from(new Set(gamesData.map((game) => game.category)))]

export function GameLibrary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [filteredGames, setFilteredGames] = useState<Game[]>(gamesData)

  useEffect(() => {
    // Filter games based on search term and active category
    const filtered = gamesData.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = activeCategory === "all" || game.category === activeCategory
      return matchesSearch && matchesCategory
    })
    setFilteredGames(filtered)
  }, [searchTerm, activeCategory])

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Game Library</h1>
        <p className="text-muted-foreground">Discover and play a curated collection of web games</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search games..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="mb-4 flex flex-wrap h-auto">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={activeCategory} className="mt-0">
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No games found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-8">
        <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-2">About Embedded Games</h3>
        <p className="text-sm text-amber-700 dark:text-amber-400">
          Some websites (like the New York Times) prevent their content from being embedded in iframes as a security
          measure. The games listed here have been selected because they typically allow embedding, but availability may
          change.
        </p>
      </div>
    </div>
  )
}

