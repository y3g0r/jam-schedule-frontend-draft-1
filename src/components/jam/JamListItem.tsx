import { Link } from "react-router";
import { JamData } from "../../api/jams";

export interface JamListItemProps {
    data: JamData;
}

export function JamListItem({data}: JamListItemProps) {
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
            <Link to={`/jams/${data.id}`}>View</Link>
        </div>
    )
}