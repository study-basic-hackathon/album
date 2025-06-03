import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

type Post = {
  id: number;
  body: string;
  created_at: string;
};

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);

  const createPost = async () => {
    if (body.length === 0) {
      alert("Please enter a post");
      return;
    }
    try {
      await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body }),
      });
      setBody("");
      getPosts();
    } catch (error) {
      console.error("Error creating post:", error);
      setError(String(error));
    }
  };

  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:3000/posts");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError(String(error));
      return;
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <input
          type="text"
          style={{ marginInlineEnd: "8px" }}
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
        <button onClick={() => createPost()}>Post</button>
      </div>

      {error && (
        <p>
          <strong>Error:</strong> {error}
        </p>
      )}

      <div className="card">
        {posts.map((post, index) => (
          <div key={index} className="post">
            #{post.id} {post.created_at} <br />
            {post.body}
          </div>
        ))}
      </div>

      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
