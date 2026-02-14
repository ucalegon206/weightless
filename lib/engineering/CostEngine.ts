import { MaterialRegistry, DEFAULT_MATERIAL } from "./MaterialRegistry";
// Force rebuild

export class CostEngine {

    public static calculateVolume(type: "box" | "sphere" | "cylinder", scale: [number, number, number]): number {
        // Scale assumes meters for this engine
        const [x, y, z] = scale;

        switch (type) {
            case "box":
                return x * y * z;
            case "sphere":
                // Assuming x is diameter or similar uniform scale for ease, or ellipsoid
                // Let's assume x is radius for now for simplicity in LLM generation usually
                // Actually LLM usually gives bounding box scale. 
                // Let's treat scale as bounding box dimensions.
                // Sphere radius ~ x/2
                const r = x / 2;
                return (4 / 3) * Math.PI * Math.pow(r, 3);
            default:
                return x * y * z; // Fallback
        }
    }

    public static calculateCost(objects: any[]): { totalCost: number, totalMass: number, breakdown: any[] } {
        let totalCost = 0;
        let totalMass = 0;
        const breakdown = [];

        for (const obj of objects) {
            const materialKey = obj.material || DEFAULT_MATERIAL;
            const mat = MaterialRegistry[materialKey] || MaterialRegistry[DEFAULT_MATERIAL];

            const volume = this.calculateVolume(obj.type, obj.scale || [1, 1, 1]);
            const mass = volume * mat.density;
            const cost = mass * mat.costPerKg;

            totalCost += cost;
            totalMass += mass;

            breakdown.push({
                id: obj.id,
                material: mat.name,
                volume: volume.toFixed(4),
                mass: mass.toFixed(2),
                cost: cost.toFixed(2)
            });
        }

        return {
            totalCost,
            totalMass,
            breakdown
        };
    }
}
