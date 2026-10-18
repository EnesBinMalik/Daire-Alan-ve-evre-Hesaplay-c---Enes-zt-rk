import React, { useRef, useState, useCallback, useEffect } from 'react';
import { CircleCalculation } from '../types/circle';
import { RotateCw, Maximize2 } from 'lucide-react';

interface InteractiveCanvasProps {
  calc: CircleCalculation;
  onRadiusChange: (r: number) => void;
  onAlphaChange: (alpha: number) => void;
}

export const InteractiveCanvas: React.FC<InteractiveCanvasProps> = ({
  calc,
  onRadiusChange,
  onAlphaChange,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [isDraggingAlpha, setIsDraggingAlpha] = useState(false);
  const [isHoveringCanvas, setIsHoveringCanvas] = useState(false);

  const cx = 200;
  const cy = 200;
  const visualRadius = 140; // Fixed visual radius on SVG stage

  // Calculate sector arc points in mathematical counter-clockwise Cartesian coordinates
  const alphaRad = (calc.alpha * Math.PI) / 180;
  const x1 = cx + visualRadius; // at 0 degrees (pointing right)
  const y1 = cy;
  const x2 = cx + visualRadius * Math.cos(alphaRad);
  const y2 = cy - visualRadius * Math.sin(alphaRad); // - for screen Y inverted

  const largeArcFlag = calc.alpha > 180 ? 1 : 0;

  let sectorPath = '';
  if (calc.alpha <= 0.1) {
    sectorPath = '';
  } else if (calc.alpha >= 359.9) {
    sectorPath = `M ${cx - visualRadius} ${cy} A ${visualRadius} ${visualRadius} 0 1 0 ${cx + visualRadius} ${cy} A ${visualRadius} ${visualRadius} 0 1 0 ${cx - visualRadius} ${cy}`;
  } else {
    // M cx cy L x1 y1 A r r 0 largeArc 0 x2 y2 Z (sweep=0 for inverted Y axis CCW)
    sectorPath = `M ${cx} ${cy} L ${x1} ${y1} A ${visualRadius} ${visualRadius} 0 ${largeArcFlag} 0 ${x2} ${y2} Z`;
  }

  // Inner angle indicator arc (radius 36)
  const innerR = 38;
  const ix1 = cx + innerR;
  const iy1 = cy;
  const ix2 = cx + innerR * Math.cos(alphaRad);
  const iy2 = cy - innerR * Math.sin(alphaRad);
  const innerArcPath =
    calc.alpha > 0.1 && calc.alpha < 360
      ? `M ${ix1} ${iy1} A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${ix2} ${iy2}`
      : '';

  // Calculate angle label position at bisector
  const midAlphaRad = (calc.alpha / 2) * (Math.PI / 180);
  const labelDist = Math.min(innerR + 24, visualRadius - 20);
  const labelX = cx + labelDist * Math.cos(midAlphaRad);
  const labelY = cy - labelDist * Math.sin(midAlphaRad);

  // Handle pointer dragging to interactively adjust angle
  const handlePointerMove = useCallback(
    (e: PointerEvent | React.PointerEvent) => {
      if (!isDraggingAlpha || !svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      
      // Convert to SVG coordinates (SVG viewBox is 0 0 400 400)
      const scaleX = 400 / rect.width;
      const scaleY = 400 / rect.height;
      const svgX = px * scaleX;
      const svgY = py * scaleY;

      const dx = svgX - cx;
      const dy = -(svgY - cy); // inverted Y
      let angle = Math.atan2(dy, dx) * (180 / Math.PI);
      if (angle < 0) angle += 360;
      onAlphaChange(Math.round(angle));
    },
    [isDraggingAlpha, onAlphaChange]
  );

  const handlePointerUp = useCallback(() => {
    setIsDraggingAlpha(false);
  }, []);

  useEffect(() => {
    if (isDraggingAlpha) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
      };
    }
  }, [isDraggingAlpha, handlePointerMove, handlePointerUp]);

  return (
    <div className="flex flex-col h-full">
      {/* Visual Canvas Stage */}
      <div 
        className="relative bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center overflow-hidden select-none"
        onMouseEnter={() => setIsHoveringCanvas(true)}
        onMouseLeave={() => setIsHoveringCanvas(false)}
      >
        {/* Subtle coordinate grid background lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-25 pointer-events-none" />

        {/* Legend pills (unboxed text per anti-slop guidelines) */}
        <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2 z-10">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-amber-400" />
            <span className="font-medium text-slate-300">Daire Dilimi (𝛼)</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">%{calc.sectorPercentage.toFixed(1)} pay</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <span>O(0,0) Merkez</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-amber-400/90 font-mono">π = 3.14</span>
          </div>
        </div>

        {/* Interactive SVG Diagram */}
        <div className="relative w-full max-w-[380px] aspect-square flex items-center justify-center">
          <svg
            ref={svgRef}
            viewBox="0 0 400 400"
            className="w-full h-full touch-none"
            style={{ filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.4))' }}
          >
            <defs>
              {/* Radial gradient for the active sector */}
              <radialGradient id="sectorGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0.15" />
              </radialGradient>
              {/* Glow filter */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Cartesian Axes */}
            <line x1="30" y1="200" x2="370" y2="200" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="200" y1="30" x2="200" y2="370" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />

            {/* Full Base Circle */}
            <circle
              cx={cx}
              cy={cy}
              r={visualRadius}
              fill="#0f172a"
              fillOpacity="0.6"
              stroke="#475569"
              strokeWidth="2"
              strokeDasharray="6 4"
            />

            {/* Active Circular Sector (Daire Dilimi) */}
            {sectorPath && (
              <path
                d={sectorPath}
                fill="url(#sectorGradient)"
                stroke="#f59e0b"
                strokeWidth="2.5"
                className="transition-all duration-75"
              />
            )}

            {/* Arc highlight along perimeter for sector */}
            {calc.alpha > 0.5 && calc.alpha < 360 && (
              <path
                d={`M ${x1} ${y1} A ${visualRadius} ${visualRadius} 0 ${largeArcFlag} 0 ${x2} ${y2}`}
                fill="none"
                stroke="#fbbf24"
                strokeWidth="4"
                filter="url(#glow)"
              />
            )}

            {/* Angle Indicator Arc */}
            {innerArcPath && (
              <path
                d={innerArcPath}
                fill="none"
                stroke="#fcd34d"
                strokeWidth="2"
                strokeDasharray="2 2"
              />
            )}

            {/* Angle Value Text Label */}
            {calc.alpha > 12 && (
              <text
                x={labelX}
                y={labelY + 4}
                textAnchor="middle"
                fill="#fde68a"
                fontSize="12"
                fontWeight="700"
                fontFamily="JetBrains Mono"
                className="pointer-events-none select-none"
              >
                {calc.alpha}°
              </text>
            )}

            {/* Radius line 1 (Baseline r on X axis) */}
            <line
              x1={cx}
              y1={cy}
              x2={x1}
              y2={y1}
              stroke="#94a3b8"
              strokeWidth="2"
            />
            {/* Radius label */}
            <text
              x={cx + visualRadius / 2}
              y={cy + 18}
              textAnchor="middle"
              fill="#cbd5e1"
              fontSize="12"
              fontWeight="600"
              fontFamily="JetBrains Mono"
            >
              r = {calc.radius}
            </text>

            {/* Radius line 2 (Angle sweep line to x2, y2) */}
            {calc.alpha > 0 && calc.alpha < 360 && (
              <line
                x1={cx}
                y1={cy}
                x2={x2}
                y2={y2}
                stroke="#f59e0b"
                strokeWidth="2"
              />
            )}

            {/* Center point O */}
            <circle cx={cx} cy={cy} r="5" fill="#f8fafc" stroke="#f59e0b" strokeWidth="2" />
            <text
              x={cx - 12}
              y={cy - 10}
              fill="#94a3b8"
              fontSize="11"
              fontWeight="600"
            >
              O
            </text>

            {/* Interactive Angle Drag Handle on perimeter */}
            <g
              transform={`translate(${x2}, ${y2})`}
              className="cursor-grab active:cursor-grabbing"
              onPointerDown={(e) => {
                e.stopPropagation();
                setIsDraggingAlpha(true);
              }}
            >
              <circle r="14" fill="#f59e0b" fillOpacity="0.25" className="animate-ping" />
              <circle r="9" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
              <circle r="3" fill="#ffffff" />
            </g>
          </svg>

          {/* Drag instruction overlay hint */}
          <div className="absolute bottom-2 text-center text-[11px] text-slate-400 pointer-events-none">
            {isHoveringCanvas ? 'Turuncu noktayı çevirerek açıyı değiştirebilirsiniz' : 'İnteraktif Çizim'}
          </div>
        </div>

        {/* Quick Angle Presets bar */}
        <div className="w-full mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-1 overflow-x-auto">
          {[
            { label: '30°', val: 30, name: '1/12' },
            { label: '45°', val: 45, name: '1/8' },
            { label: '60°', val: 60, name: '1/6' },
            { label: '90°', val: 90, name: 'Çeyrek' },
            { label: '120°', val: 120, name: '1/3' },
            { label: '180°', val: 180, name: 'Yarım' },
            { label: '270°', val: 270, name: '3/4' },
            { label: '360°', val: 360, name: 'Tam' },
          ].map((preset) => (
            <button
              key={preset.val}
              onClick={() => onAlphaChange(preset.val)}
              className={`px-2.5 py-1 text-xs font-mono font-medium rounded transition-all whitespace-nowrap shrink-0 ${
                calc.alpha === preset.val
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
              title={`${preset.name} (${preset.label})`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Real-time Slider Controls */}
      <div className="mt-4 bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4">
        {/* Radius Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <label htmlFor="radius-slider" className="font-medium text-slate-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono text-amber-400 font-bold">
                r
              </span>
              <span>Dairenin Yarıçapı (r)</span>
            </label>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min="0.1"
                max="100"
                step="0.5"
                value={calc.radius}
                onChange={(e) => onRadiusChange(parseFloat(e.target.value) || 0)}
                className="w-18 px-2 py-0.5 text-right font-mono text-sm bg-slate-950 border border-slate-700 rounded text-amber-400 font-semibold focus:outline-none focus:border-amber-400"
              />
              <span className="text-xs text-slate-400">birim</span>
            </div>
          </div>
          <input
            id="radius-slider"
            type="range"
            min="1"
            max="50"
            step="0.5"
            value={calc.radius}
            onChange={(e) => onRadiusChange(parseFloat(e.target.value))}
            className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>1 birim</span>
            <span>25 birim</span>
            <span>50 birim</span>
          </div>
        </div>

        {/* Central Angle (Alpha) Slider */}
        <div className="space-y-1.5 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between text-sm">
            <label htmlFor="alpha-slider" className="font-medium text-slate-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono text-amber-400 font-bold">
                𝛼
              </span>
              <span>Merkez Açı Ölçüsü (𝛼)</span>
            </label>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min="0"
                max="360"
                step="1"
                value={calc.alpha}
                onChange={(e) => onAlphaChange(parseFloat(e.target.value) || 0)}
                className="w-18 px-2 py-0.5 text-right font-mono text-sm bg-slate-950 border border-slate-700 rounded text-amber-400 font-semibold focus:outline-none focus:border-amber-400"
              />
              <span className="text-xs text-slate-400">derece (°)</span>
            </div>
          </div>
          <input
            id="alpha-slider"
            type="range"
            min="0"
            max="360"
            step="1"
            value={calc.alpha}
            onChange={(e) => onAlphaChange(parseFloat(e.target.value))}
            className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>0°</span>
            <span>90° (Çeyrek)</span>
            <span>180° (Yarım)</span>
            <span>270°</span>
            <span>360° (Tam)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
