"use client";

import { useSelectionStore } from "@/lib/store/selectionStore";
import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

export default function TelepathicIndicator({ objects }: { objects: any[] }) {
    const { selectedIds, intent } = useSelectionStore();
    const ghostRef = useRef<THREE.Mesh>(null);

    // Find the selected object data
    const selectedObject = objects.find(obj => selectedIds.includes(obj.id));

    useFrame((state) => {
        if (ghostRef.current && selectedObject) {
            // "Telepathic" Logic: Predict the next position
            // For V1, simple "Array" prediction: +2 units on X axis
            const time = state.clock.getElapsedTime();
            const pulse = (Math.sin(time * 3) + 1) / 2; // 0 to 1

            ghostRef.current.position.set(
                selectedObject.position[0] + 2.5,
                selectedObject.position[1],
                selectedObject.position[2]
            );

            // Pulse opacity to suggest "Ghost" nature
            if (Array.isArray(ghostRef.current.material)) {
                // handle array material
            } else {
                (ghostRef.current.material as THREE.MeshBasicMaterial).opacity = 0.2 + (pulse * 0.2);
            }
        }
    });

    if (!selectedObject) return null;

    return (
        <group>
            {/* Selection Highlight is handled by SmartObject itself usually, but we can add a bracket here */}

            {/* Predictive Ghost (The "Telepathic" suggestion) */}
            <mesh ref={ghostRef}>
                {selectedObject.type === 'box' ? <boxGeometry args={[1, 1, 1]} /> : <sphereGeometry args={[0.6]} />}
                <meshBasicMaterial color="#ffffff" transparent opacity={0.3} wireframe />
            </mesh>

            {/* Intent Label */}
            {intent !== 'NONE' && (
                // In a real app, use <Html> to show "CLONE [Space]"
                null
            )}
        </group>
    );
}
