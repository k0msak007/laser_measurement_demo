import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { InputSection } from './components/InputSection';
import { DataTable } from './components/DataTable';
import { ExportType, UnitType, Point } from './types';
import { polarToCartesian } from './utils/geometry';
import { exportToSCR, exportToDXF } from './utils/export';

const App = () => {
  const [data, setData] = useState<Point[]>([]);
  const [originalData, setOriginalData] = useState<Point[] | null>(null);
  const [distance, setDistance] = useState<string>("");
  const [angle, setAngle] = useState<string>("");
  const [isPreview, setIsPreview] = useState(false);
  const [exportType, setExportType] = useState<ExportType>(ExportType.SCR);
  const [unitType, setUnitType] = useState<UnitType>(UnitType.MILLIMETER);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      const containerWidth = window.innerWidth;
      setWidth(containerWidth >= 1280 ? containerWidth * 0.4 : containerWidth * 0.8);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const maxDistance = Math.max(...data.map((d) => d.distance), 1);
  const scale = Math.min(width, (width * 9) / 16) / 2 / maxDistance * 0.9;

  const handleAddPoint = (e: React.FormEvent) => {
    e.preventDefault();
    let dist = parseFloat(distance);

    if (unitType === UnitType.MILLIMETER) {
      dist = dist / 1000.0;
    }

    const ang = parseFloat(angle);

    if (!isNaN(dist) && !isNaN(ang)) {
      const { x, y } = polarToCartesian(dist, ang);
      setData([...data, { distance: dist, angle: ang, x, y }]);
      setDistance("");
      setAngle("");
    }
  };

  const handleRemovePoint = (index: number) => {
    if (index === data.length - 1) {
      setData(data.slice(0, -1));
    }
  };

  const handlePreviewToggle = () => {
    if (!isPreview) {
      setOriginalData(data);

      if (data.length >= 2) {
        const [p1, p2] = data;
        const angleOffset = -Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
        const transformedData = data.map(({ distance, angle, x, y }) => {
          const adjustedAngle = angle + angleOffset;
          const { x: newX, y: newY } = polarToCartesian(distance, adjustedAngle);
          return { distance, angle: adjustedAngle, x: newX, y: newY };
        });

        const avgX = transformedData.reduce((sum, p) => sum + p.x, 0) / transformedData.length;
        const avgY = transformedData.reduce((sum, p) => sum + p.y, 0) / transformedData.length;
        const centeredData = transformedData.map(({ distance, angle, x, y }) => ({
          distance,
          angle,
          x: x - avgX,
          y: y - avgY,
        }));

        setData(centeredData);
      }
    } else {
      if (originalData) {
        setData(originalData);
      }
    }

    setIsPreview(!isPreview);
  };

  const handleExport = () => {
    if (data.length < 2) {
      alert("Please add at least two points.");
      return;
    }

    switch (exportType) {
      case ExportType.SCR:
        exportToSCR(data, unitType);
        break;
      case ExportType.DXF:
        exportToDXF(data, unitType);
        break;
    }
  };

  return (
    <>
      <Header unitType={unitType} onUnitTypeChange={(type) => setUnitType(type as UnitType)} />
      <Layout>
        <InputSection
          distance={distance}
          angle={angle}
          unitType={unitType}
          isPreview={isPreview}
          exportType={exportType}
          data={data}
          width={width}
          scale={scale}
          onDistanceChange={setDistance}
          onAngleChange={setAngle}
          onSubmit={handleAddPoint}
          onPreviewToggle={handlePreviewToggle}
          onExportTypeChange={(type) => setExportType(type as ExportType)}
          onExport={handleExport}
        />
        <DataTable
          data={data}
          unitType={unitType}
          onRemovePoint={handleRemovePoint}
        />
      </Layout>
    </>
  );
};

export default App;