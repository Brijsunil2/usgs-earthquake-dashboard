import ChartPanel from './components/ChartPanel/ChartPanel';
import DataPanel from './components/DataPanel/DataPanel';

function App() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-[1400px] h-auto lg:h-[85vh] justify-center items-stretch">
      <ChartPanel />
      <DataPanel />
    </div>
  );
}

export default App;
