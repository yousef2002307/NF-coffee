import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import img from '../../../assets/c.png'
import { Host } from "../../../Api/Api";
const SingleBlogDashdord = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${Host}/api/v1/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlogDetails();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
   <div>
     <div className="p-6  ">
      <img
        className="h-full w-1/2"
        alt="blog"
        src={blog.image}
         
            
        
      />
      <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-4">{new Date(blog.created_at).toLocaleDateString()}</p>
      <div className="text-gray-800">{blog.content} {blog.description}</div>
    </div>
   </div>
  );
};

export default SingleBlogDashdord;
