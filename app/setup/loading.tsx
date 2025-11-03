"use client"

import { IconInnerShadowTop } from "@tabler/icons-react"
import {   Shield, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

const stages = [
  { icon: IconInnerShadowTop, label: "Initializing", duration: 2 },
  { icon: Shield, label: "Securing", duration: 2 },
  { icon: Sparkles, label: "Personalizing", duration: 2 },
]

export default function Loading() {
  const [currentStage, setCurrentStage] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const stageInterval = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % stages.length)
    }, 6000)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return 90
        return prev + Math.random() * 30
      })
    }, 500)

    return () => {
      clearInterval(stageInterval)
      clearInterval(progressInterval)
    }
  }, [])

  const CurrentIcon = stages[currentStage].icon

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-background via-background to-card flex items-center justify-center">
       <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

       <div className="relative z-10 flex flex-col items-center justify-center gap-8 max-w-md px-4">
         <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-border" />
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary"
            style={{
              animation: "spin 2s linear infinite",
            }}
          />
          <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-card border border-border">
            <CurrentIcon className="w-10 h-10 text-primary animate-pulse" />
          </div>
        </div>

         <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-foreground">Setting up your account</h2>
          <p className="text-sm text-muted-foreground">{stages[currentStage].label}</p>
        </div>

         <div className="flex gap-3 justify-center">
          {stages.map((_ , idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-500 ${
                idx <= currentStage ? "w-6 bg-primary" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>

         <div className="w-full space-y-2">
          <div className="h-1 w-full bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-center">{Math.round(progress)}%</p>
        </div>

        {/* Additional info */}
        <p className="text-xs text-muted-foreground text-center max-w-xs">
          This usually takes a few seconds. Hang tight!
        </p>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
