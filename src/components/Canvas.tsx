import React from 'react';
import { Point } from '../types';

interface CanvasProps {
  width: number;
  height: number;
  data: Point[];
  scale: number;
}

export const Canvas: React.FC<CanvasProps> = ({ width, height, data, scale }) => {
  const centerX = width / 2;
  const centerY = height / 2;

  const calculateDistance = (x1: number, y1: number, x2: number, y2: number) =>
    Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  return (
    <svg
      width={width}
      height={height}
      className="border border-gray-300 rounded-lg shadow-inner bg-white"
    >
      <line x1={centerX} y1={0} x2={centerX} y2={height} stroke="#CBD5E1" strokeDasharray="4" />
      <line x1={0} y1={centerY} x2={width} y2={centerY} stroke="#CBD5E1" strokeDasharray="4" />
      
      {data.map((point, index) => {
        if (index < data.length - 1) {
          const nextPoint = data[index + 1];
          const x1 = centerX + point.x * scale;
          const y1 = centerY - point.y * scale;
          const x2 = centerX + nextPoint.x * scale;
          const y2 = centerY - nextPoint.y * scale;
          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2;
          const distance = calculateDistance(point.x, point.y, nextPoint.x, nextPoint.y);
          const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

          return (
            <g key={`line-${index}`}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className="stroke-blue-600"
                strokeWidth="2"
              />
              <text
                x={midX}
                y={midY}
                dy={-10}
                className="fill-gray-600 text-xs"
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${angle > 90 || angle < -90 ? angle + 180 : angle}, ${midX}, ${midY})`}
              >
                {`${(distance * 1000).toFixed(2)} mm`}
              </text>
            </g>
          );
        }
        return null;
      })}
      
      {data.map((point, index) => (
        <circle
          key={`point-${index}`}
          cx={centerX + point.x * scale}
          cy={centerY - point.y * scale}
          r={5}
          className="fill-green-600"
        />
      ))}
    </svg>
  );
};