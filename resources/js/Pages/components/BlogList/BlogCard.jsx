import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <Link to={`/blog/${blog.id}`} className="block">
      <div className="bg-white p-4 rounded-lg  hover:shadow-xl transition-shadow duration-300">
        <img
          src={blog.image_url}
          alt={blog.title}
          className="w-full h-48 object-cover rounded-md"
        />
        <h2 className="text-xl font-semibold mt-4">{blog.title}</h2>
       
        <p className="text-sm text-gray-500 mt-2">
          Published on: {new Date(blog.created_at).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
};

export default BlogCard;
