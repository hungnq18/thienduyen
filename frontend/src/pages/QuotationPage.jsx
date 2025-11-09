import CoordinatorQuotation from "../components/CoordinatorQuotation"
import DecorQuotation from "../components/DecorQuotation"
import HeaderQuotationSection from "../components/HeaderQuotationSection"
import PlanningQuotation from "../components/PlanningQuotation"

function QuotationPage() {
  return (
    <div>
   <HeaderQuotationSection /> 
    <div id="planning-section">
      <PlanningQuotation/>
    </div>
    <div id="decor-section">
      <DecorQuotation />
    </div>
    <div id="coordinator-section">
      <CoordinatorQuotation />
    </div>
</div>
  )
}

export default QuotationPage
