import React, { useState, memo, useCallback } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
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
  const [selectionTooltip, setSelectionTooltip] = useState(null);
  const selectionRef = React.useRef(null);

  const chartData = useChartData(earthquakes, xAxis, yAxis);

  // Sync selection tooltip position after render pass
  React.useEffect(() => {
    const current = selectionRef.current;
    if (current?.payload?.id !== selectionTooltip?.payload?.id || 
        current?.cx !== selectionTooltip?.cx || 
        current?.cy !== selectionTooltip?.cy) {
      setSelectionTooltip(current);
    }
  });

  const renderShape = useCallback((props) => {
    const { cx, cy, payload } = props;
    if (!cx || !cy) return null;
    const isSelected = payload?.id === selectedId;
    
    if (isSelected) {
      selectionRef.current = { cx, cy, payload };
    }

    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={isSelected ? 6 : 4} 
        fill={isSelected ? 'var(--accent-color)' : 'rgba(255,255,255,0.2)'}
        stroke={isSelected ? '#fff' : 'none'}
        strokeWidth={1}
      />
    );
  }, [selectedId]);

  return (
    <div className="flex-1 h-[50vh] lg:h-full bg-card-bg backdrop-blur-md border border-card-border rounded-3xl p-6 lg:p-8 flex flex-col shadow-xl transition-all duration-300">
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

      <div className="flex-1 w-full mt-2 relative min-h-0 min-w-0">
        <ResponsiveContainer width="100%" height="100%" debounce={50}>
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
              tabIndex={-1}
              isAnimationActive={false}
              shape={renderShape}
            />
          </ScatterChart>
        </ResponsiveContainer>

        {/* Programmatic Selection Tooltip */}
        {selectionTooltip && (
          <div 
            className="absolute pointer-events-none z-20 transition-all duration-200"
            style={{ 
              left: selectionTooltip.cx, 
              top: selectionTooltip.cy,
              transform: 'translate(-50%, -110%)' 
            }}
          >
            <ChartTooltip 
              active={true} 
              payload={[
                { payload: selectionTooltip.payload, value: selectionTooltip.payload[xAxis] },
                { payload: selectionTooltip.payload, value: selectionTooltip.payload[yAxis] }
              ]} 
            />
          </div>
        )}
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
