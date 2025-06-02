"use client"

import { RotateCcw } from "lucide-react"

interface RestartButtonProps {
  onRestart: (e: React.MouseEvent) => void
}

export function RestartButton({ onRestart }: RestartButtonProps) {
  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation()
    onRestart(e)
  }

  return (
    <button
      onClick={handleRestart}
      className="p-3 rounded-full cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 group"
      aria-label="Restart timer"
      title="Restart timer"
    >
      <RotateCcw className="w-5 h-5 text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-400 dark:group-hover:text-neutral-400" />
    </button>
  )
}
