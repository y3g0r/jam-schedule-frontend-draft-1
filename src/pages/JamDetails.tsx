import { Link, useParams } from "react-router";
import { getJam, JAM_QUERY_KEY } from "../api/jams";
import { useQuery } from "@tanstack/react-query";
import { Jam } from "../components/jam/Jam";

export function JamDetails() {
    const { jamId } = useParams()
    
    console.log(`JamDetails, recieved param jamId: ${jamId}`)

    const query = useQuery({
        queryKey: [JAM_QUERY_KEY],
        queryFn: () => getJam(jamId),
    })

    return (
        <>
        {query.data ? 
            <>
             <h1>{query.data.name}</h1>
            <Jam data={query.data}/>
            </> :
            <h1>Jam not found</h1>
        }

        <footer>
            <Link to=".." relative="path">Back</Link>
        </footer>
        </>
    )
}