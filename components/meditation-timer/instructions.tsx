"use client"

interface InstructionsProps {
  timeLeft: number
  isRunning: boolean
}

export function Instructions({ timeLeft, isRunning }: InstructionsProps) {
  return (
    <div className="text-center">
      <p className="text-sm font-light text-neutral-400 dark:text-neutral-500 tracking-wide">
        {timeLeft === 0 ? "Tap to restart" : isRunning ? "Tap to pause" : "Tap to begin"}
      </p>
    </div>
  )
}
