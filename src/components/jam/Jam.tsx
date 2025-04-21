import { Link } from "react-router";
import { JamData } from "../../api/jams";

export interface JamProps {
    data: JamData;
}

export function Jam({data}: JamProps) {

    return (
        <div>
            {/* <span>{JSON.stringify(data)}</span> */}
            {/* <div>{data.name}</div> */}
            <div>Start: {data.start.toLocaleString()}</div>
            <div>End: {data.end.toLocaleString()}</div>
            <div>Created by: {data.createdBy}</div>
            <div>Location: {data.location}</div>
            <div>Participants: {JSON.stringify(data.participants)}</div>
            
            <div><Link to={`/jams/${data.id}/edit`}>Edit</Link></div>
            <div><Link to={`/jams/${data.id}/delete`}>Delete</Link></div>
        </div>
    )
}