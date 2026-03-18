import { create } from 'zustand';
import { parseCSV } from '../utils/csvParser';

const FETCH_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv';

const useEarthquakeStore = create((set) => ({
  // State
  earthquakes: [],
  selectedId: null,
  loading: false,
  error: null,
  filters: {
    minMagnitude: 0,
    startTime: null,
    endTime: null,
  },

  // Actions
  fetchEarthquakes: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(FETCH_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch earthquake data: ${response.statusText}`);
      }
      const csvText = await response.text();
      const parsedData = parseCSV(csvText);
      set({ earthquakes: parsedData, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  setSelectedId: (id) => set({ selectedId: id }),

  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),

  clearSelection: () => set({ selectedId: null }),
}));

export default useEarthquakeStore;
