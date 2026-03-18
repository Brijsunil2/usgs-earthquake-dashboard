import { useEffect } from 'react';
import useEarthquakeStore from '../store/useEarthquakeStore';

/**
 * Custom hook to fetch and provide earthquake data from global Zustand store.
 * @returns {Object} { data, loading, error, selectedId, setSelectedId, setFilters }
 */
const useEarthquakeData = () => {
  const { 
    earthquakes, 
    loading, 
    error, 
    fetchEarthquakes, 
    selectedId, 
    setSelectedId, 
    setFilters 
  } = useEarthquakeStore();

  useEffect(() => {
    // Only fetch if we don't already have data
    if (earthquakes.length === 0 && !loading && !error) {
      fetchEarthquakes();
    }
  }, [earthquakes.length, loading, error, fetchEarthquakes]);

  return { 
    data: earthquakes, 
    loading, 
    error, 
    selectedId, 
    setSelectedId, 
    setFilters 
  };
};

export default useEarthquakeData;
