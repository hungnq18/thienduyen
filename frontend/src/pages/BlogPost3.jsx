import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPostById } from '../data/blog';

const BlogPost3 = () => {
  const post = getBlogPostById(3);

  useEffect(() => {
    if (post?.title) document.title = post.title + ' | Thiện Duyên';
  }, [post]);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-12 md:py-16" style={{ fontFamily: 'Arima Madurai, sans-serif' }}>
      <h1 className="text-[22px] sm:text-[28px] md:text-[34px] leading-tight mb-4 font-semibold" style={{ color: '#000' }}>
        {post?.title}
      </h1>
      
      {/* PHẦN 1 - TỔNG QUAN */}
      <section className="space-y-4 mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl mb-2">{post?.content?.part1?.heading}</h2>
        {(post?.content?.part1?.paragraphs || []).map((text, idx) => (
          <p key={idx} className="text-[15px] sm:text-[16px] leading-relaxed text-justify">{text}</p>
        ))}
        {post?.content?.part1?.figure && (
          <figure>
            <img
              src={post.content.part1.figure.src}
              alt={post.content.part1.figure.caption}
              className="w-full h-auto object-cover"
              loading="lazy" />
            <figcaption className="mt-2 text-center text-sm italic text-[#6b7280]">
              {post.content.part1.figure.caption}
            </figcaption>
          </figure>
        )}
      </section>

      {/* PHẦN 2 - CUSTOMER STORIES */}
      {post?.content?.part2 && (
        <section className="space-y-6 mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl mb-2 font-semibold">
            {post.content.part2.heading}
          </h2>
          {post.content.part2.intro && (
            <p className="text-[15px] sm:text-[16px] leading-relaxed text-justify">
              {post.content.part2.intro}
            </p>
          )}
          {Array.isArray(post.content.part2.stories) && post.content.part2.stories.map((story, i) => (
            <div key={i} className="space-y-3">
              <h3 className="text-lg font-semibold">{story.title}</h3>
              {story.content.map((p, pIdx) => (
                <p key={pIdx} className="text-[15px] sm:text-[16px] leading-relaxed text-justify">{p}</p>
              ))}
              {story.image && (
                <figure className="pt-2">
                  <img src={story.image} alt={story.title} className="w-full h-auto object-cover" loading="lazy" />
                </figure>
              )}
            </div>
          ))}
        </section>
      )}

      {/* PHẦN 3 - LỜI KHUYÊN */}
      {post?.content?.part3 && (
        <section className="space-y-6 mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl mb-2 font-semibold">
            {post.content.part3.heading}
          </h2>
          {post.content.part3.paragraphs.map((p, pIdx) => (
            <p key={pIdx} className="text-[15px] sm:text-[16px] leading-relaxed text-justify">{p}</p>
          ))}
          {post.content.part3.image && (
            <figure className="pt-2">
              <img src={post.content.part3.image} alt={post.content.part3.heading} className="w-full h-auto object-cover" loading="lazy" />
            </figure>
          )}
        </section>
      )}
      
      <div className="mt-10">
        <Link to="/blog" className="text-[#610912] hover:underline">
          ← Quay lại Blog
        </Link>
      </div>
    </article>
  );
};

export default BlogPost3;