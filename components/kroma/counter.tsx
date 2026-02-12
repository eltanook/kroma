"use client"

import { useEffect, useRef, useState } from "react"

interface CounterProps {
    end: number
    duration?: number
    suffix?: string
    className?: string
}

export function Counter({ end, duration = 3500, suffix = "", className = "" }: CounterProps) {
    const [count, setCount] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const counterRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 }
        )

        if (counterRef.current) {
            observer.observe(counterRef.current)
        }

        return () => observer.disconnect()
    }, [isVisible])

    useEffect(() => {
        if (!isVisible) return

        const startTime = Date.now()
        const endTime = startTime + duration

        const updateCounter = () => {
            const now = Date.now()
            const progress = Math.min((now - startTime) / duration, 1)
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)

            setCount(Math.floor(easeOutQuart * end))

            if (now < endTime) {
                requestAnimationFrame(updateCounter)
            } else {
                setCount(end)
            }
        }

        requestAnimationFrame(updateCounter)
    }, [isVisible, end, duration])

    return (
        <span ref={counterRef} className={className}>
            {count}{suffix}
        </span>
    )
}
