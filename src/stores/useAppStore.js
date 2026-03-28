import { create } from 'zustand'
import { getPartsData } from '../data/partsData'

const useAppStore = create((set, get) => ({
  screen: 'welcome', // 'welcome' | 'modeSelect' | 'playing' | 'celebration'
  carMode: 'normal', // 'normal' | 'rc'

  isExploded: false,
  isXray: false,
  selectedPart: null,
  hoveredPart: null,

  discoveredParts: [],

  isMuted: false,
  isNarrating: false,
  _pendingCelebration: false,

  setScreen: (screen) => set({ screen }),

  setCarMode: (mode) => set({
    carMode: mode,
    screen: 'playing',
    selectedPart: null,
    hoveredPart: null,
    discoveredParts: [],
    isExploded: false,
    isXray: false,
    _pendingCelebration: false,
  }),

  toggleExplode: () => set((state) => ({
    isExploded: !state.isExploded,
    selectedPart: null,
  })),

  toggleXray: () => set((state) => ({ isXray: !state.isXray })),

  selectPart: (partId) => {
    const state = get()
    const newDiscovered = state.discoveredParts.includes(partId)
      ? state.discoveredParts
      : [...state.discoveredParts, partId]

    const totalParts = getPartsData(state.carMode).length

    set({
      selectedPart: partId,
      discoveredParts: newDiscovered,
    })

    if (newDiscovered.length === totalParts && !state.discoveredParts.includes(partId)) {
      set({ _pendingCelebration: true })
    }
  },

  triggerCelebration: () => {
    const state = get()
    if (state._pendingCelebration) {
      set({ screen: 'celebration', _pendingCelebration: false })
    }
  },

  deselectPart: () => set({ selectedPart: null }),
  setHoveredPart: (partId) => set({ hoveredPart: partId }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setNarrating: (val) => set({ isNarrating: val }),

  resetProgress: () => set((state) => ({
    discoveredParts: [],
    selectedPart: null,
    isExploded: false,
    isXray: false,
    screen: 'playing',
    _pendingCelebration: false,
  })),

  goToModeSelect: () => set({
    screen: 'modeSelect',
    selectedPart: null,
    discoveredParts: [],
    isExploded: false,
    isXray: false,
    _pendingCelebration: false,
  }),
}))

export default useAppStore
