export interface MaterialData {
    id: string;
    name: string;
    density: number; // kg/m3
    costPerKg: number; // USD
    color: string;
    roughness: number;
    metalness: number;
}

export const MaterialRegistry: Record<string, MaterialData> = {
    "Steel": {
        id: "steel",
        name: "Structural Steel (ASTM A36)",
        density: 7850,
        costPerKg: 0.85,
        color: "#708090",
        roughness: 0.4,
        metalness: 0.8
    },
    "Aluminum": {
        id: "aluminum",
        name: "Aluminum 6061-T6",
        density: 2700,
        costPerKg: 2.80,
        color: "#A0A0A0",
        roughness: 0.3,
        metalness: 0.9
    },
    "Oak": {
        id: "oak",
        name: "White Oak",
        density: 755,
        costPerKg: 12.50, // Converted roughly from board foot
        color: "#8B4513",
        roughness: 0.8,
        metalness: 0.0
    },
    "Plastic": {
        id: "abs",
        name: "ABS Plastic",
        density: 1040,
        costPerKg: 3.50,
        color: "#FFA500", // Safety Orange default
        roughness: 0.1,
        metalness: 0.1
    },
    "CarbonFiber": {
        id: "cf",
        name: "Carbon Fiber Reinforced Polymer",
        density: 1600,
        costPerKg: 45.00,
        color: "#111111",
        roughness: 0.4,
        metalness: 0.5
    },
    "Titanium": {
        id: "titanium",
        name: "Titanium Alloy (Ti-6Al-4V)",
        density: 4430,
        costPerKg: 40.00,
        color: "#C0C0C0",
        roughness: 0.25,
        metalness: 1.0
    },
    "Gold": {
        id: "gold",
        name: "24K Gold Plating",
        density: 19300,
        costPerKg: 60000.00,
        color: "#FFD700",
        roughness: 0.1,
        metalness: 1.0
    },
    "Concrete": {
        id: "concrete",
        name: "Reinforced Concrete",
        density: 2400,
        costPerKg: 0.15,
        color: "#808080",
        roughness: 0.9,
        metalness: 0.0
    },
    "Glass": {
        id: "glass",
        name: "Tempered Glass",
        density: 2500,
        costPerKg: 15.00,
        color: "#E0F7FA", // Light Cyan tint
        roughness: 0.0,
        metalness: 0.1,
        transmission: 0.9 // Special property for SmartObject
    },
    "CarbonNanotube": {
        id: "cnt",
        name: "Carbon Carbon Composite",
        density: 1800,
        costPerKg: 120.00,
        color: "#1A1A1A",
        roughness: 0.6,
        metalness: 0.4
    }
};

export interface MaterialData {
    id: string;
    name: string;
    density: number;
    costPerKg: number;
    color: string;
    roughness: number;
    metalness: number;
    transmission?: number; // Optional visual property
}

export const DEFAULT_MATERIAL = "Steel";
