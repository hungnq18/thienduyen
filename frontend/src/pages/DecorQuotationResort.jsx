import DecorationResortHeader from '../components/DecorationResortHeader';
import ElegantSection from '../components/ElegentSection';
import ModernZenResortSection from '../components/ModernZenResortSection';
import NatureSection from '../components/NatureSection';

export default function DecorQuotationPage() {
  const handlePackageClick = (pkg) => {
    // Map package names to section IDs
    const sectionMap = {
      
      
      'GÓI MODERN ZEN': 'modern-zen-section',
      'GÓI ELEGANT CONTEMPORARY': 'elegant-section',
      'GÓI NATURE FUSION': 'nature-section',
    };

    const sectionId = sectionMap[pkg.name];
    if (sectionId) {
      // Use setTimeout to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <main className="min-h-screen" style={{ scrollBehavior: 'smooth' }}>
      <DecorationResortHeader onPackageClick={handlePackageClick} />
      <div id="modern-zen-section" style={{ scrollMarginTop: '80px' }}>
        <ModernZenResortSection />
      </div>
      <div id="elegant-section" style={{ scrollMarginTop: '80px' }}>
        <ElegantSection />
      </div>
      <div id="nature-section" style={{ scrollMarginTop: '80px' }}>
        <NatureSection />
      </div>
    </main>
  );
}

