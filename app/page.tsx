"use client";

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import CommandPalette from '@/components/ui/CommandPalette';
import { UserLearningService } from '@/lib/ai/UserLearning';
import CostTicker from '@/components/ui/CostTicker';
import { StructureAnalysisService } from '@/lib/engineering/StructureAnalysis';
import { findAsset, AssetLibrary } from "@/lib/external/AssetLibrary";

const WeightlessScene = dynamic(() => import('@/components/core/WeightlessScene'), { ssr: false });

export default function Home() {
    const [objects, setObjects] = useState<any[]>([
        { id: '1', position: [0, 2, 0], type: 'box', color: '#3366cc', material: 'Steel' },
        { id: '2', position: [2, 4, -2], type: 'sphere', color: '#ff0055', material: 'Plastic' },
        { id: '3', position: [-2, 1, 2], type: 'box', color: '#00ff88', material: 'Aluminum' },
    ]);

    // Real-time Structural Analysis
    const stressReport = useMemo(() => {
        return StructureAnalysisService.analyze(objects);
    }, [objects]);

    // ... existing components

    const handleCommand = (geometry: any) => {
        // LLM returns { type, position, color, ... }
        let type = geometry.type || 'box';
        let url = undefined;

        if (type === 'asset' && geometry.assetId) {
            // Look up URL by ID
            const asset = AssetLibrary.find(a => a.id === geometry.assetId);
            if (asset) {
                url = asset.url;
            } else {
                // Fallback if ID is invalid
                type = 'box';
            }
        }

        const newObject = {
            id: Math.random().toString(36).substr(2, 9),
            position: geometry.position || [0, 5, 0], // Default drop height
            type: type,
            color: geometry.color || '#ffffff',
            scale: geometry.scale || [1, 1, 1],
            material: geometry.material || 'Steel', // Capture material intent
            url: url // Store URL for assets
        };

        setObjects((prev) => [...prev, newObject]);

        // Track user preference
        UserLearningService.getInstance().trackAction('create_object', {
            type: newObject.type,
            color: newObject.color,
            material: newObject.material
        });
    };

    return (
        <main className="w-full h-screen bg-black overflow-hidden relative">
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <h1 className="text-white font-bold text-xl tracking-widest opacity-80">WEIGHTLESS // ENGINEER</h1>
                <p className="text-white/40 text-xs font-mono">GENERATIVE CAD KERNEL V1.0</p>
            </div>

            {/* Live Bill of Materials */}
            <CostTicker objects={objects} />

            {/* Generative Advisor Alert */}
            {Object.values(stressReport).some(v => v > 0.8) && (
                <div className="absolute top-24 right-4 z-50 animate-bounce">
                    <button
                        onClick={() => {
                            const supports = StructureAnalysisService.generateSupports(objects);
                            setObjects(prev => [...prev, ...supports]);
                        }}
                        className="bg-red-600/90 hover:bg-red-500 text-white px-6 py-3 rounded-lg font-bold shadow-xl border border-red-400 backdrop-blur-md flex items-center gap-2"
                    >
                        <span className="text-xl">⚠️</span>
                        AUTO-FIX STRUCTURAL ISSUES
                    </button>
                </div>
            )}

            <CommandPalette onCommand={handleCommand} />

            <div className="w-full h-full">
                <WeightlessScene objects={objects} stressReport={stressReport} />
            </div>
        </main>
    );
}
