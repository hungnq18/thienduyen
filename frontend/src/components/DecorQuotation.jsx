import DecorServiceCard from "../components/DecorServiceCard";

export default function DecorQuotation() {
  return (
    <main className="min-h-screen">
      {/* Header Section */}
      <section className="py-12 md:py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold  mb-4 text-balance"
        style={{fontFamily: '"Be Vietnam Pro", sans-serif'}}>
          DỊCH VỤ DECOR TIỆC CƯỚI
        </h1>
        <p className="text-lg md:text-xl text-balance " style={{fontFamily: '"Arima Madurai", cursive'}}>
          Bao gồm 2 gói combo chính: Tại Chùa & Tại Resort/Retreat
        </p>
      </section>

      {/* Service Cards Section */}
      <section className="px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <DecorServiceCard
            title="DECOR TẠI CHÙA"
            image="https://res.cloudinary.com/dijayprrw/image/upload/v1760881159/Rectangle_4543_h93ehc.png"
          />
          <DecorServiceCard
            title="DECOR TẠI RESORT"
            image="https://res.cloudinary.com/dijayprrw/image/upload/v1760881791/Rectangle_4546_oihwu3.png"
            description="Trang trí tiệc cưới tại resort với không gian thoáng đãng và hiện đại"
          />
        </div>
      </section>

     
    </main>
  );
}
