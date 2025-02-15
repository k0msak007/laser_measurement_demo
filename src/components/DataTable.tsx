import React from 'react';
import { Point, UnitType } from '../types';
import { Trash2 } from 'lucide-react';

interface DataTableProps {
  data: Point[];
  unitType: UnitType;
  onRemovePoint: (index: number) => void;
}

export const DataTable: React.FC<DataTableProps> = ({ data, unitType, onRemovePoint }) => (
  <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Distance ({unitType === UnitType.METER ? "m" : "mm"})
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Angle (°)</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">X</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Y</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((point, index) => (
          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
            <td className="px-4 py-3 text-sm text-gray-900">
              {unitType === UnitType.MILLIMETER ? (point.distance * 1000).toFixed(4) : point.distance.toFixed(2)}
            </td>
            <td className="px-4 py-3 text-sm text-gray-900">{point.angle.toFixed(2)}</td>
            <td className="px-4 py-3 text-sm text-gray-900">
              {unitType === UnitType.MILLIMETER ? (point.x * 1000).toFixed(2) : point.x.toFixed(2)}
            </td>
            <td className="px-4 py-3 text-sm text-gray-900">
              {unitType === UnitType.MILLIMETER ? (point.y * 1000).toFixed(2) : point.y.toFixed(2)}
            </td>
            <td className="px-4 py-3 text-sm">
              <button
                onClick={() => index === data.length - 1 && onRemovePoint(index)}
                disabled={index !== data.length - 1}
                className={`p-2 rounded-full ${
                  index === data.length - 1
                    ? 'text-red-600 hover:bg-red-100'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);