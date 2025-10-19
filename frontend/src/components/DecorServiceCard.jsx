
export default function DecorServiceCard({ title, image }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden  hover:shadow-xl transition-shadow">
      <img src={image} alt={title} className="w-full object-cover p-4 px-5" />
      <div className="p-6 text-center">
        <h3 className="bg-red-900 text-2xl font-semibold text-white mb-3">{title}</h3>
      </div>
    </div>
  );
}
