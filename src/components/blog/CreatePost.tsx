import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { authenticatedCreatePost, POSTS_QUERY_KEY } from '../../api/posts.js'
import { useAuth } from "@clerk/clerk-react"

export function CreatePost() {
    const [title, setTitle] = useState('')  
    const [content, setContents] = useState('')
    const { getToken } = useAuth()

    const queryClient = useQueryClient()
    const createPostMutation = useMutation({
        mutationFn: async () => authenticatedCreatePost({ title, content }, getToken),
        onSuccess: () => queryClient.invalidateQueries([POSTS_QUERY_KEY]),
      })

    const handleSubmit = (e) => {
        e.preventDefault()
        createPostMutation.mutate()
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="create-title">Title:</label>
                <input 
                    type="text" 
                    id="create-title" 
                    name="create-title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <textarea
                value={content}
                onChange={(e) => setContents(e.target.value)}
            />
            <br/>
            <input 
                type="submit" 
                value={createPostMutation.isPending ? 'Creating...' : 'Create'}
                disabled={!title || createPostMutation.isPending}
            />
        {createPostMutation.isSuccess ? (
            <>
                <br />
                Post created successfully!
            </>
        ) : null}
        </form>
    )
}