import useEarthquakeData from '../../hooks/useEarthquakeData';
import DataTable from './DataTable';

const DataPanel = () => {
  const { loading, error } = useEarthquakeData();

  return (
    <div className="flex-1 h-[50vh] lg:h-auto bg-card-bg backdrop-blur-md border border-card-border rounded-3xl p-6 lg:p-8 flex flex-col shadow-xl transition-transform transition-shadow duration-300 ease-in-out overflow-hidden">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold bg-accent-gradient bg-clip-text text-transparent inline-block">
          Live Earthquake Data
        </h2>
        {loading && (
          <span className="text-xs text-text-secondary animate-pulse">Updating metadata...</span>
        )}
      </div>
      
      {error ? (
        <div className="flex-1 flex flex-col justify-center items-center text-red-400 p-4 text-center border border-red-900/20 rounded-2xl bg-red-900/10">
          <p className="font-semibold mb-2">Error loading data</p>
          <p className="text-xs opacity-80">{error}</p>
        </div>
      ) : (
        <DataTable />
      )}
    </div>
  );
};

export default DataPanel;
