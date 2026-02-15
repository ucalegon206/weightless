# Weightless

**Weightless** is a generative CAD kernel designed to interpret engineering intent into 3D structures. It combines a zero-gravity physics engine with a local LLM (Large Language Model) to allow users to spawn and manipulate engineering parts using natural language.

![Weightless Demo](https://placehold.co/800x400/000000/ffffff?text=Weightless+CAD+Kernel)

## Features

*   **The Void**: A zero-gravity environment built with `@react-three/rapier` and `@react-three/fiber`.
*   **Intent Engine**: Local AI (Phi-3.5 via WebLLM) that interprets commands like "Steel Gear" or "Red Box".
    *   *Offline Mode*: Robust regex fallback if the AI cannot load.
*   **Engineering Precision**:
    *   **Material Registry**: Real-world materials (Titanium, Gold, Concrete) with correct density and cost.
    *   **Live Cost Ticker**: Real-time Bill of Materials (BOM) calculation.
    *   **Structure Analysis**: Real-time stress and visual load testing.
*   **Asset Library**: Integrated standard engineering parts (Gears, Bolts) sourced from public GLB repositories.

## Getting Started

### Prerequisites

*   Node.js 18+
*   npm or pnpm
*   A browser with WebGPU support (Chrome, Edge, FireFox Nightly) for the AI features.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/ucalegon206/weightless.git
    cd weightless
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    pnpm install
    ```

### Running the App

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## How to Use

1.  **Initialize Engine**: Click the "INITIALIZE INTENT ENGINE" button at the bottom.
    *   *Note*: The first time you run this, it may take a moment to download the AI model (~1GB) if your browser supports it. If not, it will default to **Offline Mode**.
2.  **Command Palette**:
    *   Type commands like:
        *   `"Steel Box"`
        *   `"Red Sphere"`
        *   `"Gear"` (Spawns a transmission gear)
        *   `"Duck"` (Spawns a debug rubber duck)
3.  **Navigation**:
    *   **Rotate**: Left Click + Drag
    *   **Pan**: Right Click + Drag
    *   **Zoom**: Scroll
4.  **Interaction**:
    *   **Select**: Click an object to see its properties and stress heatmap.
    *   **Toss**: Drag and release objects to throw them in zero gravity.

## Architecture

*   **Framework**: Next.js 14 (App Router)
*   **3D Engine**: React Three Fiber (Three.js)
*   **Physics**: Rapier (WASM)
*   **AI**: WebLLM (Browser-native LLM inference)

## License

MIT
