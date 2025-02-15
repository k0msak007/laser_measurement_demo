import * as makerjs from 'makerjs';
import { Point, UnitType } from '../types';

export const exportToSCR = (data: Point[], unitType: UnitType) => {
  const multiplier = unitType === UnitType.MILLIMETER ? 1000 : 1;

  let scriptContent = `; AutoCAD Script Generated from Laser Map
; Units set to ${unitType}
UNITS
4
3
0

; Draw Points and Lines
`;

  data.forEach((point, index) => {
    scriptContent += `POINT\n${(point.x * multiplier).toFixed(12)},${(point.y * multiplier).toFixed(12)},0\n`;

    if (index < data.length - 1) {
      const nextPoint = data[index + 1];
      scriptContent += `LINE\n${(point.x * multiplier).toFixed(12)},${(point.y * multiplier).toFixed(12)},0\n${(nextPoint.x * multiplier).toFixed(12)},${(nextPoint.y * multiplier).toFixed(12)},0\n`;
    }
  });

  scriptContent += `\nZOOM\nE\n`;

  const blob = new Blob([scriptContent], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "laser_map_2022.scr";
  link.click();
};

export const exportToDXF = (data: Point[], unitType: UnitType) => {
  const multiplier = unitType === UnitType.MILLIMETER ? 1000 : 1;

  const model: makerjs.IModel = {
    paths: {},
    models: {}
  };

  data.forEach((point, index) => {
    const pointKey = `point${index}`;
    model.paths[pointKey] = new makerjs.paths.Circle([
      point.x * multiplier,
      point.y * multiplier
    ], 1);

    if (index < data.length - 1) {
      const nextPoint = data[index + 1];
      const lineKey = `line${index}`;
      model.paths[lineKey] = new makerjs.paths.Line(
        [point.x * multiplier, point.y * multiplier],
        [nextPoint.x * multiplier, nextPoint.y * multiplier]
      );
    }
  });

  try {
    const dxf = makerjs.exporter.toDXF(model);
    const blob = new Blob([dxf], { type: "application/dxf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "laser_map_2022.dxf";
    link.click();
  } catch (error) {
    console.error("Error exporting DXF:", error);
    alert("Error exporting to DXF format");
  }
};