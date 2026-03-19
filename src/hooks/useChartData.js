import { useMemo } from 'react';
import { CHART_LIMIT } from '../constants/chartConfig';

/**
 * Custom hook to prepare and sample earthquake data for Recharts.
 * @param {Array} earthquakes 
 * @param {string} xAxis 
 * @param {string} yAxis 
 */
export const useChartData = (earthquakes, xAxis, yAxis) => {
  return useMemo(() => {
    if (!earthquakes) return [];
    
    return earthquakes
      .slice(0, CHART_LIMIT)
      .map(eq => ({
        ...eq,
        [xAxis]: parseFloat(eq[xAxis]) || 0,
        [yAxis]: parseFloat(eq[yAxis]) || 0,
      }));
  }, [earthquakes, xAxis, yAxis]);
};
