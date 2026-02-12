"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

interface LiquidBlobProps {
    mouseX: number
    mouseY: number
}

function LiquidBlob({ mouseX, mouseY }: LiquidBlobProps) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (!meshRef.current) return

        // Breathing animation
        const breathe = Math.sin(state.clock.elapsedTime * 0.5) * 0.05 + 1

        // Mouse tracking with magnetic "spiking" effect
        const targetX = (mouseX - 0.5) * 2
        const targetY = -(mouseY - 0.5) * 2

        meshRef.current.rotation.x += (targetY * 0.3 - meshRef.current.rotation.x) * 0.05
        meshRef.current.rotation.y += (targetX * 0.3 - meshRef.current.rotation.y) * 0.05
        meshRef.current.scale.setScalar(breathe)
    })

    return (
        <mesh ref={meshRef}>
            <icosahedronGeometry args={[2.5, 64]} />
            <MeshDistortMaterial
                color="#52525b"
                attach="material"
                distort={0.6}
                speed={2}
                roughness={0.2}
                metalness={0.9}
            />
        </mesh>
    )
}

interface FerrofluidCanvasProps {
    mouseX: number
    mouseY: number
}

export function FerrofluidCanvas({ mouseX, mouseY }: FerrofluidCanvasProps) {
    return (
        <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }}
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#e4e4e7" />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#fb923c" />
            <LiquidBlob mouseX={mouseX} mouseY={mouseY} />
        </Canvas>
    )
}
