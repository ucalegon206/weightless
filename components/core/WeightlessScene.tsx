"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Stars, Html } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import AntigravityCamera from "@/components/controls/AntigravityCamera";
import SmartObject from "@/components/core/SmartObject";
import DebugHUD from "@/components/ui/DebugHUD";
import TelepathicIndicator from "@/components/interaction/TelepathicIndicator";

interface WeightlessSceneProps {
    objects?: any[];
    stressReport?: Record<string, number>;
}

export default function WeightlessScene({ objects = [], stressReport = {} }: WeightlessSceneProps) {
    return (
        <Canvas
            shadows
            camera={{ position: [8, 5, 8], fov: 50 }}
        >
            <color attach="background" args={["#000000"]} />

            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

            {/* Environment */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <gridHelper args={[100, 100, 0x444444, 0x111111]} />

            {/* Debug Interface */}
            <DebugHUD />

            {/* Physics World */}
            <Physics gravity={[0, 0, 0]}> {/* Antigravity: Zero Gravity by default */}
                <AntigravityCamera />

                {/* Telepathic Intent Layer */}
                <TelepathicIndicator objects={objects} />

                {/* Interactive Objects */}
                {objects.map((obj) => (
                    <SmartObject
                        key={obj.id}
                        id={obj.id}
                        position={obj.position}
                        type={obj.type}
                        color={obj.color}
                        material={obj.material} // Pass material name
                        url={obj.url} // Pass asset URL
                        stress={stressReport[obj.id] || 0}
                    />
                ))}

                {/* Floor to catch tossed objects if gravity is enabled later */}
                {/* <CuboidCollider position={[0, -2, 0]} args={[50, 1, 50]} /> */}
            </Physics>
        </Canvas>
    );
}
