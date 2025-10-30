import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPostById } from '../data/blog';

const BlogPost1 = () => {
  const post = getBlogPostById(1);

  // SEO: update document title and inject JSON-LD
  useEffect(() => {
    if (post?.title) document.title = post.title + ' | Thiện Duyên';
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post?.title,
      image: [post?.image].filter(Boolean),
      datePublished: post?.publishedAt || '2025-01-01',
      author: {
        '@type': 'Organization',
        name: 'Thiện Duyên',
      },
      description: post?.seoDescription,
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(ld);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [post]);
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-12 md:py-16" style={{ fontFamily: 'Arima Madurai, sans-serif' }}>
      <h1 className="text-[22px] sm:text-[28px] md:text-[34px] leading-tight mb-4 font-semibold" style={{ color: '#000' }}>
        {post?.title || 'Hằng Thuận – Hơn cả một dịch vụ cưới, là nơi gửi gắm giấc mơ hôn nhân của bạn!'}
      </h1>
      <p className="text-sm text-[#666] mb-6">
        Đăng bởi Thiện Duyên · 2025
      </p>

      {/* Hero image moved below opening section per layout: Heading → Intro → Image */}

      <section className="space-y-4 mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl mb-2">
          {post?.content?.part1?.heading || '1. Hằng Thuận là gì? Kiến tạo hạnh phúc từ trái tim'}
        </h2>
        {(post?.content?.part1?.paragraphs || []).map((t, i) => (
          <p key={i} className="text-[15px] sm:text-[16px] leading-relaxed text-justify">
            {t}
          </p>
        ))}
      </section>

      {/* Hình ảnh minh họa đoạn mở bài (xếp dọc + chú thích) */}
      <div className="flex flex-col gap-6 mb-8">
        {(post?.content?.part1?.figures || []).map((f, i) => (
          <figure key={i} className="w-full">
            <img src={f.src} alt={f.caption} className="w-full h-auto object-cover rounded-md" loading="lazy" />
            {f.caption ? (
              <figcaption className="mt-2 text-center text-sm text-[#6b7280]">
                {f.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>

      {/* Tầm nhìn, Sứ mệnh, Giá trị cốt lõi (thuộc Paragraph 1) */}
      <section className="mb-8 space-y-5">
        <ul className="list-disc pl-6 space-y-3">
          <li>
            <span className="font-semibold">Tầm nhìn:</span> {post?.content?.part1?.vision}
          </li>
          <li>
            <span className="font-semibold">Sứ mệnh:</span> {post?.content?.part1?.mission}
          </li>
        </ul>
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl mb-2">Giá trị cốt lõi</h3>
          <ul className="space-y-2">
            {(post?.content?.part1?.coreValues || []).map((v, i) => (
              <li key={i} className="flex items-start gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#610912" className="mt-1" aria-hidden>
                  <path d="M3 12l18-9-9 18-2-7z"/>
                </svg>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Paragraph 2 */}
      <section className="space-y-4 mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl mb-2">
          {post?.content?.part2?.heading}
        </h2>
        <p className="text-[15px] sm:text-[16px] leading-relaxed text-justify">
          {post?.content?.part2?.intro}
        </p>
        {post?.content?.part2?.figure ? (
          <figure>
            <img
              src={post.content.part2.figure.src}
              alt={post.content.part2.figure.caption}
              className="w-full h-auto object-cover rounded-md"
              loading="lazy"
            />
            <figcaption className="mt-2 text-center text-sm text-[#6b7280]">
              {post.content.part2.figure.caption}
            </figcaption>
          </figure>
        ) : null}
        <ul className="list-disc pl-6 space-y-3">
          {(post?.content?.part2?.bullets || []).map((b, i) => (
            <li key={i}>
              <span className="font-semibold">{b.title}:</span> {b.body}
            </li>
          ))}
        </ul>

        {/* Album ảnh cho Part 2 - Row based layout */}
        {Array.isArray(post?.content?.part2?.albumRows) && post.content.part2.albumRows.length > 0 ? (
          <section className="mt-6 space-y-6">
            {post.content.part2.albumRows.map((row, rIdx) => {
              const colsToClass = {
                1: 'grid-cols-1',
                2: 'grid-cols-2',
                3: 'grid-cols-3',
                4: 'grid-cols-4',
              };
              const gridClass = colsToClass[row?.cols] || 'grid-cols-3';
              const rowsClass = row?.rows === 2 ? 'grid-rows-2' : '';
              return (
                <div key={rIdx} className="w-full">
                  {row?.cols === 4 && row?.images?.length === 3 ? (
                    <div className="grid grid-cols-4 gap-4 w-full">
                      <figure className="col-span-1 w-full h-full min-h-0">
                        <img
                          src={row.images[0].src}
                          alt={row.images[0].caption || 'Ảnh 1'}
                          className="w-full h-full object-cover"
                          loading="lazy" />
                      </figure>
                      <figure className="col-span-2 w-full h-full min-h-0">
                        <img
                          src={row.images[1].src}
                          alt={row.images[1].caption || 'Ảnh 2'}
                          className="w-full h-full object-cover"
                          loading="lazy" />
                      </figure>
                      <figure className="col-span-1 w-full h-full min-h-0">
                        <img
                          src={row.images[2].src}
                          alt={row.images[2].caption || 'Ảnh 3'}
                          className="w-full h-full object-cover"
                          loading="lazy" />
                      </figure>
                    </div>
                  ) : (row?.rows === 2 && row?.images?.length === 4) ? (
                    <div className="grid grid-cols-3 grid-rows-2 gap-4 w-full h-[400px] md:h-[480px] min-h-0">
                      {/* Ảnh lớn bên trái */}
                      <figure className="col-start-1 row-start-1 row-span-2 w-full h-full min-h-0">
                        <img
                          src={row.images[0].src}
                          alt={row.images[0].caption || 'Ảnh 1'}
                          className="w-full h-full object-cover"
                          loading="lazy" />
                      </figure>
                      {/* Ảnh giữa trên */}
                      <figure className="col-start-2 row-start-1 w-full h-full min-h-0">
                        <img
                          src={row.images[1].src}
                          alt={row.images[1].caption || 'Ảnh 2'}
                          className="w-full h-full object-cover"
                          loading="lazy" />
                      </figure>
                      {/* Ảnh giữa dưới */}
                      <figure className="col-start-2 row-start-2 w-full h-full min-h-0">
                        <img
                          src={row.images[2].src}
                          alt={row.images[2].caption || 'Ảnh 3'}
                          className="w-full h-full object-cover"
                          loading="lazy" />
                      </figure>
                      {/* Ảnh lớn bên phải */}
                      <figure className="col-start-3 row-start-1 row-span-2 w-full h-full min-h-0">
                        <img
                          src={row.images[3].src}
                          alt={row.images[3].caption || 'Ảnh 4'}
                          className="w-full h-full object-cover"
                          loading="lazy" />
                      </figure>
                    </div>
                  ) : (
                    <div className={`grid ${gridClass} ${rowsClass} gap-4`}>
                      {(row.images || []).map((img, idx) => (
                        <figure key={idx} className={`w-full${img.rowSpan === 2 ? ' row-span-2' : ''}`}>
                          <img
                            src={img.src}
                            alt={img.caption || `Ảnh ${idx + 1}`}
                            className="w-full h-auto object-cover"
                            loading="lazy" />
                          {img.caption ? (
                            <figcaption className="mt-2 text-center text-sm text-[#6b7280]">
                              {img.caption}
                            </figcaption>
                          ) : null}
                        </figure>
                      ))}
                    </div>
                  )}
                  {row.caption ? (
                    <p className="mt-2 text-center text-sm text-[#6b7280] italic">{row.caption}</p>
                  ) : null}
                </div>
              );
            })}
          </section>
        ) : null}
      </section>
      {/* PHẦN 3: KHỞI ĐẦU HÀNH TRÌNH YÊU THƯƠNG */}
      <section className="space-y-4 mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl mb-2 font-semibold">
          {post?.content?.part3?.heading || '3. Khởi đầu hành trình yêu thương cùng Hằng Thuận'}
        </h2>
        <p className="text-[15px] sm:text-[16px] leading-relaxed text-justify">
          {post?.content?.part3?.intro}
        </p>
        {post?.content?.part3?.figure ? (
          <figure>
            <img
              src={post.content.part3.figure.src}
              alt={post.content.part3.figure.caption}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
            <figcaption className="mt-2 text-center text-sm italic text-[#6b7280]">
              {post.content.part3.figure.caption}
            </figcaption>
          </figure>
        ) : null}
      </section>

      <div className="mt-10">
        <Link to="/blog" className="text-[#610912] hover:underline">
          ← Quay lại Blog
        </Link>
      </div>
    </article>
  );
};

export default BlogPost1;


