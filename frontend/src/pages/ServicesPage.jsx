import CoordinationSeviceSection from '../components/CoordinationSeviceSection';
import DecorationServiceSection from '../components/DecorationServiceSection';
import PlanningServiceSection from '../components/PlanningServiceSection';
import ServiceSection from '../components/ServiceSection';
const ServicesPage = () => {
  return (
    <div className="root">
      <ServiceSection />
      <DecorationServiceSection />
      <PlanningServiceSection />
      <CoordinationSeviceSection />
      <div className='text-link mx-auto my-10 text-center'>
        <a href="/https://www.facebook.com/profile.php?id=61581429876073&mibextid=wwXIfr&mibextid=wwXIfr" style={{
          color: "#000000",
          fontSize: "52px",
          textDecoration: "none",
          fontFamily: 'Beau Rivage, sans-serif',
          alignItems: 'center',
          justifyContent: 'center'
        }}>Follow Us On Facebook</a>
      </div>
    </div>
  );
};

export default ServicesPage;
