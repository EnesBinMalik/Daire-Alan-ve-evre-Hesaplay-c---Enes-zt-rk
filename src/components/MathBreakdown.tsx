import React from 'react';
import { CircleCalculation } from '../types/circle';
import { Calculator, Sparkles, CheckCircle2 } from 'lucide-react';

interface MathBreakdownProps {
  calc: CircleCalculation;
}

export const MathBreakdown: React.FC<MathBreakdownProps> = ({ calc }) => {
  return (
    <div className="space-y-4">
      {/* KPI Result Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Full Area Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 relative overflow-hidden">
          <div className="text-xs text-slate-400 font-medium flex items-center justify-between mb-1">
            <span>Dairenin Alanı</span>
            <span className="font-mono text-[11px] text-slate-400">π * r²</span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-100 tabular-nums">
            {calc.area.toFixed(2)}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {calc.pi} × ({calc.radius})²
          </div>
        </div>

        {/* Perimeter Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 relative overflow-hidden">
          <div className="text-xs text-slate-400 font-medium flex items-center justify-between mb-1">
            <span>Dairenin Çevresi</span>
            <span className="font-mono text-[11px] text-slate-400">2 * π * r</span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-100 tabular-nums">
            {calc.perimeter.toFixed(2)}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            2 × {calc.pi} × {calc.radius}
          </div>
        </div>

        {/* Sector Area Card (Target Assignment) */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4 relative overflow-hidden">
          <div className="text-xs text-amber-400 font-medium flex items-center justify-between mb-1">
            <span className="flex items-center gap-1.5">
              <span>Daire Diliminin Alanı</span>
            </span>
            <span className="font-mono text-[11px] text-amber-400/80">(π*r²*𝛼)/360</span>
          </div>
          <div className="text-2xl font-bold font-mono text-amber-300 tabular-nums">
            {calc.sectorArea.toFixed(2)}
          </div>
          <div className="text-xs text-amber-400/80 mt-1 flex items-center justify-between">
            <span>{calc.alpha}° Merkez Açı</span>
            <span className="font-mono">%{calc.sectorPercentage.toFixed(1)} pay</span>
          </div>
        </div>
      </div>

      {/* Step-by-Step Mathematical Computation Accordion / Cards */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-semibold text-slate-100">
              Adım Adım Matematiksel Hesaplama
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Ödev formüllerine göre sayıların yerine konulması ve işlem sırası
            </p>
          </div>
          <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
            <span>Sabit: π = 3.14</span>
          </div>
        </div>

        <div className="space-y-3">
          {/* 1. Daire Alanı Adımı */}
          <div className="p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-lg">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
              <span className="font-semibold text-slate-300">1. Dairenin Alanı</span>
              <span className="font-mono text-amber-400/80">Alan = π * r * r</span>
            </div>
            <div className="font-mono text-xs sm:text-sm text-slate-200 bg-slate-900/90 p-2.5 rounded border border-slate-800 overflow-x-auto">
              {calc.calculationSteps.areaStep}
            </div>
          </div>

          {/* 2. Daire Çevresi Adımı */}
          <div className="p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-lg">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
              <span className="font-semibold text-slate-300">2. Dairenin Çevresi</span>
              <span className="font-mono text-amber-400/80">Çevre = 2 * π * r</span>
            </div>
            <div className="font-mono text-xs sm:text-sm text-slate-200 bg-slate-900/90 p-2.5 rounded border border-slate-800 overflow-x-auto">
              {calc.calculationSteps.perimeterStep}
            </div>
          </div>

          {/* 3. Daire Dilimi Alanı Adımı (Ödev) */}
          <div className="p-3.5 bg-amber-950/15 border border-amber-500/20 rounded-lg">
            <div className="flex items-center justify-between text-xs text-amber-400 mb-1.5">
              <span className="font-semibold text-amber-300">3. Ödev: Daire Diliminin Alanı</span>
              <span className="font-mono text-amber-400">Dilim Alanı = (π * (r*r) * 𝛼) / 360</span>
            </div>
            <div className="font-mono text-xs sm:text-sm text-amber-200 bg-slate-900/90 p-2.5 rounded border border-amber-500/30 overflow-x-auto">
              {calc.calculationSteps.sectorAreaStep}
            </div>
            <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                360 derecelik tam daire alanı {calc.area.toFixed(2)} iken, {calc.alpha} derecelik dilim {(calc.alpha / 360).toFixed(4)} katına yani {calc.sectorArea.toFixed(2)} birimkareye eşittir.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
