"use client";

import { useState, useEffect } from "react";
import { Gltf } from "@react-three/drei";

interface SafeGltfProps {
    url: string;
    scale?: number;
    fallback?: React.ReactNode;
}

export default function SafeGltf({ url, scale = 1, fallback }: SafeGltfProps) {
    const [error, setError] = useState(false);

    // Reset error if URL changes
    useEffect(() => {
        setError(false);
    }, [url]);

    if (error) {
        return (
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="red" wireframe />
            </mesh>
        );
    }

    return (
        <ErrorBoundary onCatch={() => setError(true)}>
            <Gltf
                src={url}
                scale={scale}
                castShadow
                receiveShadow
                onError={() => setError(true)}
            />
        </ErrorBoundary>
    );
}

// Simple Error Boundary for React Three Fiber
import React from 'react';
class ErrorBoundary extends React.Component<{ children: React.ReactNode, onCatch: () => void }, { hasError: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.error("GLTF Load Error:", error);
        this.props.onCatch();
    }

    render() {
        if (this.state.hasError) {
            return null;
        }
        return this.props.children;
    }
}
