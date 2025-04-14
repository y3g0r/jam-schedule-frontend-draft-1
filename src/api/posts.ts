export const POSTS_QUERY_KEY = "posts";

export const getPosts = async () => {
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/posts`
    )
  return await res.json()
}

interface PostData {
  title: string;
  content: string;
}

interface CreatePostResponse {
  id: number;
}

type GetTokenFunction = () => Promise<string | null>;

export const authenticatedCreatePost = async (
  postData: PostData,
  getToken: GetTokenFunction
): Promise<CreatePostResponse> => {
  const token = await getToken();
  
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });

  if (!res.ok) {
    throw new Error(`Error creating post ${res.status} ${res.statusText}`);
  }
  return await res.json();
};