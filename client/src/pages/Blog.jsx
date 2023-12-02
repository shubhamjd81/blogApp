import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../components/Card";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      // const data = res.json();

      if (data?.success) {
        setBlogs(data.blogs);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div>
      {blogs
        ? blogs.map((blog) => {
            return (
              <Cards
                id={blog?._id}
                isUser={localStorage.getItem("userId") === blog?.user?._id}
                title={blog?.title}
                description={blog?.description}
                image={blog?.image}
                username={blog?.user?.username}
                time={blog?.createdAt}
              />
            );
          })
        : "<h1>no blogs</h1>"}
    </div>
  );
};

export default Blog;
