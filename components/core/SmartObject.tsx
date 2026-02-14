"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { Box, Sphere, Gltf } from "@react-three/drei";
import * as THREE from "three";
import SafeGltf from "@/components/core/SafeGltf";

interface SmartObjectProps {
    id?: string;
    position?: [number, number, number];
    type?: "box" | "sphere" | "asset";
    color?: string;
    material?: string;
    url?: string;
    stress?: number; // 0 to 1
}

import { useSelectionStore } from "@/lib/store/selectionStore";
import { MaterialRegistry } from "@/lib/engineering/MaterialRegistry";

export default function SmartObject({ id = "unknown", position = [0, 5, 0], type = "box", color, material = "Steel", url, stress = 0 }: SmartObjectProps) {
    const rigidBody = useRef<RapierRigidBody>(null);
    const { toggleSelection, selectedIds, setHovered } = useSelectionStore();
    const isSelected = selectedIds.includes(id);
    const meshRef = useRef<THREE.Mesh>(null);

    // Look up material properties
    const matData = MaterialRegistry[material] || MaterialRegistry["Steel"];
    // Use prop color if provided (LLM override), else material default
    const renderColor = color && color !== "#ffffff" ? color : matData.color;

    const handlePointerDown = (e: any) => {
        e.stopPropagation();
        toggleSelection(id, e.shiftKey);
        // Wake up the physics body on interaction
        rigidBody.current?.wakeUp();
        // Apply a small "nudge" if not selected, or maybe drag logic later
        if (!isSelected) {
            rigidBody.current?.applyImpulse({ x: 0, y: 1, z: 0 }, true);
        }
    };

    const handlePointerOver = (e: any) => {
        e.stopPropagation();
        setHovered(id);
        document.body.style.cursor = "grab";
    };

    const handlePointerOut = (e: any) => {
        setHovered(null);
        document.body.style.cursor = "auto";
    };

    // Visual Warning for High Stress
    useFrame((state) => {
        if (stress > 0.8 && meshRef.current) {
            const time = state.clock.getElapsedTime();
            const pulse = (Math.sin(time * 10) + 1) / 2; // Fast pulse
            if (Array.isArray(meshRef.current.material)) return;

            const mat = meshRef.current.material as THREE.MeshStandardMaterial;
            mat.emissive.setHex(0xff0000);
            mat.emissiveIntensity = pulse * 2;
        } else if (meshRef.current) {
            const mat = meshRef.current.material as THREE.MeshStandardMaterial;
            if (!isSelected) {
                mat.emissive.setHex(0x000000);
                mat.emissiveIntensity = 0;
            } else {
                mat.emissive.setHex(0x444444);
                mat.emissiveIntensity = 0.5;
            }
        }
    });

    return (
        <RigidBody
            ref={rigidBody}
            position={position}
            colliders={url ? "hull" : (type === "sphere" ? "hull" : "cuboid")}
            restitution={0.5}
            friction={0.1}
            linearDamping={0.5}
            angularDamping={0.5}
        >


            // ... inside the component return ...

            {url ? (
                <group
                    onPointerDown={handlePointerDown}
                    onPointerOver={handlePointerOver}
                    onPointerOut={handlePointerOut}
                >
                    <SafeGltf
                        url={url}
                        scale={2.0} // Boost scale for visibility
                        fallback={
                            <mesh>
                                <boxGeometry args={[1, 1, 1]} />
                                <meshStandardMaterial color="red" wireframe />
                            </mesh>
                        }
                    />
                    {/* Highlight Overlay */}
                    {isSelected && (
                        <mesh>
                            <boxGeometry args={[1.2, 1.2, 1.2]} />
                            <meshBasicMaterial color="white" wireframe />
                        </mesh>
                    )}
                </group>
            ) : (
                <mesh
                    ref={meshRef}
                    onPointerDown={handlePointerDown}
                    onPointerOver={handlePointerOver}
                    onPointerOut={handlePointerOut}
                    castShadow
                    receiveShadow
                >
                    {type === "box" ? <boxGeometry args={[1, 1, 1]} /> : <sphereGeometry args={[0.6]} />}
                    <meshPhysicalMaterial
                        color={isSelected ? "#ffffff" : renderColor}
                        roughness={matData.roughness}
                        metalness={matData.metalness}
                        transmission={matData.transmission || 0}
                        thickness={matData.transmission ? 1.5 : 0}
                        transparent={!!matData.transmission}
                        opacity={matData.transmission ? 0.8 : 1}
                    />
                </mesh>
            )}
        </RigidBody>
    );
}
