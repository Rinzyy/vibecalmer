import { useState, useEffect, useCallback } from "react"

interface UseTimerProps {
  initialTime: number
  onComplete?: () => void
  onStart?: () => void
}

export function useTimer({ initialTime, onComplete, onStart }: UseTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)
  const totalTime = initialTime

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && timeLeft > 0) {
      // Call onStart if timer just started
      if (timeLeft === initialTime && onStart) {
        onStart()
      }
      
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsRunning(false)
            if (onComplete) {
              onComplete()
            }
            return 0
          }
          return time - 1
        })
      }, 1000)
    } else {
      if (interval) clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft, initialTime, onComplete, onStart])

  const startTimer = useCallback(() => {
    setIsRunning(true)
  }, [])

  const pauseTimer = useCallback(() => {
    setIsRunning(false)
  }, [])

  const resetTimer = useCallback(() => {
    setTimeLeft(initialTime)
    setIsRunning(false)
  }, [initialTime])

  const toggleTimer = useCallback(() => {
    if (timeLeft === 0) {
      resetTimer()
    } else {
      setIsRunning(!isRunning)
    }
  }, [timeLeft, isRunning, resetTimer])

  const progress = ((totalTime - timeLeft) / totalTime) * 100

  return {
    timeLeft,
    isRunning,
    progress,
    startTimer,
    pauseTimer,
    resetTimer,
    toggleTimer,
    totalTime
  }
}
