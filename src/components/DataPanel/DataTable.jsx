import React from 'react';
import useEarthquakeStore from '../../store/useEarthquakeStore';

const DataTable = () => {
  const { earthquakes, selectedId, setSelectedId } = useEarthquakeStore();

  if (!earthquakes || earthquakes.length === 0) {
    return (
      <div className="flex-1 flex justify-center items-center text-text-secondary italic">
        No earthquake data available.
      </div>
    );
  }

  const headers = Object.keys(earthquakes[0]);

  return (
    <div className="flex-1 overflow-auto custom-scrollbar border border-card-border rounded-xl bg-black/20">
      <table className="w-full text-left border-collapse min-w-[1000px]">
        <thead className="sticky top-0 z-10 bg-background/90 backdrop-blur-sm shadow-sm">
          <tr>
            {headers.map((header) => (
              <th 
                key={header} 
                className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-text-secondary border-b border-card-border"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-card-border">
          {earthquakes.map((row, index) => {
            const isSelected = selectedId === row.id || selectedId === index;
            return (
              <tr 
                key={row.id || index}
                onClick={() => setSelectedId(row.id || index)}
                className={`
                  group cursor-pointer transition-colors duration-200
                  ${isSelected ? 'bg-accent/20' : 'hover:bg-white/5'}
                `}
              >
                {headers.map((header) => (
                  <td 
                    key={`${index}-${header}`} 
                    className={`
                      px-4 py-3 text-sm whitespace-nowrap
                      ${isSelected ? 'text-text-primary font-medium' : 'text-text-secondary group-hover:text-text-primary'}
                    `}
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
