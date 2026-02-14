"use client";

import dynamic from 'next/dynamic';

const WeightlessScene = dynamic(() => import('./WeightlessScene'), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center text-white/20">Loading Physics Engine...</div>
});

export default function SceneContainer() {
    return <WeightlessScene />;
}
