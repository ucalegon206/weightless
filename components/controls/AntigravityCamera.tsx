"use client";

import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { OrbitControls } from "@react-three/drei";

export default function AntigravityCamera() {
    const { camera, gl } = useThree();
    const controlsRef = useRef<any>(null);

    // Initialize camera position for the "Void" feel
    useEffect(() => {
        camera.position.set(8, 5, 8);
        camera.lookAt(0, 0, 0);
    }, [camera]);

    // Removed "breathing" animation per user feedback - moving towards professional/stable UX.
    /*
    useFrame((state, delta) => {
      // Add subtle "breathing" movement to the camera when idle
      // This enhances the "weightless" feeling
      if (controlsRef.current && !controlsRef.current.isDragging) {
         const time = state.clock.getElapsedTime();
         camera.position.y += Math.sin(time * 0.5) * 0.002;
      }
    });
    */

    return (
        <OrbitControls
            ref={controlsRef}
            makeDefault
            enableDamping
            dampingFactor={0.05}
            minDistance={2}
            maxDistance={50}
            rotateSpeed={0.5}
            panSpeed={0.5}
            zoomSpeed={0.8}
        />
    );
}
