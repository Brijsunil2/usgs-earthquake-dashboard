import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch and parse earthquake data from USGS CSV feed.
 * @returns {Object} { data, loading, error }
 */
const useEarthquakeData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const csvText = await response.text();
        const parsedData = parseCSV(csvText);
        
        setData(parsedData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /**
   * Robust CSV parser that handles quoted values containing commas.
   * @param {string} text 
   * @returns {Array<Object>}
   */
  const parseCSV = (text) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    if (lines.length === 0) return [];

    const headers = splitCSVLine(lines[0]);
    return lines.slice(1).map(line => {
      const values = splitCSVLine(line);
      const obj = {};
      headers.forEach((header, index) => {
        obj[header.trim()] = values[index] ? values[index].trim() : '';
      });
      return obj;
    });
  };

  /**
   * Splits a CSV line while respecting quoted commas.
   * @param {string} line 
   * @returns {Array<string>}
   */
  const splitCSVLine = (line) => {
    const result = [];
    let start = 0;
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') {
        inQuotes = !inQuotes;
      } else if (line[i] === ',' && !inQuotes) {
        result.push(cleanValue(line.substring(start, i)));
        start = i + 1;
      }
    }
    result.push(cleanValue(line.substring(start)));
    return result;
  };

  const cleanValue = (val) => {
    const trimmed = val.trim();
    if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
      return trimmed.substring(1, trimmed.length - 1).replace(/""/g, '"');
    }
    return trimmed;
  };

  return { data, loading, error };
};

export default useEarthquakeData;
