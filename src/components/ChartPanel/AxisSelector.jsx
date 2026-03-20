import React from 'react';
import { AXIS_OPTIONS } from '../../constants/chartConfig';

const AxisSelector = ({ label, value, onChange }) => (
  <div className="flex items-center gap-2">
    <span className="text-[10px] uppercase font-bold text-text-secondary px-2">{label}</span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-transparent text-xs text-text-primary focus:outline-none cursor-pointer"
    >
      {/* We pull labels and values directly from our chart configuration. */}
      {AXIS_OPTIONS.map(opt => (
        <option key={opt.value} value={opt.value} className="bg-background text-text-primary">
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default AxisSelector;
