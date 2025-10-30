import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPostById } from '../data/blog';

const BlogPost2 = () => {
  const post = getBlogPostById(2);

  useEffect(() => {
    if (post?.title) document.title = post.title + ' | Thiện Duyên';
  }, [post]);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-12 md:py-16" style={{ fontFamily: 'Arima Madurai, sans-serif' }}>
      <h1 className="text-[22px] sm:text-[28px] md:text-[34px] leading-tight mb-4 font-semibold" style={{ color: '#000' }}>
        {post?.title}
      </h1>
      {/* Phần 1 */}
      <section className="space-y-4 mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl mb-2">
          {post?.content?.part1?.heading}
        </h2>
        <p className="text-[15px] sm:text-[16px] leading-relaxed text-justify">
          {post?.content?.part1?.paragraphs?.[0]}
        </p>
        {post?.content?.part1?.figure && (
          <figure>
            <img
              src={post.content.part1.figure.src}
              alt={post.content.part1.figure.caption}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
            <figcaption className="mt-2 text-center text-sm italic text-[#6b7280]">
              {post.content.part1.figure.caption}
            </figcaption>
          </figure>
        )}
        {post?.content?.part1?.paragraphs?.slice(1).map((text, idx) => (
          <p key={idx} className="text-[15px] sm:text-[16px] leading-relaxed text-justify">
            {text}
          </p>
        ))}
         {/* Album ảnh hàng dọc, hàng ngang */}
         {Array.isArray(post?.content?.part1?.albumRows) && post.content.part1.albumRows.length > 0 && (
          <div className="space-y-6 mt-4">
            {post.content.part1.albumRows.map((row, rIdx) => {
              const colsToClass = {
                1: 'grid-cols-1',
                2: 'grid-cols-2',
                3: 'grid-cols-3',
                4: 'grid-cols-4',
              };
              return (
                <div key={rIdx} className={`grid ${colsToClass[row?.cols] || 'grid-cols-3'} gap-4 w-full`}>
                  {row.images.map((img, idx) => (
                    <figure key={idx} className="w-full h-full">
                      <img
                        src={img.src}
                        alt={img.caption || `Ảnh ${idx + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </figure>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </section>
      {/* PHẦN 2 - 5 LÝ DO */}
      <section className="space-y-4 mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl mb-2 font-semibold">
          {post?.content?.part2?.heading}
        </h2>
        {post?.content?.part2?.intro && (
          <p className="text-[15px] sm:text-[16px] leading-relaxed text-justify">
            {post.content.part2.intro}
          </p>
        )}
        {Array.isArray(post?.content?.part2?.bullets) && post.content.part2.bullets.length > 0 && (
          <ul className="list-decimal pl-6 space-y-2">
            {post.content.part2.bullets.map((item, i) => (
              <li key={i}><span className="font-semibold">{item.title}:</span> {item.body}</li>
            ))}
          </ul>
        )}
        {Array.isArray(post?.content?.part2?.albumRows) && post.content.part2.albumRows.length > 0 && (
          <div className="space-y-6 mt-4">
            {post.content.part2.albumRows.map((row, rIdx) => {
              const colsToClass = { 1:'grid-cols-1',2:'grid-cols-2',3:'grid-cols-3',4:'grid-cols-4' };
              return (
                <div key={rIdx} className={`grid ${colsToClass[row?.cols] || 'grid-cols-3'} gap-4 w-full`}>
                  {row.images.map((img, idx) => (
                    <figure key={idx} className="w-full h-full">
                      <img src={img.src} alt={img.caption||`Ảnh ${idx+1}`} className="w-full h-full object-cover" loading="lazy" />
                    </figure>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </section>
      {/* PHẦN 3 - Niềm Tin & Hạnh Phúc Viên Mãn */}
      <section className="space-y-4 mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl mb-2 font-semibold">
          {post?.content?.part3?.heading}
        </h2>
        {post?.content?.part3?.paragraphs?.[0] && (
          <p className="text-[15px] sm:text-[16px] leading-relaxed text-justify">
            {post.content.part3.paragraphs[0]}
          </p>
        )}
      </section>
      <div className="mt-10">
        <Link to="/blog" className="text-[#610912] hover:underline">
          ← Quay lại Blog
        </Link>
      </div>
    </article>
  );
};

export default BlogPost2;
