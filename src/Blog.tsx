import { useQuery } from '@tanstack/react-query'

import { PostList } from './components/PostList.js'
import { Post } from './components/Post.js'
import { CreatePost } from './components/CreatePost.js'
import { getPosts } from './api/posts.js'

export function Blog() {
  // const posts = [
  //   { id: 1, title: 'First Post', content: 'This is the content of the first post.' },
  //   { id: 2, title: 'Second Post', content: 'This is the content of the second post.' },
  //   { id: 3, title: 'Third Post', content: 'This is the content of the third post.' },
  // ]

  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
  })

  const posts = postsQuery.data ?? []

  return (
    <>
      <h1>Hello, post</h1>
      <br/>
      <CreatePost />
      <br/>
      <Post 
        id={1}
        title="Literal post"
        content="Post added in front of post list"
      />
      <br/>
      <PostList posts={posts}/>
    </>
  )
}

