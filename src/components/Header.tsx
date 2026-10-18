import React from 'react';
import { Download, Code2, Check, FileText } from 'lucide-react';
import { MAIN_JAVA_CODE } from '../utils/calculator';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenReport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenReport,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(MAIN_JAVA_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJava = () => {
    const element = document.createElement('a');
    const file = new Blob([MAIN_JAVA_CODE], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'Main.java';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title, one line wordmark */}
        <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-lg">
            π
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-100 text-base tracking-tight leading-none">
              Daire Hesaplayıcı
            </span>
            <span className="text-xs text-amber-400/90 font-medium">
              Enes Öztürk Ödevi
            </span>
          </div>
        </div>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'simulator'
                ? 'text-amber-400 border-b-2 border-amber-400'
                : 'hover:text-slate-200'
            }`}
          >
            Hesaplayıcı & Görsel
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'code'
                ? 'text-amber-400 border-b-2 border-amber-400'
                : 'hover:text-slate-200'
            }`}
          >
            Java Kaynak Kodları
          </button>
          <button
            onClick={() => setActiveTab('terminal')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'terminal'
                ? 'text-amber-400 border-b-2 border-amber-400'
                : 'hover:text-slate-200'
            }`}
          >
            Konsol Simülatörü
          </button>
          <button
            onClick={onOpenReport}
            className="flex items-center gap-1.5 whitespace-nowrap shrink-0 hover:text-slate-200 transition-colors py-1"
          >
            <FileText className="w-3.5 h-3.5" />
            Ödev Raporu
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleCopyCode}
            title="Java kodunu panoya kopyala"
            className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Kopyalandı</span>
              </>
            ) : (
              <>
                <Code2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Kodu Kopyala</span>
              </>
            )}
          </button>
          <button
            onClick={handleDownloadJava}
            title="Main.java dosyasını indir"
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm whitespace-nowrap shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Main.java İndir</span>
          </button>
        </div>
      </div>
    </header>
  );
};
