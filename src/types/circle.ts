export interface CircleCalculation {
  radius: number;
  alpha: number;
  pi: number;
  area: number;
  perimeter: number;
  sectorArea: number;
  arcLength: number;
  sectorPercentage: number;
  calculationSteps: {
    areaStep: string;
    perimeterStep: string;
    sectorAreaStep: string;
    arcLengthStep: string;
  };
}

export interface TestCase {
  id: string;
  title: string;
  description: string;
  r: number;
  alpha: number;
  expectedArea: number;
  expectedPerimeter: number;
  expectedSectorArea: number;
}
