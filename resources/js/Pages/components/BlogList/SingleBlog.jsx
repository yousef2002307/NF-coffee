import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchBlogApi } from "../../Api/Api"; 


const SingleBlog = () => {
  const { id } = useParams(); 
  const [blog, setBlog] = useState(null);
  const [recommendedPosts, setRecommendedPosts] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchBlog = async () => {
    setLoading(true); 
    try {
      const blogData = await fetchBlogApi(id); 
      setBlog(blogData.post);
      setRecommendedPosts(blogData.recommendedPosts); 
    } catch (error) {
      console.error("Error fetching the blog:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchBlog(); 
  }, [id]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!blog) {
    return <p className="text-center">Blog not found.</p>;
  }

  return (
    <div className="container flex flex-col gap-5 mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6">{blog.title}</h1>
      
      <div className="flex justify-center mb-6">
        <img
          src={ blog.image} 
          alt={blog.title}
          className="w-full h-auto object-contain rounded-md"
        />
      </div>
      <p className="text-lg text-gray-600 mb-4">{blog.description} {blog.content}</p>
      
      <p className="text-sm text-gray-500 mt-4">
        Published on: {new Date(blog.created_at).toLocaleDateString()}
      </p>

    
      {recommendedPosts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-6">Recommended Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedPosts.map((post) => (
                <Link to={`/blog/${post.id}`} className="block">
              <div key={post.id} className="border rounded-lg p-4 shadow-lg">
                <img
                   src={post.image_url}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              
                <p className="text-sm text-gray-500">Published on: {new Date(post.created_at).toLocaleDateString()}</p>
              </div></Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleBlog;
