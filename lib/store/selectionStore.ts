import { create } from 'zustand';

interface SelectionState {
    selectedIds: string[];
    hoveredId: string | null;
    intent: 'NONE' | 'MOVE' | 'CLONE' | 'EXTRUDE';
    setSelected: (ids: string[]) => void;
    toggleSelection: (id: string, multi: boolean) => void;
    setHovered: (id: string | null) => void;
    setIntent: (intent: 'NONE' | 'MOVE' | 'CLONE' | 'EXTRUDE') => void;
}

export const useSelectionStore = create<SelectionState>((set) => ({
    selectedIds: [],
    hoveredId: null,
    intent: 'NONE',
    setSelected: (ids) => set({ selectedIds: ids }),
    toggleSelection: (id, multi) => set((state) => {
        if (multi) {
            return {
                selectedIds: state.selectedIds.includes(id)
                    ? state.selectedIds.filter(i => i !== id)
                    : [...state.selectedIds, id]
            };
        }
        return { selectedIds: [id] };
    }),
    setHovered: (id) => set({ hoveredId: id }),
    setIntent: (intent) => set({ intent })
}));
