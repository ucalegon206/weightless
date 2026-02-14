export interface StressReport {
    [id: string]: number; // 0 to 1 (1 = failure)
}

export class StructureAnalysisService {

    // Simple heuristic: Objects not touching the ground (y=0) or another object are "stressed"
    public static analyze(objects: any[]): StressReport {
        const report: StressReport = {};

        // 1. Identify "Ground" objects (y - height/2 <= 0.1)
        // 2. Identify "Supported" objects (touching ground or supported object)

        // For V1 MVP: Just check if y > 0 and no object below it.
        // This is a naive O(N^2) check, acceptable for < 100 objects.

        objects.forEach(obj => {
            const h = obj.scale ? obj.scale[1] : 1;
            const yBottom = obj.position[1] - (h / 2);

            if (yBottom <= 0.1) {
                // Grounded
                report[obj.id] = 0;
            } else {
                // Check for support
                let supported = false;
                for (const other of objects) {
                    if (obj.id === other.id) continue;

                    // Simple AABB check for "stacking"
                    // Is 'other' directly below 'obj'?
                    const otherH = other.scale ? other.scale[1] : 1;
                    const otherTop = other.position[1] + (otherH / 2);

                    // Vertical gap check
                    if (Math.abs(yBottom - otherTop) < 0.2) {
                        // Horizontal overlap check
                        const xDist = Math.abs(obj.position[0] - other.position[0]);
                        const zDist = Math.abs(obj.position[2] - other.position[2]);

                        // Assuming unit width/depth for simplicity if not scaled
                        // In reality should use full AABB
                        if (xDist < 1.0 && zDist < 1.0) {
                            supported = true;
                            break;
                        }
                    }
                }

                if (supported) {
                    report[obj.id] = 0.1; // Low stress
                } else {
                    report[obj.id] = 1.0; // HIGH STRESS (Floating)
                }
            }
        });

        return report;
    }

    public static generateSupports(objects: any[]): any[] {
        const supports: any[] = [];
        const report = this.analyze(objects);

        objects.forEach(obj => {
            if (report[obj.id] > 0.8) {
                // Determine height needed
                // Object bottom is at y - h/2
                // We need a support from y=0 to y_bottom
                const h = obj.scale ? obj.scale[1] : 1;
                const bottomY = obj.position[1] - (h / 2);

                if (bottomY > 0.1) {
                    // Create a support pillar
                    const supportHeight = bottomY;
                    const supportY = supportHeight / 2;

                    supports.push({
                        id: `support-${obj.id}-${Date.now()}`,
                        type: 'cylinder',
                        position: [obj.position[0], supportY, obj.position[2]],
                        scale: [0.2, supportHeight, 0.2], // Thin pillar
                        color: '#FFD700', // Gold/Yellow for "Caution/Support"
                        material: 'Steel'
                    });
                }
            }
        });

        return supports;
    }
}
