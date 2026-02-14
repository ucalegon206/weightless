"use client";

import { useState, useEffect, useRef } from "react";
import { LocalLLMService } from "@/lib/ai/LocalLLM";
import { InitProgressReport } from "@mlc-ai/web-llm";

interface CommandPaletteProps {
    onCommand: (geometry: any) => void;
}

export default function CommandPalette({ onCommand }: CommandPaletteProps) {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState("");
    const [isReady, setIsReady] = useState(false);
    const llmRef = useRef<LocalLLMService | null>(null);

    useEffect(() => {
        llmRef.current = LocalLLMService.getInstance();

        const initLLM = async () => {
            try {
                await llmRef.current?.initialize((report: InitProgressReport) => {
                    setProgress(report.text);
                });
                setIsReady(true);
                setProgress("");
            } catch (err) {
                setProgress("Failed to load AI.");
            }
        };

        // Lazy load the LLM only on first interaction or wait? 
        // For now, let's load it immediately or provide a button to "Load AI" to save bandwidth
        // initLLM();
    }, []);

    const handleLoadAI = async () => {
        setLoading(true);
        try {
            await llmRef.current?.initialize((report: InitProgressReport) => {
                setProgress(report.text);
            });
            setProgress("");
        } catch (err) {
            console.error("LLM Init Failed, enabling fallback mode:", err);
            setProgress("Offline Mode (Regex Fallback Active)");
        } finally {
            setIsReady(true);
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !isReady) return;

        setLoading(true);
        try {
            const geometry = await llmRef.current?.generateGeometry(input);
            if (geometry) {
                console.log("LLM Generated:", geometry);
                onCommand(geometry);
                setInput("");
            }
        } catch (error) {
            console.error(error);
            setProgress("Error generating geometry.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-lg px-4 z-50">
            {!isReady ? (
                <button
                    onClick={handleLoadAI}
                    disabled={loading}
                    className="w-full bg-blue-600/80 hover:bg-blue-600 text-white backdrop-blur-md px-4 py-2 rounded-full shadow-lg font-mono text-sm transition-all"
                >
                    {loading ? `INITIALIZING ENGINE... ${progress}` : "INITIALIZE INTENT ENGINE"}
                </button>
            ) : (
                <form onSubmit={handleSubmit} className="relative group">
                    <div className={`absolute inset-0 bg-blue-500/20 rounded-full blur-xl transition-opacity duration-500 ${loading ? 'opacity-100' : 'opacity-0'}`} />
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={loading}
                        placeholder={loading ? "Computing trade-offs..." : "Define engineering intent (e.g. 'Steel Beam 20ft')"}
                        className="w-full bg-black/60 border border-white/10 text-white placeholder-white/40 backdrop-blur-xl rounded-full px-6 py-4 shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-mono transition-all"
                        autoFocus
                    />
                    {loading && (
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}
                </form>
            )}

            {/* Feedback Text */}
            {progress && isReady && <div className="text-center text-xs text-white/50 mt-2 font-mono">{progress}</div>}
        </div>
    );
}
