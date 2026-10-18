import React, { useState } from 'react';
import { X, Printer, Copy, Check, FileCheck, CheckCircle2, Award } from 'lucide-react';
import { TEST_CASES, PI_VAL } from '../utils/calculator';

interface HomeworkReportProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HomeworkReport: React.FC<HomeworkReportProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyReport = () => {
    const text = `
============================================================
              JAVA 101 ÖDEV TESLİM RAPORU
============================================================
Öğrenci / Geliştirici : Enes Öztürk
Ders                  : Java 101 - Temel Programlama
Ödev Konusu           : Dairenin Alanı, Çevresi ve Daire Dilimi Alanı
Pi Sabiti             : ${PI_VAL}

1. FORMÜLLER:
   - Daire Alanı         : Alan = π * r * r
   - Daire Çevresi        : Çevre = 2 * π * r
   - Daire Dilimi Alanı  : Dilim Alanı = (π * (r * r) * 𝛼) / 360

2. TEST SENARYOLARI VE DOĞRULAMA:
${TEST_CASES.map(
  (tc, idx) =>
    `   Test ${idx + 1}: r = ${tc.r}, 𝛼 = ${tc.alpha}° => Alan = ${tc.expectedArea}, Çevre = ${tc.expectedPerimeter}, Dilim Alanı = ${tc.expectedSectorArea}`
).join('\n')}

3. ALGORİTMA ADIMLARI:
   1. Scanner nesnesi ile kullanıcıdan yarıçap (r) ve merkez açı (𝛼) alınır.
   2. r < 0 veya 𝛼 < 0 || 𝛼 > 360 durumları için girdi doğrulaması yapılır.
   3. Alan = 3.14 * r * r hesaplanır.
   4. Çevre = 2 * 3.14 * r hesaplanır.
   5. Dilim Alanı = (3.14 * (r * r) * 𝛼) / 360.0 hesaplanır.
   6. printf ile 2 ondalık basamak hassasiyetle ekrana yazdırılır.

Hazırlayan: Enes Öztürk
============================================================
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">
                Java 101 Ödev Teslim Raporu
              </h2>
              <p className="text-xs text-amber-400/90 font-medium">
                Hazırlayan: Enes Öztürk
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyReport}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Kopyalandı</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Raporu Kopyala</span>
                </>
              )}
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-medium text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 font-semibold"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Yazdır / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Printable Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto text-slate-300 text-sm">
          {/* Cover Info Box */}
          <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">Öğrenci Adı:</span>
              <strong className="text-slate-100 text-sm">Enes Öztürk</strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Ders / Kurs:</span>
              <strong className="text-slate-100">Java 101</strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Programlama Dili:</span>
              <strong className="text-amber-400">Java (JDK 17+)</strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Kullanılan Pi (π):</span>
              <strong className="text-amber-400 font-mono">3.14 (Sabit)</strong>
            </div>
          </div>

          {/* Section 1: Problem Definition */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>1. Ödev Konusu ve İstenenler</span>
            </h3>
            <p className="text-slate-400 leading-relaxed text-xs sm:text-sm">
              Kullanıcıdan yarıçapını (<code className="text-amber-300 font-mono">r</code>) aldığımız dairenin alanını ve çevresini hesaplayan, ardından merkez açısının ölçüsü (<code className="text-amber-300 font-mono">𝛼</code>) verilen daire diliminin alanını bulan programın Java ile geliştirilmesi.
            </p>
          </div>

          {/* Section 2: Mathematical Formulas */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>2. Kullanılan Matematiksel Formüller</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Dairenin Alanı</span>
                <div className="font-mono text-sm text-slate-200">π * r * r</div>
                <div className="text-[11px] text-slate-400 mt-1">3.14 * r²</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Dairenin Çevresi</span>
                <div className="font-mono text-sm text-slate-200">2 * π * r</div>
                <div className="text-[11px] text-slate-400 mt-1">2 * 3.14 * r</div>
              </div>
              <div className="p-3 bg-amber-950/30 rounded-lg border border-amber-500/30">
                <span className="text-xs text-amber-400 block mb-1">Ödev: Dilim Alanı</span>
                <div className="font-mono text-sm text-amber-300">(π * (r*r) * 𝛼) / 360</div>
                <div className="text-[11px] text-amber-400/80 mt-1">Orantı: (𝛼 / 360) * Alan</div>
              </div>
            </div>
          </div>

          {/* Section 3: Test Scenarios */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>3. Test Senaryoları ve Doğrulama Matrisi</span>
            </h3>
            <div className="border border-slate-800 rounded-lg overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">Test No</th>
                    <th className="py-2.5 px-3">Yarıçap (r)</th>
                    <th className="py-2.5 px-3">Merkez Açı (𝛼)</th>
                    <th className="py-2.5 px-3">Daire Alanı</th>
                    <th className="py-2.5 px-3">Daire Çevresi</th>
                    <th className="py-2.5 px-3 text-amber-400">Dilim Alanı</th>
                    <th className="py-2.5 px-3 font-sans">Durum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  {TEST_CASES.map((tc, idx) => (
                    <tr key={tc.id} className="hover:bg-slate-950/40">
                      <td className="py-2.5 px-3 text-slate-400">Test {idx + 1}</td>
                      <td className="py-2.5 px-3 font-semibold">{tc.r}</td>
                      <td className="py-2.5 px-3 font-semibold">{tc.alpha}°</td>
                      <td className="py-2.5 px-3 tabular-nums">{tc.expectedArea.toFixed(2)}</td>
                      <td className="py-2.5 px-3 tabular-nums">{tc.expectedPerimeter.toFixed(2)}</td>
                      <td className="py-2.5 px-3 tabular-nums text-amber-300 font-bold">
                        {tc.expectedSectorArea.toFixed(2)}
                      </td>
                      <td className="py-2.5 px-3 font-sans">
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-medium text-[11px]">
                          <CheckCircle2 className="w-3 h-3" /> Doğrulandı
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Algorithm & Code Summary */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>4. Algoritma Mantığı ve Kod Mimarisi</span>
            </h3>
            <ol className="list-decimal list-inside space-y-1.5 text-xs sm:text-sm text-slate-400 leading-relaxed bg-slate-950/60 p-4 rounded-lg border border-slate-800">
              <li><strong className="text-slate-200">Girdi Alma:</strong> <code className="text-amber-300 font-mono">Scanner</code> sınıfı ile kullanıcıdan <code className="text-amber-300 font-mono">r</code> ve <code className="text-amber-300 font-mono">alpha</code> değerleri okunur.</li>
              <li><strong className="text-slate-200">Hata Yönetimi:</strong> Yarıçapın negatif olması veya açının [0, 360] dışında olması engellenerek kullanıcı uyarılır.</li>
              <li><strong className="text-slate-200">Hassas Hesaplama:</strong> Java'da tamsayı bölme hatasını önlemek adına 360 sabiti <code className="text-amber-300 font-mono">360.0</code> olarak kullanılır.</li>
              <li><strong className="text-slate-200">Formatlı Çıktı:</strong> <code className="text-amber-300 font-mono">System.out.printf</code> ile ondalık basamaklar iki haneli olarak estetik biçimde raporlanır.</li>
              <li><strong className="text-slate-200">İmza ve Tamamlama:</strong> Konsola geliştirici imzası <code className="text-amber-300 font-mono">Enes Öztürk</code> basılarak akış sonlandırılır.</li>
            </ol>
          </div>

          {/* Signature Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div>
              <span>Ödev Teslim Raporu</span>
              <span aria-hidden="true" className="mx-1 text-slate-600">·</span>
              <span>Java 101 Bitirme Projesi</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block text-[11px]">Öğrenci İmzası</span>
              <strong className="text-amber-400 text-sm font-semibold tracking-wide">
                Enes Öztürk
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
