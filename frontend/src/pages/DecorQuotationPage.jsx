import DecorQuotationHeader from '../components/DecorQuotationHeader';
import LotusConceptSection from '../components/LotusConceptSection';
import SimpleConceptSection from '../components/SimpleConceptSection';
import TraditionalConceptSection from '../components/TraditionalConceptSection';

export default function DecorQuotationPage() {
  const handlePackageClick = (pkg) => {
    // Map package names to section IDs
    const sectionMap = {
      'GÓI TRUYỀN THỐNG': 'traditional-section',
      'GÓI THIỀN': 'simple-section',
      'GÓI SEN': 'lotus-section',
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
      <DecorQuotationHeader onPackageClick={handlePackageClick} />
      <div id="traditional-section">
        <TraditionalConceptSection />
      </div>
      <div id="simple-section">
        <SimpleConceptSection />
      </div>
      <div id="lotus-section">
        <LotusConceptSection />
      </div>
    </main>
  );
}

