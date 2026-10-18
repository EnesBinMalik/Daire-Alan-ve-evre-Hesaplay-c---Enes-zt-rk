import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Play, RotateCcw, Copy, Check, CornerDownLeft } from 'lucide-react';
import { PI_VAL } from '../utils/calculator';

interface JavaConsoleSimulatorProps {
  currentRadius: number;
  currentAlpha: number;
}

interface TerminalStep {
  text: string;
  type: 'system' | 'prompt' | 'input' | 'output' | 'success' | 'error';
}

export const JavaConsoleSimulator: React.FC<JavaConsoleSimulatorProps> = ({
  currentRadius,
  currentAlpha,
}) => {
  const [terminalHistory, setTerminalHistory] = useState<TerminalStep[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [stage, setStage] = useState<'idle' | 'waiting_r' | 'waiting_alpha' | 'done'>('idle');
  const [tempR, setTempR] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const startInteractiveRun = () => {
    setTerminalHistory([
      { text: '$ javac Main.java', type: 'system' },
      { text: '$ java Main', type: 'system' },
      { text: '==================================================', type: 'system' },
      { text: '  DAİRE VE DAİRE DİLİMİ ALANI HESAPLAMA PROGRAMI  ', type: 'system' },
      { text: '            Hazırlayan: Enes Öztürk               ', type: 'system' },
      { text: '==================================================', type: 'system' },
      { text: 'Lütfen dairenin yarıçapını (r) giriniz: ', type: 'prompt' },
    ]);
    setStage('waiting_r');
    setTempR(null);
    setInputVal('');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const runWithValues = (r: number, alpha: number) => {
    const alan = PI_VAL * r * r;
    const cevre = 2 * PI_VAL * r;
    const dilimAlani = (PI_VAL * (r * r) * alpha) / 360.0;

    setTerminalHistory([
      { text: '$ javac Main.java', type: 'system' },
      { text: '$ java Main', type: 'system' },
      { text: '==================================================', type: 'system' },
      { text: '  DAİRE VE DAİRE DİLİMİ ALANI HESAPLAMA PROGRAMI  ', type: 'system' },
      { text: '            Hazırlayan: Enes Öztürk               ', type: 'system' },
      { text: '==================================================', type: 'system' },
      { text: `Lütfen dairenin yarıçapını (r) giriniz: ${r}`, type: 'input' },
      { text: `Lütfen merkez açısının ölçüsünü (𝛼) giriniz (0-360): ${alpha}`, type: 'input' },
      { text: '\n------------------ HESAPLAMA SONUÇLARI ------------------', type: 'output' },
      { text: `Dairenin Yarıçapı (r)       : ${r.toFixed(2)}`, type: 'output' },
      { text: `Merkez Açı Ölçüsü (𝛼)      : ${alpha.toFixed(2)}°`, type: 'output' },
      { text: `Kullanılan Pi (π) Değeri    : ${PI_VAL.toFixed(2)}`, type: 'output' },
      { text: '---------------------------------------------------------', type: 'output' },
      { text: `1. Dairenin Toplam Alanı    : ${alan.toFixed(2)}`, type: 'success' },
      { text: `2. Dairenin Çevresi         : ${cevre.toFixed(2)}`, type: 'success' },
      { text: `3. Daire Diliminin Alanı    : ${dilimAlani.toFixed(2)}`, type: 'success' },
      { text: '=========================================================', type: 'output' },
      { text: 'Hesaplama başarıyla tamamlandı. - Enes Öztürk', type: 'system' },
      { text: 'Process finished with exit code 0', type: 'system' },
    ]);
    setStage('done');
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = inputVal.trim();
    if (!val) return;

    const num = parseFloat(val);
    if (isNaN(num)) {
      setTerminalHistory((prev) => [
        ...prev,
        { text: val, type: 'input' },
        { text: 'Hata: Lütfen geçerli bir sayısal değer giriniz!', type: 'error' },
      ]);
      setInputVal('');
      return;
    }

    if (stage === 'waiting_r') {
      if (num < 0) {
        setTerminalHistory((prev) => [
          ...prev,
          { text: val, type: 'input' },
          { text: 'Hata: Yarıçap negatif olamaz! Lütfen pozitif bir değer giriniz.', type: 'error' },
          { text: 'Lütfen dairenin yarıçapını (r) giriniz: ', type: 'prompt' },
        ]);
        setInputVal('');
        return;
      }
      setTempR(num);
      setTerminalHistory((prev) => [
        ...prev,
        { text: `${val}`, type: 'input' },
        { text: 'Lütfen merkez açısının ölçüsünü (𝛼) giriniz (0-360): ', type: 'prompt' },
      ]);
      setStage('waiting_alpha');
      setInputVal('');
    } else if (stage === 'waiting_alpha') {
      if (num < 0 || num > 360) {
        setTerminalHistory((prev) => [
          ...prev,
          { text: val, type: 'input' },
          { text: 'Hata: Merkez açı 0 ile 360 derece arasında olmalıdır!', type: 'error' },
          { text: 'Lütfen merkez açısının ölçüsünü (𝛼) giriniz (0-360): ', type: 'prompt' },
        ]);
        setInputVal('');
        return;
      }

      const r = tempR ?? 5;
      const alpha = num;
      const alan = PI_VAL * r * r;
      const cevre = 2 * PI_VAL * r;
      const dilimAlani = (PI_VAL * (r * r) * alpha) / 360.0;

      setTerminalHistory((prev) => [
        ...prev,
        { text: `${val}`, type: 'input' },
        { text: '\n------------------ HESAPLAMA SONUÇLARI ------------------', type: 'output' },
        { text: `Dairenin Yarıçapı (r)       : ${r.toFixed(2)}`, type: 'output' },
        { text: `Merkez Açı Ölçüsü (𝛼)      : ${alpha.toFixed(2)}°`, type: 'output' },
        { text: `Kullanılan Pi (π) Değeri    : ${PI_VAL.toFixed(2)}`, type: 'output' },
        { text: '---------------------------------------------------------', type: 'output' },
        { text: `1. Dairenin Toplam Alanı    : ${alan.toFixed(2)}`, type: 'success' },
        { text: `2. Dairenin Çevresi         : ${cevre.toFixed(2)}`, type: 'success' },
        { text: `3. Daire Diliminin Alanı    : ${dilimAlani.toFixed(2)}`, type: 'success' },
        { text: '=========================================================', type: 'output' },
        { text: 'Hesaplama başarıyla tamamlandı. - Enes Öztürk', type: 'system' },
        { text: 'Process finished with exit code 0', type: 'system' },
      ]);
      setStage('done');
      setInputVal('');
    }
  };

  useEffect(() => {
    // Initial run with default values
    runWithValues(currentRadius, currentAlpha);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const handleCopyOutput = () => {
    const raw = terminalHistory.map((item) => item.text).join('\n');
    navigator.clipboard.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-slate-400 font-sans text-xs ml-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>Java Terminal Simulator (OpenJDK 17)</span>
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => runWithValues(currentRadius, currentAlpha)}
            className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30 transition-colors flex items-center gap-1 text-[11px] font-sans font-medium"
            title="Mevcut r ve 𝛼 değerleri ile doğrudan çalıştır"
          >
            <Play className="w-3 h-3" />
            <span>Mevcut Değerlerle Çalıştır</span>
          </button>
          <button
            onClick={startInteractiveRun}
            className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors flex items-center gap-1 text-[11px] font-sans font-medium"
            title="Terminalde elle adım adım giriş yap"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Etkileşimli Yeniden Başlat</span>
          </button>
          <button
            onClick={handleCopyOutput}
            className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Konsol çıktısını kopyala"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Screen Body */}
      <div 
        onClick={() => inputRef.current?.focus()} 
        className="p-4 bg-slate-950 text-slate-300 min-h-[340px] max-h-[460px] overflow-y-auto cursor-text space-y-1"
      >
        {terminalHistory.map((line, idx) => {
          let style = 'text-slate-300';
          if (line.type === 'system') style = 'text-slate-500';
          if (line.type === 'prompt') style = 'text-sky-300 font-semibold';
          if (line.type === 'input') style = 'text-emerald-400 font-bold';
          if (line.type === 'success') style = 'text-amber-300 font-semibold';
          if (line.type === 'error') style = 'text-rose-400 font-bold';

          return (
            <div key={idx} className={`leading-relaxed whitespace-pre-wrap ${style}`}>
              {line.text}
            </div>
          );
        })}

        {/* Active interactive prompt line */}
        {(stage === 'waiting_r' || stage === 'waiting_alpha') && (
          <form onSubmit={handleInputSubmit} className="flex items-center gap-1 pt-1">
            <span className="text-sky-400 font-semibold">
              {stage === 'waiting_r' ? 'yarıçap (r) > ' : 'merkez açı (𝛼) > '}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Sayı girip Enter'a basınız"
              className="bg-transparent border-none text-emerald-400 font-bold focus:outline-none flex-1 font-mono text-xs placeholder:text-slate-600"
              autoFocus
            />
            <button
              type="submit"
              className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-sans flex items-center gap-1"
            >
              <span>Enter</span>
              <CornerDownLeft className="w-2.5 h-2.5" />
            </button>
          </form>
        )}

        {stage === 'done' && (
          <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-2 font-sans border-t border-slate-900 mt-2">
            <span>Terminal hazır. Farklı değerler denemek için üstteki butonları kullanabilirsiniz.</span>
          </div>
        )}

        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};
