import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, CheckCircle2 } from 'lucide-react';
import { MAIN_JAVA_CODE, MODULAR_JAVA_CODE, OOP_JAVA_CODE } from '../utils/calculator';

export const JavaCodeViewer: React.FC = () => {
  const [activeCodeTab, setActiveCodeTab] = useState<'main' | 'modular' | 'oop'>('main');
  const [copied, setCopied] = useState(false);

  const getActiveCode = () => {
    switch (activeCodeTab) {
      case 'main':
        return { code: MAIN_JAVA_CODE, filename: 'Main.java', title: 'Standart Ödev Çözümü' };
      case 'modular':
        return { code: MODULAR_JAVA_CODE, filename: 'DaireHesaplayici.java', title: 'Metotlu (Modüler) Çözüm' };
      case 'oop':
        return { code: OOP_JAVA_CODE, filename: 'OOPMain.java', title: 'Nesne Yönelimli (OOP) Çözüm' };
    }
  };

  const { code, filename, title } = getActiveCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const lines = code.split('\n');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
      {/* Code Viewer Header */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        {/* Code tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg">
          <button
            onClick={() => setActiveCodeTab('main')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeCodeTab === 'main'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Main.java (Ödev Çözümü)
          </button>
          <button
            onClick={() => setActiveCodeTab('modular')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeCodeTab === 'modular'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            DaireHesaplayici.java (Metotlu)
          </button>
          <button
            onClick={() => setActiveCodeTab('oop')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeCodeTab === 'oop'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            OOPMain.java (Sınıf & Nesne)
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Kodu Kopyala</span>
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 text-xs font-medium text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 font-semibold whitespace-nowrap shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{filename} İndir</span>
          </button>
        </div>
      </div>

      {/* Code Meta Kicker */}
      <div className="px-4 py-2 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-amber-400" />
          <span className="font-mono text-slate-300">{filename}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Geliştirici: <strong className="text-slate-200 font-semibold">Enes Öztürk</strong></span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Java 17+ Uyumlu</span>
        </div>
      </div>

      {/* Code Editor Container */}
      <div className="bg-slate-950 p-4 overflow-x-auto max-h-[520px] select-text">
        <pre className="font-mono text-xs leading-relaxed">
          <code>
            {lines.map((line, idx) => {
              // Basic syntax highlight coloring
              let lineStyle = 'text-slate-300';
              if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
                lineStyle = 'text-emerald-400/80 italic';
              } else if (line.includes('import ') || line.includes('public class ') || line.includes('class ') || line.includes('return') || line.includes('if ') || line.includes('final double')) {
                lineStyle = 'text-amber-400';
              } else if (line.includes('System.out.print') || line.includes('System.out.println') || line.includes('System.out.printf')) {
                lineStyle = 'text-sky-300';
              } else if (line.includes('Enes Öztürk')) {
                lineStyle = 'text-amber-300 font-bold';
              }

              return (
                <div key={idx} className="table-row hover:bg-slate-900/50">
                  <span className="table-cell select-none pr-4 text-right text-slate-600 text-[11px] w-10">
                    {idx + 1}
                  </span>
                  <span className={`table-cell whitespace-pre ${lineStyle}`}>
                    {line}
                  </span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>

      {/* Code Explanation & Tips */}
      <div className="p-4 bg-slate-900/90 border-t border-slate-800 text-xs text-slate-400 space-y-2">
        <div className="font-medium text-slate-300 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Java Ödevi İçin Önemli Teknik Notlar:</span>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-400 pt-1">
          <li className="flex items-start gap-1.5">
            <span className="text-amber-400 font-mono shrink-0">•</span>
            <span><strong>360.0 ile Bölme:</strong> Tamsayı bölmesi (integer division) hatası yaşamamak için bölen <code className="text-amber-300 font-mono">360.0</code> olarak double cinsinden yazılmıştır.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-amber-400 font-mono shrink-0">•</span>
            <span><strong>Scanner Kapatma:</strong> Bellek sızıntısını önlemek için program sonunda <code className="text-amber-300 font-mono">scanner.close()</code> çağrısı eklenmiştir.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-amber-400 font-mono shrink-0">•</span>
            <span><strong>Girdi Kontrolü:</strong> Negatif yarıçap veya [0, 360] aralığı dışındaki açılar için koruma blokları eklenmiştir.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-amber-400 font-mono shrink-0">•</span>
            <span><strong>Formatlı Yazdırma:</strong> Çıktılar virgülden sonra 2 basamak gösterecek biçimde <code className="text-amber-300 font-mono">printf("%.2f")</code> ile biçimlendirilmiştir.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
