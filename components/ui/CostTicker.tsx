"use client";

import { useMemo } from "react";
import { CostEngine } from "@/lib/engineering/CostEngine";

interface CostTickerProps {
    objects: any[];
}

export default function CostTicker({ objects }: CostTickerProps) {
    const { totalCost, totalMass } = useMemo(() => {
        return CostEngine.calculateCost(objects);
    }, [objects]);

    return (
        <div className="absolute top-4 right-4 z-50 flex flex-col items-end pointer-events-none">
            <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-4 text-right shadow-2xl">
                <div className="text-xs text-white/40 font-mono mb-1 uppercase tracking-widest">Estimated BOM Cost</div>
                <div className="text-3xl font-bold text-green-400 font-mono tracking-tighter">
                    ${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>

                <div className="w-full h-px bg-white/10 my-2" />

                <div className="flex justify-end gap-4 text-sm font-mono text-white/70">
                    <div>
                        <span className="text-white/30 mr-2">MASS</span>
                        {totalMass.toLocaleString(undefined, { maximumFractionDigits: 1 })} kg
                    </div>
                    <div>
                        <span className="text-white/30 mr-2">PARTS</span>
                        {objects.length}
                    </div>
                </div>
            </div>
        </div>
    );
}
