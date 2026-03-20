import React, { useMemo, memo, useRef, useEffect } from 'react';
import useEarthquakeStore from '../../store/useEarthquakeStore';
import { CHART_LIMIT } from '../../constants/chartConfig';
import { formatDateTime } from '../../utils/dateUtils';

const DEFAULT_COLUMNS = ['time', 'mag', 'place', 'type', 'depth', 'status'];
const HEADER_MAP = {
  time: 'Date & Time',
  mag: 'Magnitude',
  place: 'Location',
  type: 'Type',
  depth: 'Depth (km)',
  status: 'Status',
};

const TableRow = memo(({ row, headers, isSelected, onSelect }) => {
  const rowRef = useRef(null);

  // Automatically scroll to data point on selection
  useEffect(() => {
    if (isSelected && rowRef.current) {
      rowRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isSelected]);

  return (
    <tr
      ref={rowRef}
      onClick={() => onSelect(row.id)}
      className={`
        group cursor-pointer transition-colors duration-200
        ${isSelected ? 'bg-accent/40' : 'hover:bg-white/5'}
      `}
    >
      {headers.map((header) => {
        const value = row[header];
        const displayValue = header === 'time' ? formatDateTime(value) : value;

        return (
          <td
            key={`${row.id}-${header}`}
            className={`
              px-4 py-3 text-sm whitespace-nowrap
              ${isSelected ? 'text-white font-bold' : 'text-text-secondary group-hover:text-text-primary'}
            `}
          >
            {displayValue}
          </td>
        );
      })}
    </tr>
  );
});

const DataTable = () => {
  const { earthquakes, selectedId, setSelectedId } = useEarthquakeStore();

  // Cap the list at 500 records so the browser stays snappy
  const displayEarthquakes = useMemo(() =>
    earthquakes.slice(0, CHART_LIMIT),
    [earthquakes]);

  const headers = useMemo(() => {
    if (earthquakes.length === 0) return [];
    const allKeys = Object.keys(earthquakes[0]);
    // Filter to important columns first, then add any missing defaults
    return DEFAULT_COLUMNS.filter(col => allKeys.includes(col));
  }, [earthquakes]);

  if (!earthquakes || earthquakes.length === 0) {
    return (
      <div className="flex-1 flex justify-center items-center text-text-secondary italic">
        No earthquake data available.
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto custom-scrollbar border border-card-border rounded-xl bg-black/20 relative">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead className="sticky top-0 z-10 bg-background/95 backdrop-blur-md shadow-sm">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-text-secondary border-b border-card-border"
              >
                {HEADER_MAP[header] || header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-card-border">
          {displayEarthquakes.map((row, index) => (
            <TableRow
              key={row.id || index}
              row={row}
              headers={headers}
              isSelected={selectedId === row.id}
              onSelect={setSelectedId}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
