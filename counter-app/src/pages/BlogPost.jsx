import React from "react";
import { useParams } from "react-router-dom";

const blogData = {
  1: { title: "React Basics", content: "Learn the basics of React." },
  2: { title: "Advanced React Patterns", content: "Understand advanced patterns in React." },
  3: { title: "State Management in React", content: "Learn how to manage state in React applications." },
};

const BlogPost = () => {
  const { id } = useParams();
  const blog = blogData[id];

  if (!blog) {
    return <h2>Blog post not found</h2>;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
};

export default BlogPost;
