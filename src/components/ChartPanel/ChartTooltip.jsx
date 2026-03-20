import React, { memo } from 'react';
import { formatDateTime } from '../../utils/dateUtils';

const ChartTooltip = memo(({ active, payload }) => {
  // how the tooltip if it's explicitly 'active' and has data ('payload').
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="bg-black/90 border border-white/20 p-3 rounded-xl shadow-2xl text-xs backdrop-blur-sm">
        <p className="font-bold text-accent mb-1">{data.place}</p>
        {/*Show the X and Y coordinates so users know exactly which metrics they've selected.*/}
        <p className="text-text-secondary">
          <span className="font-medium text-text-primary">X:</span> {payload[0].value}
        </p>
        <p className="text-text-secondary">
          <span className="font-medium text-text-primary">Y:</span> {payload[1].value}
        </p>

        {/* Consistent date formatting is handled by our utility function to match the data table. */}
        <p className="text-[10px] text-text-secondary/50 mt-1 italic">
          {formatDateTime(data.time)}
        </p>
      </div>
    );
  }
  return null;
});

export default ChartTooltip;
