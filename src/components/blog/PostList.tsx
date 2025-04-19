import { Fragment } from "react/jsx-runtime";
import { Post, PostProps } from "./Post";
import { useUser } from "@clerk/clerk-react";

interface PostListProps {
    posts: PostProps[]
}

export function PostList({ posts }: PostListProps) {
  const { isSignedIn, user, isLoaded } = useUser()

  if (isLoaded && isSignedIn) {
    posts.forEach(post => {
      if (post.author == user.id) post.author = "Me!"
    })
  }
  
  return (
    <div>
      <h2>Posts List</h2>

      {posts.map((post) => (
        <Fragment key={post.id}>
        <Post
              title={post.title}
              content={post.content} 
              author={isLoaded ? 
                isSignedIn && (post.author == user.id) ? "Me!" : post.author :
                "Loading..."}
              id={0} 
        />
        {/* <hr/> */}
        </Fragment>
      ))}
    </div>
  );
}