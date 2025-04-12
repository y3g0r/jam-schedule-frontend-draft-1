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
            <Link to={`/jams/${data.id}`}>View</Link>
        </div>
    )
}