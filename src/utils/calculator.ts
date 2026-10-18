import { CircleCalculation, TestCase } from '../types/circle';

export const PI_VAL = 3.14;

export function computeCircle(radius: number, alpha: number): CircleCalculation {
  const r = Math.max(0, radius);
  const a = Math.max(0, Math.min(360, alpha));
  const pi = PI_VAL;

  const area = pi * r * r;
  const perimeter = 2 * pi * r;
  const sectorArea = (pi * (r * r) * a) / 360;
  const arcLength = (2 * pi * r * a) / 360;
  const sectorPercentage = (a / 360) * 100;

  const rSquared = (r * r).toFixed(2);
  const piTimesRSquared = (pi * r * r).toFixed(2);

  const calculationSteps = {
    areaStep: `Alan = π * r * r = ${pi} * (${r})² = ${pi} * ${rSquared} = ${area.toFixed(2)}`,
    perimeterStep: `Çevre = 2 * π * r = 2 * ${pi} * ${r} = ${(2 * pi).toFixed(2)} * ${r} = ${perimeter.toFixed(2)}`,
    sectorAreaStep: `Dilim Alanı = (π * (r * r) * 𝛼) / 360 = (${pi} * ${rSquared} * ${a}) / 360 = (${piTimesRSquared} * ${a}) / 360 = ${((pi * r * r * a)).toFixed(2)} / 360 = ${sectorArea.toFixed(2)}`,
    arcLengthStep: `Yay Uzunluğu = (2 * π * r * 𝛼) / 360 = (${perimeter.toFixed(2)} * ${a}) / 360 = ${arcLength.toFixed(2)}`,
  };

  return {
    radius: r,
    alpha: a,
    pi,
    area,
    perimeter,
    sectorArea,
    arcLength,
    sectorPercentage,
    calculationSteps,
  };
}

export const TEST_CASES: TestCase[] = [
  {
    id: 'test-1',
    title: 'Örnek 1: Temel Ödev Değerleri',
    description: 'Yarıçap r = 5, Merkez Açı 𝛼 = 60° (Dairenin 1/6\'sı)',
    r: 5,
    alpha: 60,
    expectedArea: 78.5,
    expectedPerimeter: 31.4,
    expectedSectorArea: 13.08,
  },
  {
    id: 'test-2',
    title: 'Örnek 2: Çeyrek Daire',
    description: 'Yarıçap r = 10, Merkez Açı 𝛼 = 90° (Dairenin 1/4\'ü)',
    r: 10,
    alpha: 90,
    expectedArea: 314.0,
    expectedPerimeter: 62.8,
    expectedSectorArea: 78.5,
  },
  {
    id: 'test-3',
    title: 'Örnek 3: Yarım Daire',
    description: 'Yarıçap r = 7, Merkez Açı 𝛼 = 180° (Dairenin 1/2\'si)',
    r: 7,
    alpha: 180,
    expectedArea: 153.86,
    expectedPerimeter: 43.96,
    expectedSectorArea: 76.93,
  },
  {
    id: 'test-4',
    title: 'Örnek 4: Tam Daire Dilimi',
    description: 'Yarıçap r = 4, Merkez Açı 𝛼 = 360° (Dilim alanı = Tam alan)',
    r: 4,
    alpha: 360,
    expectedArea: 50.24,
    expectedPerimeter: 25.12,
    expectedSectorArea: 50.24,
  },
];

export const MAIN_JAVA_CODE = `import java.util.Scanner;

/**
 * =========================================================================
 * PROJE: Dairenin Alanını, Çevresini ve Daire Dilimi Alanını Hesaplayan Program
 * GELİŞTİRİCİ: Enes Öztürk
 * DERS: Java 101 - Patika.dev / Temel Programlama
 * 
 * FORMÜLLER:
 * - Alan Formülü          : π * r * r
 * - Çevre Formülü         : 2 * π * r
 * - Daire Diliminin Alanı : (π * (r * r) * 𝛼) / 360
 * - Pi Değeri             : 3.14 (Sabit)
 * =========================================================================
 */
public class Main {
    public static void main(String[] args) {
        // Scanner nesnesi oluşturuluyor
        Scanner scanner = new Scanner(System.in);

        // Sabit Pi sayısı tanımlaması (Ödev şartı: π = 3.14)
        final double PI = 3.14;

        System.out.println("==================================================");
        System.out.println("  DAİRE VE DAİRE DİLİMİ ALANI HESAPLAMA PROGRAMI  ");
        System.out.println("            Hazırlayan: Enes Öztürk               ");
        System.out.println("==================================================");

        // Kullanıcıdan yarıçap (r) değerini alma
        System.out.print("Lütfen dairenin yarıçapını (r) giriniz: ");
        double r = scanner.nextDouble();

        // Kullanıcıdan merkez açı (𝛼) değerini alma
        System.out.print("Lütfen merkez açısının ölçüsünü (𝛼) giriniz (0-360): ");
        double alpha = scanner.nextDouble();

        // Girdi doğrulama kontrolleri
        if (r < 0) {
            System.out.println("\\nHata: Yarıçap negatif olamaz! Lütfen pozitif bir değer giriniz.");
            scanner.close();
            return;
        }

        if (alpha < 0 || alpha > 360) {
            System.out.println("\\nHata: Merkez açı 0 ile 360 derece arasında olmalıdır!");
            scanner.close();
            return;
        }

        // 1. Dairenin Alanı Formülü: π * r * r
        double alan = PI * r * r;

        // 2. Dairenin Çevresi Formülü: 2 * π * r
        double cevre = 2 * PI * r;

        // 3. Ödev - Daire Diliminin Alanı Formülü: (π * (r * r) * 𝛼) / 360
        double dilimAlani = (PI * (r * r) * alpha) / 360.0;

        // Sonuçların ekrana düzenli bir şekilde yazdırılması
        System.out.println("\\n------------------ HESAPLAMA SONUÇLARI ------------------");
        System.out.printf("Dairenin Yarıçapı (r)       : %.2f\\n", r);
        System.out.printf("Merkez Açı Ölçüsü (𝛼)      : %.2f°\\n", alpha);
        System.out.printf("Kullanılan Pi (π) Değeri    : %.2f\\n", PI);
        System.out.println("---------------------------------------------------------");
        System.out.printf("1. Dairenin Toplam Alanı    : %.2f\\n", alan);
        System.out.printf("2. Dairenin Çevresi         : %.2f\\n", cevre);
        System.out.printf("3. Daire Diliminin Alanı    : %.2f\\n", dilimAlani);
        System.out.println("=========================================================");
        System.out.println("Hesaplama başarıyla tamamlandı. - Enes Öztürk");

        // Kaynak sızıntısını önlemek için scanner kapatılır
        scanner.close();
    }
}
`;

export const MODULAR_JAVA_CODE = `import java.util.Scanner;

/**
 * PROJE: Modüler Daire Hesaplama Sistemi
 * GELİŞTİRİCİ: Enes Öztürk
 * AÇIKLAMA: Metotlar (Fonksiyonlar) kullanılarak temiz kod prensiplerine
 * uygun olarak ayrıştırılmış daire ve dilim alanı hesaplayıcısı.
 */
public class DaireHesaplayici {
    // Sabit Pi sayısı
    public static final double PI = 3.14;

    /**
     * Dairenin toplam alanını hesaplar.
     * Formül: π * r * r
     */
    public static double alanHesapla(double r) {
        return PI * r * r;
    }

    /**
     * Dairenin çevresini hesaplar.
     * Formül: 2 * π * r
     */
    public static double cevreHesapla(double r) {
        return 2 * PI * r;
    }

    /**
     * Yarıçapı r, merkez açısı 𝛼 olan daire diliminin alanını hesaplar.
     * Formül: (π * (r * r) * 𝛼) / 360
     */
    public static double dilimAlaniHesapla(double r, double alpha) {
        return (PI * Math.pow(r, 2) * alpha) / 360.0;
    }

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);

        System.out.println(">>> DAİRE HESAPLAMA SİSTEMİ (MODÜLER) <<<");
        System.out.println("Geliştirici: Enes Öztürk\\n");

        System.out.print("Yarıçapı (r) giriniz: ");
        double r = scan.nextDouble();

        System.out.print("Merkez açıyı (𝛼) giriniz: ");
        double alpha = scan.nextDouble();

        double alan = alanHesapla(r);
        double cevre = cevreHesapla(r);
        double dilim = dilimAlaniHesapla(r, alpha);

        System.out.println("\\n--- SONUÇLAR ---");
        System.out.printf("Alan        : %.4f\\n", alan);
        System.out.printf("Çevre       : %.4f\\n", cevre);
        System.out.printf("Dilim Alanı : %.4f\\n", dilim);

        scan.close();
    }
}
`;

export const OOP_JAVA_CODE = `import java.util.Scanner;

/**
 * PROJE: Nesne Yönelimli Programlama (OOP) ile Daire & Dilim Modeli
 * GELİŞTİRİCİ: Enes Öztürk
 */
class Daire {
    private double yaricap;
    private double merkezAci;
    public static final double PI = 3.14;

    // Kurucu Metot (Constructor)
    public Daire(double yaricap, double merkezAci) {
        this.yaricap = Math.max(0, yaricap);
        this.merkezAci = Math.max(0, Math.min(360, merkezAci));
    }

    public double alan() {
        return PI * yaricap * yaricap;
    }

    public double cevre() {
        return 2 * PI * yaricap;
    }

    public double dilimAlani() {
        return (PI * (yaricap * yaricap) * merkezAci) / 360.0;
    }

    public void bilgileriYazdir() {
        System.out.println("==========================================");
        System.out.println("         DAİRE NESNESİ BİLGİLERİ          ");
        System.out.println("         Hazırlayan: Enes Öztürk          ");
        System.out.println("==========================================");
        System.out.printf("Yarıçap (r)      : %.2f\\n", this.yaricap);
        System.out.printf("Merkez Açı (𝛼)   : %.2f°\\n", this.merkezAci);
        System.out.printf("Toplam Alan      : %.2f\\n", this.alan());
        System.out.printf("Çevre            : %.2f\\n", this.cevre());
        System.out.printf("Daire Dilimi     : %.2f\\n", this.dilimAlani());
        System.out.println("==========================================");
    }
}

public class OOPMain {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Yarıçap (r): ");
        double r = input.nextDouble();
        System.out.print("Merkez Açı (𝛼): ");
        double a = input.nextDouble();

        Daire daire = new Daire(r, a);
        daire.bilgileriYazdir();
        input.close();
    }
}
`;
