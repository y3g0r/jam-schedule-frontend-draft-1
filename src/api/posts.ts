export const getPosts = async () => {
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/posts`
    )
  return await res.json()
}

export const createPost = async (post) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
  })
  return await res.json()
}

export const authenticatedCreatePost = async (postData, getToken) => {
  const token = await getToken()
  
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,

    },
    body: JSON.stringify(postData),
  })

  if (!res.ok) {
    throw new Error(`Error creating post ${res.status} ${res.statusText}`)
  }
  return await res.json()
}