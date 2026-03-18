/**
 * Robust CSV parser that handles quoted values containing commas.
 * Designed specifically for USGS earthquake data feeds.
 */

export const parseCSV = (text) => {
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
