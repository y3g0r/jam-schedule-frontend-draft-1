import { Fragment } from "react/jsx-runtime";
import { Post, PostProps } from "./Post";

interface PostListProps {
    posts: PostProps[]
}

export function PostList({ posts }: PostListProps) {
  return (
    <div>
      <h2>Posts List</h2>

      {posts.map((post) => (
        <Fragment key={post.id}>
        <Post
              title={post.title}
              content={post.content} 
              id={0} 
        />
        {/* <hr/> */}
        </Fragment>
      ))}
    </div>
  );
}