import { Blog } from './Blog.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Blog />
    </QueryClientProvider>
  )
}