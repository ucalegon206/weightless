import { getDatabase, WeightlessDatabase } from "@/lib/db/db";

export class UserLearningService {
    private static instance: UserLearningService;
    private db: WeightlessDatabase | null = null;

    private constructor() { }

    public static getInstance(): UserLearningService {
        if (!UserLearningService.instance) {
            UserLearningService.instance = new UserLearningService();
        }
        return UserLearningService.instance;
    }

    private async getDB() {
        if (!this.db) {
            this.db = await getDatabase();
        }
        return this.db;
    }

    public async trackAction(actionType: string, details: any) {
        const db = await this.getDB();
        const id = `${actionType}-${Date.now()}`;

        try {
            await db.preferences.insert({
                id,
                key: actionType,
                value: details,
                timestamp: Date.now()
            });
            console.log(`[UserLearning] Tracked: ${actionType}`);
        } catch (e) {
            console.error("Failed to track action", e);
        }
    }

    public async getSuggestedColor(): Promise<string> {
        const db = await this.getDB();
        // Simple logic: Find most recently used color
        // In a real app, this would use a more complex query or aggregation
        const recentAction = await db.preferences.findOne({
            selector: { key: 'create_object' },
            sort: [{ timestamp: 'desc' }]
        }).exec();

        if (recentAction && recentAction.value.color) {
            return recentAction.value.color;
        }
        return "#708090"; // STEEL (Default)
    }

    public async getSuggestedMaterial(): Promise<string> {
        const db = await this.getDB();
        const recentAction = await db.preferences.findOne({
            selector: { key: 'create_object' },
            sort: [{ timestamp: 'desc' }]
        }).exec();

        if (recentAction && recentAction.value.material) {
            return recentAction.value.material;
        }
        return "Steel";
    }
}
