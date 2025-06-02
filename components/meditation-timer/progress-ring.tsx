"use client"

interface ProgressRingProps {
  progress: number
  children: React.ReactNode
  onClick?: () => void
}

export function ProgressRing({ progress, children, onClick }: ProgressRingProps) {
  return (
    <div 
      className="relative cursor-pointer group transition-all duration-300 hover:scale-105" 
      onClick={onClick}
    >
      {/* Outer ring - progress indicator */}
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle cx="50" cy="50" r="45" stroke="rgb(229 229 229)" strokeWidth="0.5" fill="none" className="dark:stroke-neutral-700" />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="rgb(23 23 23)"
            strokeWidth="0.5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${progress * 2.827} 282.7`}
            className="transition-all duration-1000 ease-out dark:stroke-white"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {children}
        </div>
      </div>

      {/* Subtle hover effect */}
      <div className="absolute inset-0 rounded-full bg-neutral-900 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
    </div>
  )
}
