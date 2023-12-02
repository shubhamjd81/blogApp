import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../components/Card";

const UserBlogs = (prop) => {
  const [blogs, setBlogs] = useState([]);

  // get blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      console.log("id", id);

      const res = await fetch(`/api/v1/blog/user-blog/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);
  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => {
          return (
            <Cards
              id={blog?._id}
              isUser={true}
              title={blog?.title}
              description={blog?.description}
              image={blog?.image}
              username={blog?.user?.username}
            />
          );
        })
      ) : (
        <h1>You Have not created account</h1>
      )}
    </div>
  );
};

export default UserBlogs;
