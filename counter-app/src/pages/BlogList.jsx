import React from "react";
import { Link } from "react-router-dom";

const blogs = [
  { id: 1, title: "React Basics" },
  { id: 2, title: "Advanced React Patterns" },
  { id: 3, title: "State Management in React" },
];

const BlogList = () => {
  return (
    <div>
      <h1>Blog List</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
