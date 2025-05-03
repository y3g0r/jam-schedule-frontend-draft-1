import { useQuery } from "@tanstack/react-query"
import { getJams, JAM_LIST_QUERY_KEY, JamData } from "../../api/jams"
import { JamListItem } from "./JamListItem"
import { useAuth } from "@clerk/clerk-react"


export function JamList() {
    const { getToken } = useAuth()

    const {isLoading, isError, data, error} = useQuery({
        queryKey: [JAM_LIST_QUERY_KEY],
        queryFn: () => getJams(getToken),
        // refetchOnWindowFocus: false,  // Prevent unnecessary refetching on window focus
        // staleTime: 0, // Ensure data is refetched immediately after invalidation
        retry: false
    })

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    const jams = data ?? []

    if (jams.length === 0 ) {
        return (
            <>
            <h2>Your jams</h2>
            <p>You don't have any jams yet.</p>
            </>
        )
    }
    return (
        <>
        <h2>Your jams</h2>
        <ol>
            {jams.map((data: JamData) => (
                <li key={data.id}>
                    <JamListItem data={data}/>
                </li>
            ))}
        </ol>
        </>
    )
}