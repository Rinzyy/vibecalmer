"use client"

import { useTimer } from "../hooks/useTimer"
import { useAudio } from "../hooks/useAudio"
import { ProgressRing } from "./meditation-timer/progress-ring"
import { TimerDisplay } from "./meditation-timer/timer-display"
import { AudioControls } from "./meditation-timer/audio-controls"
import { RestartButton } from "./meditation-timer/restart-button"
import { Instructions } from "./meditation-timer/instructions"
import { ThemeToggle } from "./theme-toggle"

const DEFAULT_MEDITATION_TIME = 10 // 10 minutes in seconds

export default function MeditationTimer() {
  const { 
    timeLeft, 
    isRunning, 
    progress, 
    toggleTimer, 
    resetTimer 
  } = useTimer({
    initialTime: DEFAULT_MEDITATION_TIME,
    onStart: () => playBellSound(),
    onComplete: () => playBellSound()
  })

  const { 
    audioMode, 
    setAudio, 
    playBellSound 
  } = useAudio({ 
    isRunning,
    timeLeft
  })

  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation()
    resetTimer()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 flex flex-col items-center justify-center select-none px-4 py-8 relative">
      {/* Theme toggle - positioned in the top right corner */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="relative">
        <ProgressRing progress={progress} onClick={toggleTimer}>
          <TimerDisplay timeLeft={timeLeft} isRunning={isRunning} />
        </ProgressRing>

        {/* Audio controls - positioned absolutely on larger screens, below timer on mobile */}
        <div className="absolute right-0 md:right-[-80px] top-1/2 -translate-y-1/2 hidden md:block">
          <AudioControls 
            audioMode={audioMode} 
            isRunning={isRunning} 
            onAudioChange={setAudio} 
          />
        </div>

        {/* Restart button - positioned absolutely on larger screens, below timer on mobile */}
        <div className="absolute left-0 md:left-[-80px] top-1/2 -translate-y-1/2 hidden md:block">
          <RestartButton onRestart={handleRestart} />
        </div>
      </div>

      {/* Mobile controls */}
      <div className="flex justify-between w-full max-w-xs mt-8 md:hidden">
        <RestartButton onRestart={handleRestart} />
        <AudioControls 
          audioMode={audioMode} 
          isRunning={isRunning} 
          onAudioChange={setAudio} 
        />
      </div>

      {/* Instructions */}
      <div className="absolute bottom-12">
        <Instructions timeLeft={timeLeft} isRunning={isRunning} />
      </div>

      {/* Hidden audio elements */}
      <div className="sr-only" aria-hidden="true">
        {/* Audio elements will be created programmatically */}
      </div>
    </div>
  )
}
