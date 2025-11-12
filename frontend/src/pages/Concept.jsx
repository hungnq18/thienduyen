import { useState } from "react";
import ConceptChua from "../components/ConceptChua";
import ConceptResort from "../components/ConceptResort";
import HeaderConcept from "../components/HeaderConcept";

const Concept = () => {
  const [activeView, setActiveView] = useState("temple"); // "temple" or "resort"

  const handleTempleClick = () => {
    setActiveView("temple");
    setTimeout(() => {
      const templeSection = document.getElementById("temple-section");
      if (templeSection) {
        templeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleResortClick = () => {
    setActiveView("resort");
    setTimeout(() => {
      const resortSection = document.getElementById("resort-section");
      if (resortSection) {
        resortSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="bg-[#F6EFE7] min-h-screen">
      <HeaderConcept />
      
      {/* Button Selection Section */}
      <section className="w-full bg-[#F6EFE7] py-8 sm:py-10 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center items-center">
            {/* Temple Button */}
            <button
              onClick={handleTempleClick}
              className={`w-full sm:w-auto px-8 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg ${
                activeView === "temple" ? "ring-2 ring-offset-2 ring-[#7A1F1F]" : ""
              }`}
              style={{
                backgroundColor: activeView === "temple" ? "#7A1F1F" : "#7A1F1F",
                color: "#FFFFFF",
                fontFamily: "'Arima Madurai', sans-serif",
                fontSize: "clamp(0.875rem, 2vw, 1.125rem)",
                fontWeight: 600,
                letterSpacing: "0.05em"
              }}
            >
              Decoration At The Temple
            </button>

            {/* Resort Button */}
            <button
              onClick={handleResortClick}
              className={`w-full sm:w-auto px-8 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg ${
                activeView === "resort" ? "ring-2 ring-offset-2 ring-[#8B4513]" : ""
              }`}
              style={{
                backgroundColor: activeView === "resort" ? "#E5DED3" : "#E5DED3",
                color: "#3F2B20",
                fontFamily: "'Arima Madurai', sans-serif",
                fontSize: "clamp(0.875rem, 2vw, 1.125rem)",
                fontWeight: 600,
                letterSpacing: "0.05em"
              }}
            >
              Decoration At The Resort/Retreat
            </button>
          </div>
        </div>
      </section>

      {activeView === "temple" && <ConceptChua activeView={activeView} />}
      {activeView === "resort" && <ConceptResort activeView={activeView} />}
    </div>
  );
};

export default Concept;