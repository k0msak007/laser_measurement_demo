import React from 'react';
import { PointForm } from './PointForm';
import { ExportControls } from './ExportControls';
import { Canvas } from './Canvas';
import { UnitType, ExportType, Point } from '../types';

interface InputSectionProps {
  distance: string;
  angle: string;
  unitType: UnitType;
  isPreview: boolean;
  exportType: ExportType;
  data: Point[];
  width: number;
  scale: number;
  onDistanceChange: (value: string) => void;
  onAngleChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onPreviewToggle: () => void;
  onExportTypeChange: (type: ExportType) => void;
  onExport: () => void;
}

export const InputSection: React.FC<InputSectionProps> = ({
  distance,
  angle,
  unitType,
  isPreview,
  exportType,
  data,
  width,
  scale,
  onDistanceChange,
  onAngleChange,
  onSubmit,
  onPreviewToggle,
  onExportTypeChange,
  onExport,
}) => {
  const height = (width * 9) / 16;

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="card-body">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Point</h2>
          <PointForm
            distance={distance}
            angle={angle}
            unitType={unitType}
            onDistanceChange={onDistanceChange}
            onAngleChange={onAngleChange}
            onSubmit={onSubmit}
          />
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Export Options</h2>
          <ExportControls
            isPreview={isPreview}
            exportType={exportType}
            onPreviewToggle={onPreviewToggle}
            onExportTypeChange={onExportTypeChange}
            onExport={onExport}
          />
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Visual Preview</h2>
          <Canvas
            width={width}
            height={height}
            data={data}
            scale={scale}
          />
        </div>
      </div>
    </div>
  );
};