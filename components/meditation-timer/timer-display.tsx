"use client"

interface TimerDisplayProps {
  timeLeft: number
  isRunning: boolean
}

// Format seconds into MM:SS format
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export function TimerDisplay({ timeLeft, isRunning }: TimerDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Time display */}
      <div className="text-5xl md:text-6xl font-light text-neutral-900 dark:text-neutral-100 tabular-nums tracking-tight mb-2">
        {formatTime(timeLeft)}
      </div>

      {/* Status */}
      <div className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 mt-2">
        {isRunning ? "Tap to pause" : "Tap to start"}
      </div>
    </div>
  )
}
