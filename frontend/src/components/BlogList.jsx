import { blogPosts } from '../data/blog';

import { Link } from 'react-router-dom';

const BlogCard = ({ image, title, excerpt, id }) => {
  return (
    <article className="flex flex-col">
      <div className="w-full aspect-[4/3] overflow-hidden rounded-md">
        <img src={image} alt={title} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <h3 className="mt-4 text-[16px] sm:text-[17px] md:text-[18px] leading-snug" style={{ color: '#000', fontFamily: 'Arima Madurai, sans-serif' }}>
        {title}
      </h3>
      <p className="mt-2 text-[13px] sm:text-[14px] md:text-[15px] text-[#333]" style={{ fontFamily: 'Arima Madurai, sans-serif' }}>
        {excerpt}
      </p>
      <Link to={`/blog/${id}`} className="mt-3 text-[13px] sm:text-[14px] md:text-[15px] text-[#610912] inline-flex items-center gap-1">
        Read More <span aria-hidden>→</span>
      </Link>
    </article>
  );
};

const BlogList = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-12 md:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
        {blogPosts.map((p) => (
          <BlogCard key={p.id} id={p.id} image={p.image} title={p.title} excerpt={p.excerpt} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex items-center justify-center gap-4 text-sm">
        {[1, 2, 3, 4].map((n) => (
          <button
            key={n}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              n === 1 ? 'bg-[#610912] text-white' : 'text-[#610912] hover:bg-[#610912]/10'
            }`}
          >
            {n}
          </button>
        ))}
        <span className="mx-1">…</span>
        <button className="w-10 h-8 rounded-full text-[#610912] hover:bg-[#610912]/10">10</button>
      </div>
    </section>
  );
};

export default BlogList;


