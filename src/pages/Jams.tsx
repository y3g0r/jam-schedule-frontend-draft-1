import { useQuery } from "@tanstack/react-query";
import { getJams, JAM_LIST_QUERY_KEY } from "../api/jams";
import { JamList } from "../components/jam/JamList";

export function Jams() {
    const query = useQuery({
        queryKey: [JAM_LIST_QUERY_KEY],
        queryFn: () => getJams(),
    })

    const jams = query.data ?? []

    return (
        <>
            <h1>Jams</h1>
            <JamList jams={jams} />
        </>
    )
}