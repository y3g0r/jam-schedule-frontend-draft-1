export const JAM_QUERY_KEY = 'jam';
export const JAM_LIST_QUERY_KEY = 'jamList';

export interface BackendJamData {
    id: number;
    createdBy: string;
    name: string;
    startTimestampSeconds: number;
    endTimestampSeconds: number;
    location: string;
    participants: Participant[]
}

interface Participant {
    email: string;
}
export interface JamData {
    id: number;
    name: string;
    start: Date;
    end: Date;
    createdBy: string;
    location: string;
    participants: Participant[]
}

export interface NewJamData {
    name: string;
    start: Date;
    end: Date;
    location: string;
    participants: Participant[]
}

export const JAMS: JamData[] = [
    {id: 1, name: "Prepare to live!", start: new Date("2025-04-19T14:00"), end: new Date("2025-04-19T16:00"), createdBy: "123", location: "", participants: []},
    {id: 2, name: "Let there be rock!", start: new Date("2025-05-05T18:00"), end: new Date("2025-05-05T20:00"), createdBy: "234", location: "", participants: []}
]


// interface CreateJamRequest {
//     name: string;
//     startTimestampSeconds: number;
//     endTimestampSeconds: number;
//     location: string
//     participants: Participant[];
// }

interface CreateJamResponse {
    id: number;
}

export const createJam = async (data: NewJamData, getToken: GetTokenFunction): Promise<CreateJamResponse> => {
    // console.log(`createJam called`)
    // const maxId = JAMS.reduce((previous, current) => current.id > previous ? current.id : previous, JAMS.length === 0 ? 0 : JAMS[0].id)
    // const newJam = {id: maxId + 1, name: data.name, start: data.start, end: data.end, createdBy: data.userId};
    // JAMS.push(newJam)

    // return Promise.resolve(newJam)
    const token = await getToken()

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/jams`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            name: data.name,
            startTimestampSeconds: Math.floor(data.start.getTime() / 1000),
            endTimestampSeconds: Math.floor(data.end.getTime() / 1000),
            location: data.location,
            participants: data.participants.map((participant) => ({
                email: participant.email
            }))
        })
    })

    if (!res.ok) {
        throw new Error(`Error creating jam ${res.status} ${res.statusText}`);
    }
    
    return await res.json();
}
type GetTokenFunction = () => Promise<string | null>;


export const getJams = async (
    getToken: GetTokenFunction
): Promise<JamData[]>  => {
    // console.log(`getJams called, jams length: ${JAMS.length}`)
    // return Promise.resolve(JAMS);
    const token = await getToken();

    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/jams`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    
    if (!res.ok) {
        throw new Error(`Error fetching jams ${res.status} ${res.statusText}`)
    }
    const backendResult = await res.json()
    return backendResult.map((backendJamData: BackendJamData) => ({
        id: backendJamData.id,
        name: backendJamData.name,
        start: new Date(backendJamData.startTimestampSeconds * 1000),
        end: new Date(backendJamData.endTimestampSeconds * 1000),
        createdBy: backendJamData.createdBy,
        location: backendJamData.location,
        participants: backendJamData.participants
    }))
    console.log(`getJams backend results: ${backendResult}`)
    return JAMS
}


export const getJam = async (id: string | undefined): Promise<JamData | undefined>  => {
    if (id === undefined) {
        return
    }
    
    const jamId = Number.parseInt(id)
    const jam = JAMS.find((value) => value.id == jamId)
    
    console.log(`getJam(${id}) => ${JSON.stringify(jam)}`)
    if (jam === undefined) {
        throw new Error(`Jam ${id} not found`)
    }

    return jam
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/posts`
    )
  return await res.json()
}
