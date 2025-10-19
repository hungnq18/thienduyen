import CoordinatorQuotation from "../components/CoordinatorQuotation"
import DecorQuotation from "../components/DecorQuotation"
import HeaderQuotationSection from "../components/HeaderQuotationSection"
import PlanningQuotation from "../components/PlanningQuotation"

function QuotationPage() {
  return (
    <div>
   <HeaderQuotationSection /> 
    <PlanningQuotation/>
    <DecorQuotation />
    <CoordinatorQuotation />
</div>
  )
}

export default QuotationPage
