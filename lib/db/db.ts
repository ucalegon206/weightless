import { createRxDatabase, RxDatabase, RxCollection } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

// Define the Preference Schema
const preferenceSchema = {
    title: 'preference schema',
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 100 // max length for primary key
        },
        key: {
            type: 'string'
        },
        value: {
            type: 'mixed' // mixed type to store flexible JSON data
        },
        timestamp: {
            type: 'number'
        }
    },
    required: ['id', 'key', 'timestamp']
};

// Types
export type PreferenceDocType = {
    id: string;
    key: string;
    value: any;
    timestamp: number;
};

export type PreferenceCollection = RxCollection<PreferenceDocType>;

export type DatabaseCollections = {
    preferences: PreferenceCollection;
};

export type WeightlessDatabase = RxDatabase<DatabaseCollections>;

let dbPromise: Promise<WeightlessDatabase> | null = null;

const createDatabase = async (): Promise<WeightlessDatabase> => {
    console.log("Creating RxDB Database...");
    const db = await createRxDatabase<DatabaseCollections>({
        name: 'weightlessdb',
        storage: getRxStorageDexie(),
        ignoreDuplicate: true
    });

    await db.addCollections({
        preferences: {
            schema: preferenceSchema
        }
    });

    return db;
};

export const getDatabase = (): Promise<WeightlessDatabase> => {
    if (!dbPromise) {
        dbPromise = createDatabase();
    }
    return dbPromise;
};
