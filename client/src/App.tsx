import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

type Post = {
  id: number
  body: string
  created_at: string
}

function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [body, setBody] = useState('')

  const createPost = async () => {
    if (body.length === 0) {
      alert('Please enter a post')
      return
    }
    await fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ body }),
    })
    setBody('')
    getPosts()
  }

  const getPosts = async () => {
    const response = await fetch('http://localhost:3000/posts')
    const data = await response.json()
    setPosts(data)
  }

  useEffect(() => {
    getPosts()
  }, [])

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
          type="text" style={{ marginInlineEnd: "8px" }}
          value={body} onChange={event => setBody(event.target.value)} />
        <button onClick={() => createPost()}>Post</button>
      </div>

      <div className="card">
        {posts.map((post, index) => (
          <div key={index} className="post">
            #{post.id} {post.created_at} <br />
            {post.body}

          </div>
        ))}
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
