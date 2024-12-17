import React, { useState, useEffect } from "react";
import { fetchBlogsApi } from "../../Api/Api";  
import BlogCard from "./BlogCard";
import { useTranslation } from "react-i18next";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
const {t}=useTranslation()

  const fetchBlogs = async (page = 1) => {
    setLoading(true); 
    try {
      const data = await fetchBlogsApi(page); 
      setBlogs(data.data); 
      setPagination(data); 
    } catch (error) {
      console.error("Error fetching blogs", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchBlogs(); 
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">{t("blogs")}</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={() => fetchBlogs(pagination.current_page - 1)}
              disabled={!pagination.prev_page_url}
              className="px-4 py-2 bg-orange-500 text-white rounded disabled:bg-gray-300"
            >
              {t("previous")}
            
            </button>
            {pagination.links &&
              pagination.links.map(
                (link, index) =>
                  link.active && (
                    <button
                      key={index}
                      onClick={() => fetchBlogs(link.label)}
                      className="px-4 py-2 mx-2 bg-orange-500 text-white rounded"
                    >
                      {link.label}
                    </button>
                  )
              )}
            <button
              onClick={() => fetchBlogs(pagination.current_page + 1)}
              disabled={!pagination.next_page_url}
              className="px-4 py-2 bg-orange-500 text-white rounded disabled:bg-gray-300"
            >
              {t("next")}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogList;
