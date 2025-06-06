"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { X, Gamepad, ExternalLink, Shield } from "lucide-react"

interface Game {
  id: string
  title: string
  thumbnail: string
  url: string
  category: string
  useProxy?: boolean
}

interface GameCardProps {
  game: Game
}

export function GameCard({ game }: GameCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [loadError, setLoadError] = useState(false)

  const handleIframeError = () => {
    setLoadError(true)
  }

  const isProxied = game.url.includes("/proxy?url=")

  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <CardContent className="p-0">
          <div className="relative aspect-video">
            <Image
              src={game.thumbnail || "/placeholder.svg"}
              alt={game.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-2 right-2 flex gap-1">
              {isProxied && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  <Shield className="h-3 w-3 mr-1" /> Proxy
                </Badge>
              )}
              <Badge className="capitalize">{game.category}</Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4">
          <h3 className="font-medium truncate">{game.title}</h3>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1">
                <Gamepad className="h-4 w-4" />
                Play
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[90vw] max-h-[90vh] p-0">
              <div className="flex items-center justify-between p-4 border-b">
                <DialogTitle className="flex items-center gap-2">
                  <Gamepad className="h-5 w-5" />
                  {game.title}
                  {isProxied && (
                    <Badge variant="outline" className="ml-2">
                      <Shield className="h-3 w-3 mr-1" /> Proxied
                    </Badge>
                  )}
                </DialogTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => window.open(game.url, "_blank")}
                    title="Open in new window"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setIsOpen(false)} title="Close">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="relative w-full aspect-[16/9]">
                {loadError ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted p-4 text-center">
                    <p className="mb-4 text-lg font-medium">This game cannot be embedded</p>
                    <p className="mb-6 text-sm text-muted-foreground">
                      {isProxied
                        ? "The proxy server couldn't load this game. The site may have additional protections."
                        : "The game provider has blocked embedding in iframes for security reasons."}
                    </p>
                    <Button onClick={() => window.open(game.url, "_blank")}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open in New Tab
                    </Button>
                  </div>
                ) : (
                  <iframe
                    src={game.url}
                    title={game.title}
                    className="absolute inset-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onError={handleIframeError}
                    sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts"
                  ></iframe>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </>
  )
}

