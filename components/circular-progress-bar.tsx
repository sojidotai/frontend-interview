import React from 'react'

interface CircularProgressBarProps {
  progress: number
  size?: number
  strokeWidth?: number
  circleColor?: string
  progressColor?: string
  textColor?: string
}

export const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  progress,
  size = 120,
  strokeWidth = 10,
  circleColor = '#e6e6e6',
  progressColor = '#3b82f6',
  textColor = '#1f2937',
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          className="transition-all duration-300 ease-in-out"
          stroke={circleColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="transition-all duration-300 ease-in-out"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <span
        className="absolute text-xs font-semibold"
        style={{ color: textColor }}
      >
        {`${Math.round(progress)}%`}
      </span>
    </div>
  )
}
