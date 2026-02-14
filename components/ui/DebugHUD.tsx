"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useState, useRef } from "react";
import { Html } from "@react-three/drei";

export default function DebugHUD() {
    const { camera, scene } = useThree();
    const [stats, setStats] = useState({ camX: 0, camY: 0, camZ: 0, objects: 0 });
    const frameCount = useRef(0);

    useFrame(() => {
        frameCount.current++;
        // Update stats every 10 frames to save performance
        if (frameCount.current % 10 === 0) {
            setStats({
                camX: camera.position.x,
                camY: camera.position.y,
                camZ: camera.position.z,
                objects: scene.children.length
            });
        }
    });

    return (
        <Html fullscreen style={{ pointerEvents: 'none' }}>
            <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(0,0,0,0.8)',
                color: '#00ff00',
                fontFamily: 'monospace',
                padding: '10px',
                borderRadius: '5px',
                zIndex: 999
            }}>
                <h3 className="font-bold border-b border-green-500 mb-2">ENGINE STATS</h3>
                <div>CAM_X: {stats.camX.toFixed(2)}</div>
                <div>CAM_Y: {stats.camY.toFixed(2)}</div>
                <div>CAM_Z: {stats.camZ.toFixed(2)}</div>
                <div className="mt-2">SCENE_OBJECTS: {stats.objects}</div>
                <div>STATUS: RUNNING</div>
            </div>
        </Html>
    );
}
