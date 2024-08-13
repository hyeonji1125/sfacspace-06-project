import { create } from 'zustand';
import { DropdownState } from '@/types/utils';

export const useDropdownStore = create<DropdownState>((set) => ({
  selectedType: 'Type',
  setSelectedType: (option) => set({ selectedType: option }),
  selectedSort: 'Sort',
  setSelectedSort: (option) => set({ selectedSort: option }),
}));
