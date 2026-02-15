import { describe, it, expect } from 'vitest';
import { MaterialRegistry, DEFAULT_MATERIAL } from '../MaterialRegistry';

describe('MaterialRegistry', () => {
    it('contains valid default material', () => {
        expect(MaterialRegistry).toHaveProperty(DEFAULT_MATERIAL);
        expect(MaterialRegistry[DEFAULT_MATERIAL]).toHaveProperty('density');
        expect(MaterialRegistry[DEFAULT_MATERIAL]).toHaveProperty('costPerKg');
    });

    it('contains standard engineering materials', () => {
        const materials = Object.keys(MaterialRegistry);
        expect(materials).toContain('Steel');
        expect(materials).toContain('Aluminum');
        expect(materials).toContain('Titanium');
        expect(materials).toContain('Gold');
    });

    it('has valid physical properties', () => {
        // Steel should be around 7850 kg/m3
        expect(MaterialRegistry['Steel'].density).toBeGreaterThan(7000);
        expect(MaterialRegistry['Steel'].density).toBeLessThan(8000);

        // Gold should be much denser
        expect(MaterialRegistry['Gold'].density).toBeGreaterThan(19000);
    });
});
