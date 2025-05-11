import { client } from './client/client.gen.ts'
import { RootLayout } from './components/RootLayout.tsx'
import { Blog } from './pages/Blog.tsx'
import { JamDetails } from './pages/JamDetails.tsx'
import { Jams } from './pages/Jams.tsx'
import { Schedule } from './pages/Schedule.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router'

// configure internal service client
client.setConfig({
  // set default base url for requests
  baseUrl: `${import.meta.env.VITE_BASE_URL}`,
  // set default headers for requests
  headers: {
    Authorization: 'Bearer <token_from_service_client>',
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {index: true, element: <Jams />},
      {path: "schedule", element: <Schedule />},
      {path: "jams", element: <Jams />},
      {path: "jams/:jamId", element: <JamDetails />},
      {path: "blog", element: <Blog />},
    ]
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