import { useQuery } from "@tanstack/react-query";
import { getJams, JAM_LIST_QUERY_KEY } from "../api/jams";
import { JamList } from "../components/jam/JamList";
import { Schedule } from "./Schedule";

export function Jams() {
    console.log(`Jams component re-rendering...`)

    const {isLoading, isError, data, error} = useQuery({
        queryKey: [JAM_LIST_QUERY_KEY],
        queryFn: getJams,
        // refetchOnWindowFocus: false,  // Prevent unnecessary refetching on window focus
        // staleTime: 0, // Ensure data is refetched immediately after invalidation
    })

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    console.log(data)

    return (
        <>
            <h1>Jams</h1>
            <Schedule />
            <JamList jams={data ?? []} />
        </>
    )
}