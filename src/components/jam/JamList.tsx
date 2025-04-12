import { JamData } from "../../api/jams"
import { JamListItem } from "./JamListItem"

export interface JamListProps {
    jams: JamData[]
}

export function JamList({jams}: JamListProps) {
    return (
        <>
        <ol>
            {jams.map((data) => (
                <li key={data.id}>
                    <JamListItem data={data}/>
                </li>
            ))}
        </ol>
        </>
    )
}