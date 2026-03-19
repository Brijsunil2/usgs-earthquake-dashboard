import React, { useState, memo } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import useEarthquakeStore from '../../store/useEarthquakeStore';
import { useChartData } from '../../hooks/useChartData';
import { CHART_LIMIT } from '../../constants/chartConfig';
import AxisSelector from './AxisSelector';
import ChartTooltip from './ChartTooltip';

const ChartPanel = memo(() => {
  const { earthquakes, selectedId, setSelectedId } = useEarthquakeStore();
  const [xAxis, setXAxis] = useState('mag');
  const [yAxis, setYAxis] = useState('depth');

  const chartData = useChartData(earthquakes, xAxis, yAxis);

  return (
    <div className="flex-1 h-[50vh] lg:h-auto bg-card-bg backdrop-blur-md border border-card-border rounded-3xl p-6 lg:p-8 flex flex-col shadow-xl transition-all duration-300">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold bg-accent-gradient bg-clip-text text-transparent">
          Earthquake Analysis
        </h2>

        <div className="flex items-center gap-3 bg-black/20 p-1.5 rounded-xl border border-card-border">
          <AxisSelector label="X" value={xAxis} onChange={setXAxis} />
          <div className="w-[1px] h-4 bg-card-border" />
          <AxisSelector label="Y" value={yAxis} onChange={setYAxis} />
        </div>
      </div>

      <div className="flex-1 min-h-[300px] w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart 
            margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
            tabIndex={-1}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis
              type="number"
              dataKey={xAxis}
              name={xAxis}
              stroke="rgba(255,255,255,0.4)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="number"
              dataKey={yAxis}
              name={yAxis}
              stroke="rgba(255,255,255,0.4)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              trigger="click"
              isAnimationActive={false}
              content={<ChartTooltip />}
              cursor={{ strokeDasharray: '3 3', stroke: 'rgba(255,255,255,0.2)' }}
            />
            <Scatter
              name="Earthquakes"
              data={chartData}
              onClick={(data) => data?.id && setSelectedId(data.id)}
              className="cursor-pointer"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={entry.id || `cell-${index}`}
                  fill={entry.id === selectedId ? 'var(--accent-color)' : 'rgba(255,255,255,0.2)'}
                  stroke={entry.id === selectedId ? '#fff' : 'none'}
                  strokeWidth={1}
                  r={entry.id === selectedId ? 6 : 4}
                  className="transition-all duration-300"
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex justify-between items-center text-[10px] text-text-secondary/60 italic px-2">
        <p>Showing latest {CHART_LIMIT} records</p>
        <p>Click a point to view details and select</p>
      </div>
    </div>
  );
});

ChartPanel.displayName = 'ChartPanel';

export default ChartPanel;
