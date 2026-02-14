
export const AssetLibrary = [
    {
        id: "gear_1",
        name: "Transmission Gear",
        keywords: ["gear", "cog", "transmission"],
        url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/GearboxAssy/glTF-Binary/GearboxAssy.glb"
    },
    {
        id: "duck_1",
        name: "Rubber Duck (Debug)",
        keywords: ["duck", "rubber", "debug"],
        url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Duck/glTF-Binary/Duck.glb"
    },
    {
        id: "engine_1",
        name: "Reciprocating Saw (Engine-like)",
        keywords: ["engine", "motor", "saw"],
        url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/ReciprocatingSaw/glTF-Binary/ReciprocatingSaw.glb"
    },
    {
        id: "toy_car",
        name: "Toy Car",
        keywords: ["car", "vehicle", "toy"],
        url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/ToyCar/glTF-Binary/ToyCar.glb"
    }
];

export function findAsset(query: string): string | null {
    const q = query.toLowerCase();
    const asset = AssetLibrary.find(a => a.keywords.some(k => q.includes(k)));
    return asset ? asset.url : null;
}
