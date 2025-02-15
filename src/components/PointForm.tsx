import React from 'react';
import { UnitType } from '../types';
import { Plus } from 'lucide-react';

interface PointFormProps {
  distance: string;
  angle: string;
  unitType: UnitType;
  onDistanceChange: (value: string) => void;
  onAngleChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const PointForm: React.FC<PointFormProps> = ({
  distance,
  angle,
  unitType,
  onDistanceChange,
  onAngleChange,
  onSubmit,
}) => (
  <form onSubmit={onSubmit} className="space-y-6 animate-fade-in">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="input-group">
        <label className="input-label">
          Distance ({unitType === UnitType.METER ? "m" : "mm"})
        </label>
        <input
          type="number"
          value={distance}
          onChange={(e) => onDistanceChange(e.target.value)}
          className="input-field"
          placeholder={`Enter distance in ${unitType === UnitType.METER ? "meters" : "millimeters"}`}
          required
        />
      </div>
      <div className="input-group">
        <label className="input-label">
          Angle (°)
        </label>
        <input
          type="number"
          value={angle}
          onChange={(e) => onAngleChange(e.target.value)}
          step="any"
          className="input-field"
          placeholder="Enter angle in degrees"
          required
        />
      </div>
    </div>
    <button type="submit" className="btn-primary w-full sm:w-auto">
      <Plus className="w-4 h-4 mr-2" />
      Add Point
    </button>
  </form>
);