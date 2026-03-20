import { useEffect } from 'react';
import useEarthquakeStore from '../store/useEarthquakeStore';

/**
 * Custom hook to fetch and provide earthquake data from our global Zustand store.
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
    // Fetch data if the app just loaded and we have no data.
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
