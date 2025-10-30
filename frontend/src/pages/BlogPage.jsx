import BlogList from '../components/BlogList';
import HeaderBlog from '../components/HeaderBlog';

const BlogPage = () => {
  return (
    <div className="w-full">
      <HeaderBlog />

      <BlogList />
    </div>
  );
};

export default BlogPage;


