const ChartPanel = () => {
  return (
    <div className="flex-[1.5] h-[50vh] lg:h-auto bg-card-bg backdrop-blur-md border border-card-border rounded-3xl p-8 flex flex-col shadow-xl transition-transform transition-shadow duration-300 ease-in-out">
      <div className="mb-6">
        <h2 className="text-xl font-semibold bg-accent-gradient bg-clip-text text-transparent inline-block">
          Earthquake Activity Chart
        </h2>
      </div>
      <div className="flex-1 flex justify-center items-center border border-dashed border-card-border rounded-2xl text-text-secondary">
        Chart Visualization Placeholder
      </div>
    </div>
  );
};

export default ChartPanel;
