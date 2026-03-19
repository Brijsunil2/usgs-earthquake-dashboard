import React, { memo } from 'react';

const ChartTooltip = memo(({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background/95 backdrop-blur-md border border-card-border p-3 rounded-xl shadow-2xl text-xs">
        <p className="font-bold text-accent mb-1">{data.place}</p>
        <p className="text-text-secondary">
          <span className="font-medium text-text-primary">X:</span> {payload[0].value}
        </p>
        <p className="text-text-secondary">
          <span className="font-medium text-text-primary">Y:</span> {payload[1].value}
        </p>
        <p className="text-[10px] text-text-secondary/50 mt-1 italic">{data.time}</p>
      </div>
    );
  }
  return null;
});

export default ChartTooltip;
