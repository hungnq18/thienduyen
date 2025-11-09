import DecorationResortHeader from '../components/DecorationResortHeader';
import LotusConceptSection from '../components/LotusConceptSection';
import ModernZenResortSection from '../components/ModernZenResortSection';
import SimpleConceptSection from '../components/SimpleConceptSection';

export default function DecorQuotationPage() {
  const handlePackageClick = (pkg) => {
    // Map package names to section IDs
    const sectionMap = {
      'GÓI TRUYỀN THỐNG': 'traditional-section',
      'GÓI THIỀN': 'simple-section',
      'GÓI SEN': 'lotus-section',
      'MODERN ZEN': 'modern-zen-section',
    };

    const sectionId = sectionMap[pkg.name];
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <main className="min-h-screen">
      <DecorationResortHeader onPackageClick={handlePackageClick} />
      <div id="traditional-section">
        <ModernZenResortSection />
      </div>
      <div id="simple-section">
        <SimpleConceptSection />
      </div>
      <div id="lotus-section">
        <LotusConceptSection />
      </div>
      <div id="modern-zen-section">
        <ModernZenResortSection />
      </div>
    </main>
  );
}

