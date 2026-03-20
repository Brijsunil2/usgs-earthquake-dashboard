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

  // Fetch data from USGS API
  fetchEarthquakes: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(FETCH_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch earthquake data: ${response.statusText}`);
      }
      const csvText = await response.text();
      // Parse the raw text into actual JS objects.
      const parsedData = parseCSV(csvText);
      set({ earthquakes: parsedData, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Updates the global selection. This syncs the chart and table.
  setSelectedId: (id) => set({ selectedId: id }),

  // Allows updating specific filters without losing the others.
  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),

  // Deselect everything.
  clearSelection: () => set({ selectedId: null }),
}));

export default useEarthquakeStore;
