import React from 'react';
import { UnitType } from '../types';
import { Ruler } from 'lucide-react';

interface HeaderProps {
  unitType: UnitType;
  onUnitTypeChange: (unitType: UnitType) => void;
}

export const Header: React.FC<HeaderProps> = ({ unitType, onUnitTypeChange }) => (
  <div className="bg-white shadow-sm p-4 mb-6">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
      <div className="flex items-center gap-2 mb-4 sm:mb-0">
        <Ruler className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">Laser Map</h1>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Unit Type:</label>
        <select
          value={unitType}
          onChange={(e) => onUnitTypeChange(e.target.value as UnitType)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {Object.values(UnitType).map((unit) => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>
      </div>
    </div>
  </div>
);