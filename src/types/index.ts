export enum ExportType {
  SCR = "AutoCAD Script (.scr)",
  DXF = "AutoCAD Drawing (.dxf)"
}

export enum UnitType {
  METER = "Meters",
  MILLIMETER = "Millimeters"
}

export interface Point {
  distance: number;
  angle: number;
  x: number;
  y: number;
}