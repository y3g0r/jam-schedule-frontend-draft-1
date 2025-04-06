import { Blog } from './pages/Blog.tsx'
import { Home } from './pages/Home.tsx'
import { Jams } from './pages/Jams.tsx'
import { Schedule } from './pages/Schedule.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/schedule",
    element: <Schedule />
  },
  {
    path: "/jams",
    element: <Jams />
  },
  {
    path: "/blog",
    element: <Blog />
  },
])


export function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}