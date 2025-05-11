// import { Link } from "react-router";
import { useAuth } from "@clerk/clerk-react";
import { JAM_LIST_QUERY_KEY, JamData } from "../../api/jams";
import { respondToJamInvite } from "../../client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface JamListItemProps {
    data: JamData;
}

interface RespondToJamInvitePamars {
    jamId: number;
    accept: boolean;
}

export function JamListItem({data}: JamListItemProps) {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (params: RespondToJamInvitePamars) => accept(params.jamId, params.accept),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [JAM_LIST_QUERY_KEY] })
            console.log("Schedule.mutation.onSuccess finished")
        }
    })

    const accept = async (jamId: number, accept: boolean) => {
        const token = await getToken();
        const {error} = await respondToJamInvite({
            path: {
                id: jamId
            },
            body: {
                response: accept ? 'accepted' : 'declined'
            },
            headers: {
                Authorization: `Bearer ${token}`,
            }

        })
        if (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {/* <span>{JSON.stringify(data)}</span> */}
            <div>{data.name}</div>
            <div>Start: {data.start.toLocaleString()}</div>
            <div>End: {data.end.toLocaleString()}</div>
            <div>Created by: {data.createdBy}</div>
            <div>Location: {data.location}</div>
            {data.participants.length > 0 && 
                <div>Participants: <ol>{data.participants.map((p) => 
                    <li key={p.email}>{p.email} - {p.response ?? "no response yet"}</li>
                )}</ol>
                </div>}
            {/* <Link to={`/jams/${data.id}`}>View</Link> */}
            <button onClick={() => mutation.mutate({jamId: data.id, accept: true})}>Accept</button>
            <button onClick={() => mutation.mutate({jamId: data.id, accept: false})}>Decline</button>
        </div>
    )
}