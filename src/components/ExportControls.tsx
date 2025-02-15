import React from 'react';
import { ExportType } from '../types';
import { FileDown, Eye, EyeOff } from 'lucide-react';

interface ExportControlsProps {
  isPreview: boolean;
  exportType: ExportType;
  onPreviewToggle: () => void;
  onExportTypeChange: (type: ExportType) => void;
  onExport: () => void;
}

export const ExportControls: React.FC<ExportControlsProps> = ({
  isPreview,
  exportType,
  onPreviewToggle,
  onExportTypeChange,
  onExport,
}) => (
  <div className="flex flex-wrap gap-4 justify-center mb-6">
    <button
      onClick={onPreviewToggle}
      className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isPreview
          ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
          : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
      }`}
    >
      {isPreview ? (
        <>
          <EyeOff className="w-4 h-4 mr-2" />
          Cancel Preview
        </>
      ) : (
        <>
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </>
      )}
    </button>

    {isPreview && (
      <>
        <select
          value={exportType}
          onChange={(e) => onExportTypeChange(e.target.value as ExportType)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {Object.values(ExportType).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <button
          onClick={onExport}
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <FileDown className="w-4 h-4 mr-2" />
          Export
        </button>
      </>
    )}
  </div>
);