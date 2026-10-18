/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { InteractiveCanvas } from './components/InteractiveCanvas';
import { MathBreakdown } from './components/MathBreakdown';
import { JavaCodeViewer } from './components/JavaCodeViewer';
import { JavaConsoleSimulator } from './components/JavaConsoleSimulator';
import { HomeworkReport } from './components/HomeworkReport';
import { computeCircle, TEST_CASES, PI_VAL } from './utils/calculator';
import {
  Code2,
  Terminal,
  Calculator,
  Compass,
  BookOpen,
  FileText,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'code' | 'terminal'>('simulator');
  const [radius, setRadius] = useState<number>(5);
  const [alpha, setAlpha] = useState<number>(60);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);

  const calc = computeCircle(radius, alpha);

  const handleApplyTestCase = (r: number, a: number) => {
    setRadius(r);
    setAlpha(a);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar Header adhering strictly to Top Bar Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => setActiveTab(tab as 'simulator' | 'code' | 'terminal')}
        onOpenReport={() => setIsReportOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Editorial Hero Header */}
        <div className="space-y-2 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span>Java 101 Programlama</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Daire Alanı & Çevresi Ödevi</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-amber-400">Hazırlayan: Enes Öztürk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100 text-balance">
            Dairenin Alanını, Çevresini ve Daire Dilimi Alanını Hesaplayan Program
          </h1>
          <p className="text-slate-400 text-sm max-w-3xl leading-relaxed">
            Java ile kullanıcıdan yarıçapını (<code className="text-amber-300 font-mono">r</code>) aldığımız dairenin alanını ve çevresini, merkez açısının ölçüsü (<code className="text-amber-300 font-mono">𝛼</code>) olan daire diliminin alanını <code className="text-amber-300 font-mono">π = 3.14</code> kabul ederek hesaplayan etkileşimli çalışma ortamı.
          </p>
        </div>

        {/* View Switcher Tabs (Segmented Controls) */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
                activeTab === 'simulator'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Görsel Simülatör & Hesaplama</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
                activeTab === 'code'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Java Kaynak Kodları</span>
            </button>
            <button
              onClick={() => setActiveTab('terminal')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
                activeTab === 'terminal'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>Konsol (Terminal) Simülatörü</span>
            </button>
          </div>

          {/* Test Case Quick Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap shrink-0">
              Hazır Testler:
            </span>
            {TEST_CASES.map((tc, idx) => (
              <button
                key={tc.id}
                onClick={() => handleApplyTestCase(tc.r, tc.alpha)}
                className={`px-2.5 py-1 text-xs rounded border transition-colors whitespace-nowrap shrink-0 ${
                  radius === tc.r && alpha === tc.alpha
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-medium'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
                title={tc.description}
              >
                Test {idx + 1} (r={tc.r}, 𝛼={tc.alpha}°)
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Interactive Stage & Calculation Breakdown */}
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Interactive Diagram & Sliders */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-400" />
                    <span>Daire ve Dilim Görseli</span>
                  </h2>
                  <span className="text-xs text-slate-400 font-mono">
                    r = {radius} · 𝛼 = {alpha}°
                  </span>
                </div>
                <InteractiveCanvas
                  calc={calc}
                  onRadiusChange={setRadius}
                  onAlphaChange={setAlpha}
                />
              </div>
            </div>

            {/* Right Column: Step-by-Step Math Breakdown */}
            <div className="lg:col-span-6 space-y-6">
              <MathBreakdown calc={calc} />

              {/* Assignment Formula Explainer Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>Ödev Formülünün Mantığı ve İspatı</span>
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Daire diliminin alanı, tam daire alanının merkez açı oranına bağlıdır. Bir tam dairenin merkez açısı <strong className="text-slate-300 font-mono">360°</strong> olup toplam alanı <strong className="text-slate-300 font-mono">π * r²</strong>'dir.
                </p>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-amber-300 space-y-1">
                  <div>360°'lik tam daire alanı  ➔  π * r²</div>
                  <div>𝛼°'lik daire dilimi alanı ➔  X</div>
                  <div className="text-slate-400 pt-1 border-t border-slate-800">
                    İçler dışlar çarpımı ile: X = (π * r² * 𝛼) / 360
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-400">
                    Ödev gereği π = {PI_VAL} alınmıştır.
                  </span>
                  <button
                    onClick={() => setIsReportOpen(true)}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Ödev Raporunu Görüntüle</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Java Source Code Viewer */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <JavaCodeViewer />
          </div>
        )}

        {/* Tab 3: Java Console Simulator */}
        {activeTab === 'terminal' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span>Java Konsol (CLI) Çalışma Ortamı</span>
              </h2>
              <p className="text-xs text-slate-400">
                Bu simülatör, yazdığınız Java kodunun gerçek bir terminal penceresinde nasıl derlenip (<code className="text-amber-300 font-mono">javac Main.java</code>) ve çalıştırıldığını (<code className="text-amber-300 font-mono">java Main</code>) birebir taklit eder. Kullanıcıdan <code className="text-amber-300 font-mono">Scanner</code> ile klavyeden veri alır ve formatlı çıktı verir.
              </p>
            </div>
            <JavaConsoleSimulator currentRadius={radius} currentAlpha={alpha} />
          </div>
        )}

        {/* Academic / Assignment Summary Block */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Ödev Özeti ve Enes Öztürk İmzası
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Patika.dev Java 101 Temel Kavramlar ve Değişkenler Bölümü Bitirme Ödevi
              </p>
            </div>
            <button
              onClick={() => setIsReportOpen(true)}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resmi Ödev Teslim Raporu</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1.5">
              <span className="text-amber-400 font-semibold block">Temel Görev</span>
              <p className="text-slate-400 leading-relaxed">
                Kullanıcıdan yarıçap (<code className="text-amber-300 font-mono">r</code>) değeri alınarak dairenin toplam alanı (<code className="text-amber-300 font-mono">π * r * r</code>) ve çevresi (<code className="text-amber-300 font-mono">2 * π * r</code>) hesaplanmıştır.
              </p>
            </div>
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1.5">
              <span className="text-amber-400 font-semibold block">Ek Ödev (Daire Dilimi)</span>
              <p className="text-slate-400 leading-relaxed">
                Yarıçapı <code className="text-amber-300 font-mono">r</code>, merkez açısı <code className="text-amber-300 font-mono">𝛼</code> olan daire diliminin alanı <code className="text-amber-300 font-mono">(π * (r*r) * 𝛼) / 360</code> formülü ile eksiksiz olarak hesaplanmıştır.
              </p>
            </div>
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1.5">
              <span className="text-amber-400 font-semibold block">Sabit ve Koşullar</span>
              <p className="text-slate-400 leading-relaxed">
                Ödev yönergesine tam uyum sağlamak üzere <code className="text-amber-300 font-mono">π = 3.14</code> sabit değeri kullanılmış, negatif yarıçap ve açı sınırları denetlenmiştir.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Java Daire ve Dilim Alanı Hesaplayıcı</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>Hazırlayan: <strong className="text-amber-400">Enes Öztürk</strong></span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Formül: (π * r² * 𝛼) / 360</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="font-mono">π = 3.14</span>
          </div>
        </div>
      </footer>

      {/* Homework Report Modal */}
      <HomeworkReport
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
    </div>
  );
}
